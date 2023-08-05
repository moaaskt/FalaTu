const textArea = document.querySelector('#text');
let listaVoz = document.querySelector('#voice');
let falatuBtn = document.querySelector('.submit');
let synth = speechSynthesis;
let isSpeaking = true;

function falatu() {
    for (let voice of synth.getVoices()) {
        let option = document.createElement('option');
        option.text = voice.name;
        listaVoz.add(option);
    }
}

synth.addEventListener('voiceschanged', falatu);

function falarTexto(text) {
    let alternar = new SpeechSynthesisUtterance(text);
    for (let voice of synth.getVoices()) {
        if (voice.name === listaVoz.value) {
            alternar.voice = voice;
        }
    }
    speechSynthesis.speak(alternar);
}

falatuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (textArea.value !== '') {
        if (!synth.speaking) {
            falarTexto(textArea.value);
        }
        if (textArea.value.length > 80) {
            if (isSpeaking) {
                synth.resume();
                isSpeaking = false;
                falatuBtn.innerHTML = 'Pausar fala';
            } else {
                synth.pause();
                isSpeaking = true;
                falatuBtn.innerHTML = 'Continuar fala';
            }
            setInterval(() => {
                if (!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    falatuBtn.innerHTML = 'Fala tu';
                }
            }, 100); // Especifica o intervalo em milissegundos (100 ms no exemplo)
        } else {
            falatuBtn.innerHTML = 'Repetir fala';
        }
    }
});
