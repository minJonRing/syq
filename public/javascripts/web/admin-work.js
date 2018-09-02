var E = window.wangEditor //使用编辑器
    var isComplete = true,
        allData;
    var xhrOnProgress = function(fun) {
        xhrOnProgress.onprogress = fun; //绑定监听
        //使用闭包实现监听绑
        return function() {
            //通过$.ajaxSettings.xhr();获得XMLHttpRequest对象
            var xhr = $.ajaxSettings.xhr();
            //判断监听函数是否为函数
            if (typeof xhrOnProgress.onprogress !== 'function')
                return xhr;
            //如果有监听函数并且xhr对象支持绑定时就把监听函数绑定上去
            if (xhrOnProgress.onprogress && xhr.upload) {
                xhr.upload.onprogress = xhrOnProgress.onprogress;
            }
            return xhr;
        }
    }
    var app = new Vue({
        el: "#app",
        data: {
            isShow: false,
            types: set_config.work_type,
            isShowType: false,
            // 
            type: set_config.work_type[0],
            id: 0,
            title: "",
            sub: "",
            video: "",
            cover: "",
            media: "",
            barW: 0,
            uploadVideo: "",
            // 
            list: [], //ajax获取的所有元素数据
            _list: [], //某一类型的所有数据
            copyList: [],
            pages: 1,
            page: 0

        },
        mounted() {
            // 获取作品列表
            this.bindGetList()
        },
        watch: {
            "isShow": function(val) {
                if (val) {
                    setTimeout(() => {
                        window.editor = new E('#editor') //创建编辑器对象
                        editor.customConfig.uploadImgServer = '/app/upload/img'; //上传地址路由
                        editor.customConfig.uploadFileName = 'imgs' //后端后去的name名称
                        editor.customConfig.uploadImgHooks = {
                            before: function(xhr, editor, files) {
                                // 图片上传之前触发
                                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件

                                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                                // return {
                                //     prevent: true,
                                //     msg: '放弃上传'
                                // }
                                console.log(files)
                            }
                        }
                        editor.create() //wangEditor使用formData上传
                    }, 1);
                }
            },
            "page": function(val) {
                this.copyList = this._list.slice(val * 9, (val + 1) * 9)
            }
        },
        methods: {
            /**
             * 获取列表数据
             */
            bindGetList() {
                this.page = 0;
                $.ajax({
                    url: "/app/getWork",
                    type: "POST",
                    success: (res) => {
                        let db = [].concat(res.data)
                        let arr = db.sort((i, j) => {
                            return new Date(i.createtime) < new Date(j.createtime) ? 1 : -1;
                        })
                        this.list = this._list = arr;
                        this.pages = Math.ceil(this.list.length / 9);
                        this.copyList = this.list.slice(0, 9);
                    }
                })
            },
            /**
             * 新增作品
             */
            bindNewWork() {
                this.isShow = true;
                this.type = set_config.work_type[0].id;
                this.id = 0;
                this.title = "";
                this.cover = "";
                this.sub = "";
                this.video = "";
                setTimeout(() => {
                    editor.txt.html("")
                }, 10);
            },
            /**
             * 编辑 作品
             */
            bindEditWork(event, db) {
                this.isShow = true;
                $.ajax({
                    url: "/app/getOneWork",
                    type: "POST",
                    data: {
                        id: db.id
                    },
                    success: (res) => {
                        this.id = res.data._id;
                        this.type = res.data.type;
                        this.title = res.data.title;
                        this.cover = res.data.cover;
                        editor.txt.html(res.data.cont)
                    }
                })
            },
            /**
             * 删除作品
             */
            bindRemoveWork(event, db) {
                $.ajax({
                    url: "/app/removeWork",
                    type: "POST",
                    data: {
                        id: db.id
                    },
                    success: (res) => {
                        this.bindGetList()
                    }
                })
            },
            /**
             * 按类型查找作品
             */
            bindFindOneWork(event, db) {
                this.page = 0;
                this._list = [];
                this.copyList = [];
                if (!db.type) {
                    this._list = this.list;
                    this.copyList = this._list.slice(0, 9);
                    this.pages = Math.ceil(this._list.length / 9);
                } else {
                    for (let i in this.list) {
                        if (new RegExp(db.type).test(this.list[i].type)) {
                            this._list.push(this.list[i])
                        }
                    }
                    this.copyList = this._list.slice(0, 9);
                    this.pages = Math.ceil(this._list.length / 9);
                }
            },
            /**
             * 跳页
             */
            bindLinkPage(event, index) {
                this.page = index;
            },
            /*
             *选择作品类型
             */
            bindSelectType(event, db) {
                this.type = db;
                this.isShowType = false;
            },
            /*
             *获取封面的base64 编码 赋值给cover 显示图片
             */
            bindCover(event) {
                let el = event.target;
                let blob = new Blob(el.files, {
                    type: "image/jpeg"
                });
                this.cover = URL.createObjectURL(blob);
                // let render = new FileReader();
                // render.readAsDataURL(el.files[0])
                // render.onload = (e) => {
                //     this.cover = e.target.result
                // }
                setTimeout(() => {
                    let el = document.querySelector(".cover");
                    el.onload = function() {
                        window.URL.revokeObjectURL(this.cover);
                    }
                }, 1);
            },
            /*
             *获取视频数据 赋值video
             */
            bindVideo(e) {
                let el = e.target;
                let blob = new Blob(el.files, {
                    type: "video/mp4"
                });
                this.media = el.files[0];
                this.video = URL.createObjectURL(blob);
                setTimeout(() => {
                    let el = document.querySelector("video");
                    el.onload = function() {
                        window.URL.revokeObjectURL(this.video);
                    }
                }, 1);
            },
            /*
             *上传视频
             */
            handleUpdaVideo() {
                let formData = new FormData();
                formData.append("video", this.media);
                $.ajax({
                    url: "/app/video",
                    type: "POST",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    xhr: xhrOnProgress((e) => {
                        this.barW = (e.loaded / e.total).toFixed(2) * 100 + "%"; //计算百分比
                    }),
                    success: (res) => {
                        this.uploadVideo = res.url;
                    }
                })
            },
            /*
             *保存编辑/新建的数据
             * */
            bindSave() {

                if (this.title && editor.txt.html()) {
                    let formData = new FormData()
                    formData.append("id", this.id)
                    formData.append("type", this.type)
                    formData.append("title", this.title)
                    formData.append("video", this.uploadVideo)
                    formData.append("cover", document.querySelector("input[type=file]").files[0])
                    formData.append("cont", editor.txt.html())
                    $.ajax({
                        url: "/app/work/save",
                        type: "POST",
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: (res) => {
                            if (res.code == 200) {
                                this.isShow = false;
                                this.bindGetList()
                            }
                        }
                    })
                }
            }
        }
    })