const textArea = document.querySelector('#text');
let listaVoz = document.querySelector('#voice');
//voiceList
let falatuBtn = document.querySelector('.submit');
//speechbBtn
let synth = speechSynthesis;
let isSpeaking = true;

function falatu() {
  //voiceSpeech
  
    for (let voice of synth.getVoices()) {
        let option = document.createElement('option')
        option.text = voice.name;
        listaVoz.add(option);

    }

}

synth.addEventListener('voiceschanged', falatu);

function falarTexto(text){
//textTospeech


    let alternar = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === listaVoz.value){
            alternar.voice = voice;
        }
    }
    speechSynthesis.speak(alternar);


}


//funcao do botao

falatuBtn.addEventListener('click', (e) =>{
e.preventDefault();
if(textArea.value !== ''){
    if(!synth.isSpeaking){
        falarTexto(textArea.value);
    }
    if(textArea.value.lenght > 80){
        if(isSpeaking){
            synth.resume();
            isSpeaking = false;
            falatuBtn.innerHTML = 'Pausar fala'
        }else {
            synth.pause();
            isSpeaking = true;
            falatuBtn.innerHTML = 'Continuar fala'
        }
        setInterval(() => {
           if(!synth.speaking && !isSpeaking){
            isSpeaking = true;
            falatuBtn.innerHTML = 'Converter texto em fala'
           }
        })
    }else {
        falatuBtn.innerHTML = 'Converter para falar'
    }
}


})

