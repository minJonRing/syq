let app = new Vue({
    el:"#app",
    data:{
        nav:set_config.header[3].child,
        navIndex:0,
        p1:["BITONE，全球顶级的可视化解决方案供应商。","自2009年成立以来，已在汽车虚拟影像领域深耕10年，成为汽车行业备受认可的虚拟影像品牌。","采用高端计算机图像技术与极具创意的产品可视化方案结合、全数字技术与真实拍摄结合等方式，为客户输出包括CG影像、汽车CG、汽车VR、AR虚拟互动体验，以及数字演员等虚拟影像应用解决方案。用于车展、发布会、电视广告、手机客户端等一系列营销活动中，帮助客户抢占市场营销先机，吸引潜在受众。"],
        p2:["我们拥有一支由数字艺术家、科学家、营销领域专家等组成的专业团队，服务的客户覆盖大型汽车厂商、手机厂商、广告公司、航空公司和影视传媒公司等。","目前，已服务超过60家国内外知名汽车企业，为超过300款品牌汽车提供虚拟影像应用服务。"],
        imgs:["三维产品动画","影视广告TVC","创意工厂"],
        person:new Array(15).fill(1)
    },
    methods:{
        handleChangeNav(e,data){
            this.navIndex = data
        }
    }
})