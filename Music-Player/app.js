let phonkIndex=0;
let audioElement=new Audio("./Music/0.mp3");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let masterPhonkName=document.getElementById("masterPhonkName");
let phonkItems=Array.from(document.getElementsByClassName("phonkItem"));
let volume_slider=document.querySelector(".volume_slider");
current_time=document.getElementById("current_time");
total_time=document.getElementById("total_time");
let phonks=
[
    {phonkName: "Samurai-AlexiAction", filePath: "./Music/0.mp3", coverPath: "./Music/Samurai.png"},
    {phonkName: "Metamorphosis-INTERWORLD", filePath: "./Music/1.mp3", coverPath: "./Music/Metamorphosis.png"},
    {phonkName: "Life In Rio-Crazy Mano", filePath: "./Music/2.mp3", coverPath: "./Music/LifeInRio.png"},
    {phonkName: "Wake Up-MoonDeity", filePath: "./Music/3.mp3", coverPath: "./Music/WakeUp.png"},
    {phonkName: "Murder In My Mind-KORDHELL", filePath: "./Music/4.mp3", coverPath: "./Music/MurderInMyMind.png"},
    {phonkName: "Ghost-phonk.me", filePath: "./Music/5.mp3", coverPath: "./Music/Ghost.png"}
]
phonkItems.forEach((element,i)=>
{
    element.getElementsByTagName("img")[0].src=phonks[i].coverPath;
    element.getElementsByClassName("phonkName")[0].innerText=phonks[i].phonkName;
});
masterPlay.addEventListener("click",()=>
{
    if (audioElement.paused || audioElement.currentTime<=0)
    {
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity=1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
        gif.style.opacity=0;
    }
});
audioElement.addEventListener("timeupdate",()=>
{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
    if (audioElement.duration)
    {
        let curMins=Math.floor(audioElement.currentTime/60);
        let curSecs=Math.floor(audioElement.currentTime-curMins*60);
        let durMins=Math.floor(audioElement.duration/60);
        let durSecs=Math.floor(audioElement.duration-durMins*60);
        if (curSecs<10) {curSecs="0"+curSecs};
        if (durSecs<10) {durSecs="0"+durSecs};
        if (curMins<10) {curMins="0"+curMins};
        if (durMins<10) {durMins="0"+durMins};
        current_time.innerText=curMins+":"+curSecs;
        total_time.innerText=durMins+":"+durSecs;
    }
    else
    {
        current_time.innerText="00"+":"+"00";
        total_time.innerText="00"+":"+"00";
    }
});
myProgressBar.addEventListener("change",()=>
{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
});
const makeAllPlay=()=>
{
    Array.from(document.getElementsByClassName("phonkItemPlay")).forEach((element)=>
    {
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    });
};
Array.from(document.getElementsByClassName("phonkItemPlay")).forEach((element)=>
{
    element.addEventListener("click",(e)=>
    {
        var count=0;
        makeAllPlay();
        phonkIndex=parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src=`./Music/${phonkIndex}.mp3`;
        masterPhonkName.innerText=phonks[phonkIndex].phonkName;
        audioElement.currentTime=0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        document.getElementById("masterPlay").addEventListener("click",()=>
        {
            makeAllPlay();
            gif.style.opacity=0;
            count++;
            if (count%2!=0)
            {
                gif.style.opacity=0;
                e.target.classList.remove("fa-pause-circle");
                e.target.classList.add("fa-play-circle");
            }
            else
            {
                gif.style.opacity=1;
                e.target.classList.remove("fa-play-circle");
                e.target.classList.add("fa-pause-circle");
            }
            audioElement.addEventListener("ended",()=>
            {
                gif.style.opacity=0;
                e.target.classList.remove("fa-pause-circle");
                e.target.classList.add("fa-play-circle");
            });
        });
        audioElement.addEventListener("ended",(e)=>
        {
            gif.style.opacity=0;
            e.target.classList.remove("fa-pause-circle");
            e.target.classList.add("fa-play-circle");
            document.getElementById("Repeat").addEventListener("click",()=>
            {
                audioElement.play();
                gif.style.opacity=1;
            });
        });
    });
});
document.getElementById("next").addEventListener("click",()=>
{
    if (phonkIndex>=5)
    {
        phonkIndex=0;
    }
    else
    {
        phonkIndex+=1;
    }
    audioElement.src=`./Music/${phonkIndex}.mp3`;
    masterPhonkName.innerText=phonks[phonkIndex].phonkName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});
document.getElementById("previous").addEventListener("click",()=>
{
    if (phonkIndex<=0)
    {
        phonkIndex=0;
    }
    else
    {
        phonkIndex-=1;
    }
    audioElement.src=`./Music/${phonkIndex}.mp3`;
    masterPhonkName.innerText=phonks[phonkIndex].phonkName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
});
function setVolume()
{
    audioElement.volume = volume_slider.value / 100;
}