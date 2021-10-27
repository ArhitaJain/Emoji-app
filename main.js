prediction_1 = '';
prediction_2 = '';

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function snapshot()
{
    Webcam.snap(function (data_uri) {
    document.getElementById("result").innerHTML = '<img id="cap_img" src="'+data_uri+'"/>';
    });
}

console.log("ml5.version:", ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json',modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded!");
}

function check()
{
    img = document.getElementById("camera");
    classifier.classify(img, got_result);
}

function got_result(error, results)
{
 if (error){
     console.log(error);
 }
 else{
     console.log(results);
     document.getElementById("result_emotion_name").innerHTML = results[0].label;
     document.getElementById("result_emotion_name2").innerHTML = results[1].label;
     prediction_1 = results[0].label;
     prediction_2 = results[1].label;
     speak();
     if (results[0].label == 'happy'){
      document.getElementById("update_emoji").innerHTML = "&#128522;";
     }
     if (results[0].label == 'sad'){
        document.getElementById("update_emoji").innerHTML = "&#128532;";
       }
    if (results[0].label == 'angry'){
        document.getElementById("update_emoji").innerHTML = "&#128548;";
       }
       if (results[1].label == 'happy'){
        document.getElementById("update_emoji2").innerHTML = "&#128522;";
       }
       if (results[1].label == 'sad'){
          document.getElementById("update_emoji2").innerHTML = "&#128532;";
         }
      if (results[1].label == 'angry'){
          document.getElementById("update_emoji2").innerHTML = "&#128548;";
         }
 }
}

function speak()
{
 var synth = window.speechSynthesis;
 var speak_dat1 = "The first prediction is" + prediction_1;
 var speak_dat2 = "And secnd prediction is" + prediction_2;

 var Utterthis = new SpeechSynthesisUtterance(speak_dat1 + speak_dat2);
 synth.speak(Utterthis);
}