
var trials = 0;
var lock = true;

function startRecorder() {
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      })
      .then(stream => {
          window.localStream = stream;
          const audioContext = new AudioContext();
          const analyser = audioContext.createAnalyser();
          const microphone = audioContext.createMediaStreamSource(stream);
          const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
      
          analyser.smoothingTimeConstant = 0.8;
          analyser.fftSize = 1024;
      
          microphone.connect(analyser);
          scriptProcessor.connect(audioContext.destination);
          scriptProcessor.onaudioprocess = function() {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            const arraySum = array.reduce((a, value) => a + value, 0);
            const average = arraySum / array.length;
            console.log(Math.round(average));
            // colorPids(average);
            const square = document.querySelector('.square');
            if(Math.round(average)>= 35 && trials ==0 && lock == false) {
                const ideaTextTrans = {
                    opacity: 1,
                  };
                
                  const ideaTextTransLeave = {
                    opacity: 0,
                    y: 20,
                    rotationY: 5,
                    skewX: "-15deg",
                  };
                const tl = new TimelineMax();
                tl.to(".caketext-3", 0.6, ideaTextTransLeave)
                    .to(".caketext-4", 0.2, ideaTextTrans)
                    .to(".caketext-4", 0.5, {scale: 1.2, color: "red"})
                playVideo2();
                setTimeout(playVideo1, 2000);
                trials ++;
                console.log(console)
            } else if (Math.round(average)>= 40 && trials ==2 && lock == false) {
                celebrate();
                playVideo3();
                setTimeout(stopVoice, 5100);
                setTimeout(startLetter, 4500);
                trials ++;
            }
          };
        })
        .catch(function(err) {
          /* handle the error */
          console.error(err);
        });
}

document.addEventListener("DOMContentLoaded", startRecorder);

function celebrate() {
    const ideaTextTrans = {
        opacity: 1,
      };
    
      const ideaTextTransLeave = {
        opacity: 0,
        y: 20,
        rotationY: 5,
        skewX: "-15deg",
      };
    const tl = new TimelineMax();
    tl.to(".caketext-4", 0.4, ideaTextTransLeave)
        .to(".caketext-5", 0.7, ideaTextTrans, "+=0.5")
}

function playVideo2() {
    video1 = document.getElementById('video1')
    video2 = document.getElementById('video2')
    video1.pause();
    ontop(video2);
    video2.play();
}
    
function playVideo1() {
    video1 = document.getElementById('video1')
    video2 = document.getElementById('video2')
    video2.pause();
    ontop(video1);
    video1.play();
    trials ++;
}

function playVideo3() {
    video1 = document.getElementById('video1')
    video2 = document.getElementById('video2')
    video3 = document.getElementById('video3')
    video1.pause();
    video2.pause();
    ontop(video3);
    video3.play();
}

function ontop(cake){
    var elements = document.getElementsByClassName("cake");
    var highest_index = 0;

    for (var i = 0; i < elements.length - 1; i++) 
    {
        if (parseInt(elements[i].style.zIndex) > highest_index) 
        {        
            highest_index = parseInt(elements[i].style.zIndex);
        }
    }

    cake.style.zIndex = highest_index + 1;
}

function stopVoice() {
    localStream.getTracks().forEach( (track) => {
        track.stop();
        });
    console.log("work"); 
    }


// var start_btn = document.querySelector('.start_btn');
// start_btn.onclick = ()=>{
//     stopVoice();//show info box
// }


// letter animations
function startLetter() {
    var $card = $(".card"),
      $bgCard = $(".bgCard"),
      $icon = $(".icon"),
      $openGift = $(".openGift"),
      $seven = $(".seven"),
      cartPageBottomP = document.querySelector(".cart-page-bottom p"),
      cartPageBottomH4 = document.querySelector(".cart-page-bottom h4");
      let textTitle = "Gửi bạn Mad-ison!";
      let charArrTitle = textTitle.split('');
  let text = "Happy valentine again :)). Thank you for taking your time to go through my gift, I hope you would enjoy it! You don't need, as well as, I don't need you to know who I am and I also don't need you to respond back. I just want to say that I like you and I want to give you sth on this day:)). Anyway, happy valentine, happy new year, have a good break and take care. Chúc bạn học giỏi và ngày càng xinh hơn! Please click continue to open the gift"
  let charArrContent = text.split('');
  var currentIndexTitle = 0;
  var currentIndexContent = 0;
  var textIntervalTitle;
  var textIntervalContent;
  function resetText(){
      clearInterval(textIntervalTitle)
      clearInterval(textIntervalContent)
      cartPageBottomH4.textContent = "";
      cartPageBottomP.textContent = "";
      currentIndexTitle = 0;
      currentIndexContent = 0;
  }
    $card.on("click", function () {
      $(this).toggleClass("is-opened");
      if($card.hasClass("is-opened")){
          textIntervalTitle = setInterval(function(){
              if(currentIndexTitle < charArrTitle.length){
                  cartPageBottomH4.textContent += charArrTitle[currentIndexTitle];
                  currentIndexTitle++;
                  console.log(currentIndexTitle)
              }
              else{
                  clearInterval(textIntervalTitle)
                  textIntervalContent = setInterval(function(){
                      if(currentIndexContent < charArrContent.length){
                          cartPageBottomP.textContent += charArrContent[currentIndexContent];
                          currentIndexContent++;
                  console.log(currentIndexContent)
                      }
                      else{
                          clearInterval(textIntervalContent);
                          $openGift.fadeIn();
                      }
                  },50)
              }
          },50)
      }
      else{
          resetText()
      }
    });
  
    $seven.fadeOut();
    $card.fadeIn();
    $bgCard.fadeIn();
    $icon.fadeIn();

    $(".fa-xmark").on("click", function () {
      $card.fadeOut();
      $bgCard.fadeOut();
      $icon.fadeOut();
      $card.removeClass("is-opened");
      resetText()
    });
  
  };
  
function unlockRecorder(){
    lock = false;
}

function openGiftfunc() {
    var $wrapper = $('.container');
    var $giftcontainer = $(".giftcontainer");
    var $instruction = $(".instruction");
    document.body.style.background="#FFDEF3";
    $wrapper.fadeOut();
    $giftcontainer.fadeIn();
    $instruction.fadeIn();
    console.log("buttonwork")
}

function hideInstruction() {
    var isclick1 = document.querySelector('#click');
    var isclick2 = document.querySelector('#click2');
    console.log(isclick1.checked);
    console.log(isclick2.checked);
    var continuebuttlon = document.querySelector('.end_btn');
    if(isclick1.checked && isclick2.checked){
        continuebuttlon.style.opacity = "1";
    }  
}

document.addEventListener("DOMContentLoaded", function(){
    alert("Please allow microphone access in order to proceed (mic-access is 100% safe, i'm not trying to do anything with it, it is just to make my gift work probably :)))")
})