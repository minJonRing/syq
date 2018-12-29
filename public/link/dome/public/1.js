let video = document.querySelector(".video");
let p = document.querySelector("p");
let can = document.querySelector(".can");
let ctx = can.getContext('2d');
let w = video.clientWidth;
let h = video.clientHeight;
p.style.height = h +"px";
can.width = video.clientWidth;
can.height = video.clientHeight;
video.oncanplay = function(){
    p.innerText = "点击播放";
    p.addEventListener("click",function(){
        p.style.display = "none";
        video.play();
        video.addEventListener('play', function(){
        //画布上画视频，需要动态地获取它，一帧一帧地画出来
            setInterval(function(){
                handleDrew()
                }, 20);
        });
    })
}

function handleDrew(){
    ctx.clearRect(0,0,w,h);
    ctx.drawImage(video, 0, 0, w, h);
}