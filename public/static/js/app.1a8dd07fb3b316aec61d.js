webpackJsonp([1],{"52Fk":function(t,e){},BDaJ:function(t,e){},N35s:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("7+uW"),n={name:"App",data:function(){return{}},methods:{handleOpen:function(t,e){console.log(t,e)},handleClose:function(t,e){console.log(t,e)},handleLoginOut:function(){var t=this;this.$axios.get("/app/logout").then(function(e){200==e.data.code&&(t.$message({type:"success",message:e.data.msg}),window.location.href="/app/admin")})}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{attrs:{id:"app"}},[i("div",{staticClass:"head"},[t._m(0),t._v(" "),i("div",{staticClass:"head-user"},[i("a",{staticClass:"login-out",attrs:{href:"javascript:"},on:{click:t.handleLoginOut}},[t._v("退出登录")])])]),t._v(" "),i("div",{staticClass:"cont"},[i("div",{staticClass:"left"},[i("el-col",{attrs:{span:24}},[i("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"unique-opened":!0,router:!0,"default-active":"1","background-color":"#fff","text-color":"#333","active-text-color":"#ffd04b"},on:{open:t.handleOpen,close:t.handleClose}},[i("el-menu-item",{attrs:{index:"/"}},[i("i",{staticClass:"el-icon-menu"}),t._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[t._v("首页")])]),t._v(" "),i("el-submenu",{attrs:{index:"1"}},[i("template",{slot:"title"},[i("i",{staticClass:"el-icon-setting"}),t._v(" "),i("span",[t._v("基础")])]),t._v(" "),i("el-menu-item-group",{attrs:{title:"分组一"}},[i("el-menu-item",{attrs:{index:"1-1"}},[t._v("选项1")]),t._v(" "),i("el-menu-item",{attrs:{index:"1-2"}},[t._v("选项2")])],1),t._v(" "),i("el-menu-item-group",{attrs:{title:"分组2"}},[i("el-menu-item",{attrs:{index:"1-3"}},[t._v("选项3")])],1)],2),t._v(" "),i("el-menu-item",{attrs:{index:"work"}},[i("i",{staticClass:"el-icon-document"}),t._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[t._v("产品")])]),t._v(" "),i("el-menu-item",{attrs:{index:"news"}},[i("i",{staticClass:"el-icon-star-off"}),t._v(" "),i("span",{attrs:{slot:"title"},slot:"title"},[t._v("新闻")])])],1)],1)],1),t._v(" "),i("div",{staticClass:"right"},[i("div",{staticClass:"box"},[i("router-view")],1)])])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"head-img"},[e("img",{attrs:{src:"",alt:""}})])}]};var s=i("VU/8")(n,o,!1,function(t){i("52Fk")},null,null).exports,r=i("mtWM"),l=i.n(r),c=i("/ocq"),d={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{staticClass:"app"},[this._v("\n    欢迎您...\n")])},staticRenderFns:[]};var u=i("VU/8")({name:"app",data:function(){return{}}},d,!1,function(t){i("iCFV")},"data-v-07e4625c",null).exports,h=i("Gu7T"),f=i.n(h),m=i("bOdI"),p=i.n(m),v={workType:[{text:"类型1",value:1},{text:"类型2",value:2},{text:"类型3",value:3},{text:"类型4",value:4}],newsType:[{text:"类型1",value:1},{text:"类型2",value:2},{text:"类型3",value:3},{text:"类型4",value:4}]},g=i("sYY+"),w=i.n(g),y={name:"edit",props:["id"],data:function(){return{form:{title:"",desc:"",type:"",typeArr:"",cover:"",isLong:!1,isSwitch:!1,percentage:0,video:[],outVideo:"",outVideoArr:[]},cover:"",editor:""}},mounted:function(){this.form.typeArr=v.workType,this.handleEditorInit()},watch:{id:function(t){t&&this.handleAjaxEdit()}},methods:{handleEditorInit:function(){var t=this;this.editor=new w.a(this.$refs.editor),this.editor.customConfig.uploadImgServer="/app/upload/img",this.editor.customConfig.uploadFileName="imgs",this.editor.customConfig.onchange=function(e){t.editorContent=e},this.editor.create()},handleAjaxEdit:function(){var t=this;this.$axios.get("/app/project/edit",{params:{id:this.id}}).then(function(e){var i=e.data.data;t.form.title=i.title||"",t.form.desc=i.desc||"",t.form.type=i.type?i.type-0:"",t.form.cover=i.cover||"",t.cover=i.cover||"",t.form.isLong=i.isLong||!1,t.form.isSwitch=i.isSwitch||!1,t.form.video=i.video?i.video.split(","):[],t.form.outVideoArr=i.outVideo?i.outVideo.split(","):[],t.editor.txt.html(i.cont)})},hanleOnSubmit:function(){var t=this,e={type:this.form.type,title:this.form.title,desc:this.form.desc,cover:this.form.cover,isLong:this.form.isLong,isSwitch:this.form.isSwitch,video:this.form.video.join(","),outVideo:this.form.outVideoArr.join(","),cont:this.editor.txt.html()};this.id&&(e.id=this.id),this.$axios.post("/app/project/create",e).then(function(e){200==e.data.code&&(t.$message({type:"success",message:e.data.msg}),t.handleReturn())})},handleAvatarSuccess:function(t,e){200==t.code&&(this.form.cover=t.data[0],this.cover=URL.createObjectURL(e.raw),this.$message.success(t.msg))},beforeAvatarUpload:function(t){var e=t.size/1024/1024<1;return e||this.$message.error("上传图片大小不能超过 1MB!"),e},handleVideoLoader:function(t){var e=this;this.form.percentage=0;var i=t.target.files;if(i.length){var a=new FormData;a.append("video",i[0]);var n={onUploadProgress:function(t){var i=t.loaded/t.total*100|0;e.form.percentage=i}};this.$axios.post("/app/video",a,n).then(function(t){var i=t.data;200==t.data.code&&(e.$message.success(i.msg),e.form.video.push(i.url))}).catch(function(t){e.$message.error("上传出错,请重新上传/或使用外部视频")})}},handleRemoveVideo:function(t,e){this.form.video.splice(e,1)},handleConfirmOutVideo:function(){var t=this.form.outVideo;if(t){var e=t.replace(/(width="480")/,'width="360"').replace(/(height="400")/,'height="240"');this.form.outVideoArr.push(e),this.form.outVideo=""}else this.$message.error("外部视频内容不能为空!")},handleRemoveOutVideo:function(t,e){this.form.outVideoArr.splice(e,1)},handleReturn:function(){this.$emit("handleReturnHome"),this.form.title="",this.form.desc="",this.form.type="",this.form.cover="",this.form.isLong=!1,this.form.isSwitch=!1,this.form.percentage=0,this.form.video=[],this.form.outVideo="",this.form.outVideoArr=[],this.cover="",this.editor.txt.clear()}}},_={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"edit"},[i("div",{staticClass:"edit-head"},[i("p",[t._v("新增/编辑")]),i("el-button",{on:{click:t.handleReturn}},[t._v("返回")])],1),t._v(" "),i("div",{staticClass:"edit-form"},[i("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"类型"}},[i("el-select",{staticClass:"w360",attrs:{placeholder:"请选择类型"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},t._l(t.form.typeArr,function(t,e){return i("el-option",{key:e,attrs:{label:t.text,value:t.value}})}),1)],1),t._v(" "),i("el-form-item",{attrs:{label:"标题"}},[i("el-input",{staticClass:"w360",attrs:{"suffix-icon":"el-icon-edit",span:12,placeholder:"请输入标题"},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"前言"}},[i("el-input",{staticClass:"w360",attrs:{type:"textarea"},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc",e)},expression:"form.desc"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"封面"}},[i("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/app/upload/cover","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.cover?i("img",{staticClass:"avatar",attrs:{src:t.cover}}):i("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),i("el-form-item",{attrs:{label:"封面是否是长图"}},[i("el-switch",{model:{value:t.form.isLong,callback:function(e){t.$set(t.form,"isLong",e)},expression:"form.isLong"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"使用外部视频"}},[i("el-switch",{model:{value:t.form.isSwitch,callback:function(e){t.$set(t.form,"isSwitch",e)},expression:"form.isSwitch"}})],1),t._v(" "),t.form.isSwitch?i("el-form-item",{attrs:{label:"外部视频"}},[i("div",[i("el-input",{staticClass:"w360",attrs:{placeholder:"请输入正确的外部链接"},model:{value:t.form.outVideo,callback:function(e){t.$set(t.form,"outVideo",e)},expression:"form.outVideo"}}),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.handleConfirmOutVideo}},[t._v("确定使用")])],1),t._v(" "),i("div",{staticClass:"out-video-list"},t._l(t.form.outVideoArr,function(e,a){return i("div",{key:a,staticClass:"out-video-item"},[i("el-tooltip",{staticClass:"remove-video",attrs:{effect:"dark",content:"删除视频",placement:"left"}},[i("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(e){return t.handleRemoveOutVideo(e,a)}}})],1),t._v(" "),i("div",{staticClass:"out-video-item-el",domProps:{innerHTML:t._s(e)}})],1)}),0)]):t._e(),t._v(" "),t.form.isSwitch?t._e():i("el-form-item",{attrs:{label:"视频上传"}},[i("div",{staticClass:"video-upload"},[i("div",{staticClass:"video-upload-box"},[i("div",{staticClass:"video-upload-btn"},[i("input",{attrs:{type:"file",placeholder:"*视频",accept:"video/mp4"},on:{change:function(e){return t.handleVideoLoader(e)}}}),t._v(" "),i("el-button",[t._v("上传视频")])],1),t._v(" "),i("el-progress",{staticClass:"video-upload-bar",attrs:{"text-inside":!0,"stroke-width":18,percentage:t.form.percentage}})],1),t._v(" "),t.form.video.length?i("div",{staticClass:"videos"},t._l(t.form.video,function(e,a){return i("div",{key:a,staticClass:"video-box"},[i("el-tooltip",{staticClass:"remove-video",attrs:{effect:"dark",content:"删除视频",placement:"left"}},[i("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(e){return t.handleRemoveVideo(e,a)}}})],1),t._v(" "),i("video",{attrs:{width:"360",height:"240",controls:"",autoplay:"",src:e}})],1)}),0):t._e()])]),t._v(" "),i("el-form-item",{attrs:{label:"内容正文"}},[i("div",{ref:"editor"})]),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.hanleOnSubmit}},[t._v("提交保存")])],1)],1)],1)])},staticRenderFns:[]};var b={name:"work",data:function(){var t;return t={init:[],list:[]},p()(t,"list",[]),p()(t,"nowList",[]),p()(t,"listType",0),p()(t,"typeArr",[]),p()(t,"multipleSelection",[]),p()(t,"currentPage",1),p()(t,"total",1),p()(t,"nowPage",10),p()(t,"isEdit",!1),p()(t,"editId",0),p()(t,"removeId",0),p()(t,"loading",!1),t},mounted:function(){this.typeArr=v.newsType,this.handleAjaxList()},watch:{loading:function(t){var e=this;t&&setTimeout(function(){e.loading=!1},3e3)}},methods:{handleRefresh:function(){this.currentPage=1,this.handleAjaxList()},handleAjaxList:function(){var t=this;this.loading=!0,this.$axios.get("/app/project/list").then(function(e){200==e.data.code&&(t.init=[].concat(f()(e.data.data)),t.total=t.init.length,t.handleInit(t.init))})},handleInit:function(t){var e=[];for(var i in e[0]=t,this.typeArr){var a=this.typeArr[i].value;e[a]||(e[a]=[])}for(var n in t){var o=t[n].type-0;e[o=o||1].push(t[n])}this.list=e,this.handleFilterList()},handleFilterList:function(){var t=this.currentPage-1;this.nowList=this.list[this.listType].slice(t*this.nowPage,this.currentPage*this.nowPage),this.loading=!1,!this.nowList.length&&this.currentPage>1&&(this.currentPage=t,t=this.currentPage-1,this.nowList=this.list[this.listType].slice(t*this.nowPage,this.currentPage*this.nowPage))},handleSelectionChange:function(t){this.multipleSelection=t},handleReturnTime:function(t){return t.replace(/(T).+/g,"")},handleEdit:function(t,e){this.editId=e.row._id},handleDelete:function(t,e){var i=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.$axios.post("/app/project/remove",{id:e._id}).then(function(t){200==t.data.code&&(i.$message({type:"success",message:t.data.msg}),i.handleAjaxList())})}).catch(function(){})},handleTagFilter:function(t){var e=void 0;switch(t-0){case 1:e="primary";break;case 2:e="success";break;case 3:e="info";break;case 4:e="warning";break;default:e="danger"}return e},handleFilterTag:function(t,e){return this.listType=t,e.type===t+""},handleReFilter:function(t){var e=this;t.tag.length||(this.listType=0),this.nowList=this.list[this.listType].slice(0,this.nowPage),this.total=this.list[this.listType].length,this.nowList.length||setTimeout(function(){e.nowList=e.list[0].slice(0,e.nowPage),e.total=1},600),this.currentPage=1},handleCurrentChange:function(t){this.currentPage=t,this.handleFilterList()},handleNewAndEdit:function(){this.isEdit=!0},handleReturnList:function(){this.isEdit=!1,this.editId=0}},components:{Edit:i("VU/8")(y,_,!1,function(t){i("pWwL"),i("BDaJ")},"data-v-0f6081eb",null).exports}},x={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"work"},[i("div",{staticClass:"work-head"},[i("el-button",{attrs:{type:"primary"},on:{click:t.handleNewAndEdit}},[t._v("新建")]),t._v(" "),i("el-button",{attrs:{type:"success"},on:{click:t.handleRefresh}},[t._v("刷新")])],1),t._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.nowList,border:"","tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange,"filter-change":t.handleReFilter}},[i("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"date",label:"日期",sortable:"",align:"center",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.handleReturnTime(e.row.createtime)))]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"cover",label:"封面",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("img",{staticClass:"list-cover",attrs:{src:t.row.cover}})]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"title",label:"标题","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{align:"center",prop:"type",label:"标签",width:"160","column-key":"tag",filters:t.typeArr,"filter-method":t.handleFilterTag,"filter-placement":"bottom-end"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tag",{attrs:{type:t.handleTagFilter(e.row.type),"disable-transitions":""}},[t._v(t._s(t.typeArr[e.row.type-1]?t.typeArr[e.row.type-1].text:"暂无"))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",size:"mini"},on:{click:function(i){return t.handleEdit(e.$index,e)}}}),t._v(" "),i("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:"",size:"mini"},on:{click:function(i){return t.handleDelete(e.$index,e.row)}}})]}}])})],1),t._v(" "),i("div",{staticClass:"page"},[i("el-pagination",{attrs:{"current-page":t.currentPage,layout:"total, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),i("div",{class:["work-edit",{active:t.isEdit||t.editId}]},[i("Edit",{attrs:{id:t.editId},on:{handleReturnHome:t.handleReturnList}})],1)])},staticRenderFns:[]};var C=i("VU/8")(b,x,!1,function(t){i("dgbh")},"data-v-ca448d5c",null).exports,k={name:"edit",props:["id"],data:function(){return{form:{title:"",desc:"",type:"",typeArr:"",cover:"",isSwitch:!1,percentage:0,video:[]},cover:"",editor:""}},mounted:function(){this.form.typeArr=v.newsType,this.handleEditorInit()},watch:{id:function(t){t&&this.handleAjaxEdit()}},methods:{handleEditorInit:function(){var t=this;this.editor=new w.a(this.$refs.editor),this.editor.customConfig.uploadImgServer="/app/upload/img",this.editor.customConfig.uploadFileName="imgs",this.editor.customConfig.onchange=function(e){t.editorContent=e},this.editor.create()},handleAjaxEdit:function(){var t=this;this.$axios.get("/app/informa/edit",{params:{id:this.id}}).then(function(e){var i=e.data.data;t.form.title=i.title||"",t.form.desc=i.desc||"",t.form.type=i.type?i.type-0:"",t.form.cover=i.cover||"",t.cover=i.cover||"",t.form.isSwitch=i.isSwitch||!1,t.form.video=i.video?i.video.split(","):[],t.editor.txt.html(i.cont)})},hanleOnSubmit:function(){var t=this,e={type:this.form.type,title:this.form.title,desc:this.form.desc,cover:this.form.cover,isSwitch:this.form.isSwitch,video:this.form.video,cont:this.editor.txt.html()};this.id&&(e.id=this.id),this.$axios.post("/app/informa/create",e).then(function(e){200==e.data.code&&(t.$message({type:"success",message:e.data.msg}),t.handleReturn())})},handleAvatarSuccess:function(t,e){200==t.code&&(this.form.cover=t.data[0],this.cover=URL.createObjectURL(e.raw),this.$message.success(t.msg))},beforeAvatarUpload:function(t){var e=t.size/1024/1024<.2;return e||this.$message.error("上传图片大小不能超过 2MB!"),e},handleVideoLoader:function(t){var e=this;this.form.percentage=0;var i=t.target.files;if(i.length){var a=new FormData;a.append("video",i[0]);var n={onUploadProgress:function(t){var i=t.loaded/t.total*100|0;e.form.percentage=i}};this.$axios.post("/app/video",a,n).then(function(t){var i=t.data;200==t.data.code&&(e.$message.success(i.msg),e.form.video.push(i.url))}).catch(function(t){e.$message.error("上传出错,请重新上传")})}},handleRemoveVideo:function(t,e){this.form.video.splice(e,1)},handleReturn:function(){this.$emit("handleReturnHome"),this.form.title="",this.form.desc="",this.form.type="",this.form.cover="",this.form.isSwitch=!1,this.form.percentage=0,this.form.video=[],this.cover="",this.editor.txt.clear()}}},L={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"edit"},[i("div",{staticClass:"edit-head"},[i("p",[t._v("新增/编辑")]),i("el-button",{on:{click:t.handleReturn}},[t._v("返回")])],1),t._v(" "),i("div",{staticClass:"edit-form"},[i("el-form",{ref:"form",attrs:{model:t.form,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"类型"}},[i("el-select",{staticClass:"w360",attrs:{placeholder:"请选择活动区域"},model:{value:t.form.type,callback:function(e){t.$set(t.form,"type",e)},expression:"form.type"}},t._l(t.form.typeArr,function(t,e){return i("el-option",{key:e,attrs:{label:t.text,value:t.value}})}),1)],1),t._v(" "),i("el-form-item",{attrs:{label:"标题"}},[i("el-input",{staticClass:"w360",attrs:{"suffix-icon":"el-icon-edit",span:12},model:{value:t.form.title,callback:function(e){t.$set(t.form,"title",e)},expression:"form.title"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"前言"}},[i("el-input",{staticClass:"w360",attrs:{type:"textarea"},model:{value:t.form.desc,callback:function(e){t.$set(t.form,"desc",e)},expression:"form.desc"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"封面"}},[i("el-upload",{staticClass:"avatar-uploader",attrs:{action:"/app/upload/cover","show-file-list":!1,"on-success":t.handleAvatarSuccess,"before-upload":t.beforeAvatarUpload}},[t.cover?i("img",{staticClass:"avatar",attrs:{src:t.cover}}):i("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),i("el-form-item",{attrs:{label:"使用外部视频"}},[i("el-switch",{model:{value:t.form.isSwitch,callback:function(e){t.$set(t.form,"isSwitch",e)},expression:"form.isSwitch"}})],1),t._v(" "),i("el-form-item",{attrs:{label:"视频上传"}},[i("div",{staticClass:"video-upload"},[i("div",{staticClass:"video-upload-box"},[i("div",{staticClass:"video-upload-btn"},[i("input",{attrs:{type:"file",placeholder:"*视频",accept:"video/mp4"},on:{change:function(e){return t.handleVideoLoader(e)}}}),t._v(" "),i("el-button",[t._v("上传视频")])],1),t._v(" "),i("el-progress",{staticClass:"video-upload-bar",attrs:{"text-inside":!0,"stroke-width":18,percentage:t.form.percentage}})],1),t._v(" "),t.form.video.length?i("div",{staticClass:"videos"},t._l(t.form.video,function(e,a){return i("div",{key:a,staticClass:"video-box"},[i("el-tooltip",{staticClass:"remove-video",attrs:{effect:"dark",content:"删除视频",placement:"left"}},[i("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:""},on:{click:function(e){return t.handleRemoveVideo(e,a)}}})],1),t._v(" "),i("video",{attrs:{width:"360",height:"240",controls:"",autoplay:"",src:e}})],1)}),0):t._e()])]),t._v(" "),i("el-form-item",{attrs:{label:"内容正文"}},[i("div",{ref:"editor"})]),t._v(" "),i("el-form-item",[i("el-button",{attrs:{type:"primary"},on:{click:t.hanleOnSubmit}},[t._v("提交保存")])],1)],1)],1)])},staticRenderFns:[]};var A={name:"work",data:function(){var t;return t={init:[],list:[]},p()(t,"list",[]),p()(t,"nowList",[]),p()(t,"listType",0),p()(t,"typeArr",[]),p()(t,"multipleSelection",[]),p()(t,"currentPage",1),p()(t,"total",1),p()(t,"nowPage",10),p()(t,"isEdit",!1),p()(t,"editId",0),p()(t,"removeId",0),p()(t,"loading",!1),t},mounted:function(){this.typeArr=v.workType,this.handleAjaxList()},watch:{loading:function(t){var e=this;t&&setTimeout(function(){e.loading=!1},3e3)}},methods:{handleRefresh:function(){this.currentPage=1,this.handleAjaxList()},handleAjaxList:function(){var t=this;this.loading=!0,this.$axios.get("/app/informa/list").then(function(e){200==e.data.code&&(t.init=[].concat(f()(e.data.data)),t.total=t.init.length,t.handleInit(t.init))})},handleInit:function(t){var e=[];for(var i in e[0]=t,this.typeArr){var a=this.typeArr[i].value;e[a]||(e[a]=[])}for(var n in t){var o=t[n].type-0;e[o=o||1].push(t[n])}this.list=e,this.handleFilterList()},handleFilterList:function(){var t=this.currentPage-1;this.nowList=this.list[this.listType].slice(t*this.nowPage,this.currentPage*this.nowPage),this.loading=!1,!this.nowList.length&&this.currentPage>1&&(this.currentPage=t,t=this.currentPage-1,this.nowList=this.list[this.listType].slice(t*this.nowPage,this.currentPage*this.nowPage))},handleSelectionChange:function(t){this.multipleSelection=t},handleReturnTime:function(t){return t.replace(/(T).+/g,"")},handleEdit:function(t,e){this.editId=e.row._id},handleDelete:function(t,e){var i=this;this.$confirm("此操作将永久删除该数据, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){i.$axios.post("/app/informa/remove",{id:e._id}).then(function(t){200==t.data.code&&(i.$message({type:"success",message:t.data.msg}),i.handleAjaxList())})}).catch(function(){})},handleTagFilter:function(t){var e=void 0;switch(t-0){case 1:e="primary";break;case 2:e="success";break;case 3:e="info";break;case 4:e="warning";break;default:e="danger"}return e},handleFilterTag:function(t,e){return this.listType=t,e.type===t+""},handleReFilter:function(t){var e=this;t.tag.length||(this.listType=0),this.nowList=this.list[this.listType].slice(0,this.nowPage),this.total=this.list[this.listType].length,this.nowList.length||setTimeout(function(){e.nowList=e.list[0].slice(0,e.nowPage),e.total=1},600),this.currentPage=1},handleCurrentChange:function(t){this.currentPage=t,this.handleFilterList()},handleNewAndEdit:function(){this.isEdit=!0},handleReturnList:function(){this.isEdit=!1,this.editId=0}},components:{Edit:i("VU/8")(k,L,!1,function(t){i("sj3X"),i("wdg/")},"data-v-66c0e1b8",null).exports}},$={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"work"},[i("div",{staticClass:"work-head"},[i("el-button",{attrs:{type:"primary"},on:{click:t.handleNewAndEdit}},[t._v("新建")]),t._v(" "),i("el-button",{attrs:{type:"success"},on:{click:t.handleRefresh}},[t._v("刷新")])],1),t._v(" "),i("div",{staticClass:"table-box"},[i("el-table",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:t.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.nowList,border:"","tooltip-effect":"dark"},on:{"selection-change":t.handleSelectionChange,"filter-change":t.handleReFilter}},[i("el-table-column",{attrs:{type:"selection",width:"55",align:"center"}}),t._v(" "),i("el-table-column",{attrs:{prop:"date",label:"日期",sortable:"",align:"center",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(t._s(t.handleReturnTime(e.row.createtime)))]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"cover",label:"封面",align:"center",width:"200"},scopedSlots:t._u([{key:"default",fn:function(t){return[i("img",{staticClass:"list-cover",attrs:{src:t.row.cover}})]}}])}),t._v(" "),i("el-table-column",{attrs:{prop:"title",label:"标题","show-overflow-tooltip":""}}),t._v(" "),i("el-table-column",{attrs:{align:"center",prop:"type",label:"标签",width:"160","column-key":"tag",filters:t.typeArr,"filter-method":t.handleFilterTag,"filter-placement":"bottom-end"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-tag",{attrs:{type:t.handleTagFilter(e.row.type),"disable-transitions":""}},[t._v(t._s(t.typeArr[e.row.type-1].text||"暂无"))])]}}])}),t._v(" "),i("el-table-column",{attrs:{label:"操作",align:"center",width:"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[i("el-button",{attrs:{type:"primary",icon:"el-icon-edit",circle:"",size:"mini"},on:{click:function(i){return t.handleEdit(e.$index,e)}}}),t._v(" "),i("el-button",{attrs:{type:"danger",icon:"el-icon-delete",circle:"",size:"mini"},on:{click:function(i){return t.handleDelete(e.$index,e.row)}}})]}}])})],1),t._v(" "),i("div",{staticClass:"page"},[i("el-pagination",{attrs:{"current-page":t.currentPage,layout:"total, prev, pager, next, jumper",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),i("div",{class:["work-edit",{active:t.isEdit||t.editId}]},[i("Edit",{attrs:{id:t.editId},on:{handleReturnHome:t.handleReturnList}})],1)])},staticRenderFns:[]};var S=i("VU/8")(A,$,!1,function(t){i("N35s")},"data-v-47f86bca",null).exports;a.default.use(c.a);var T=new c.a({routes:[{path:"/",name:"app",component:u},{path:"/work",name:"work",component:C},{path:"/news",name:"news",component:S}]}),R=i("zL8q"),P=i.n(R);i("tvR6");a.default.use(P.a),a.default.config.productionTip=!1,a.default.prototype.$axios=l.a,new a.default({el:"#app",router:T,components:{App:s},template:"<App/>"})},dgbh:function(t,e){},iCFV:function(t,e){},pWwL:function(t,e){},sj3X:function(t,e){},tvR6:function(t,e){},"wdg/":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.1a8dd07fb3b316aec61d.js.map