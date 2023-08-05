const textArea = document.querySelector('#text');
let listaVoz = document.querySelector('#voice');
let falatuBtn = document.querySelector('.submit');
let synth = speechSynthesis;
let isSpeaking = true;




function falatu() {
    for (let voice of synth.getVoices()) {
        let option = document.createElement('option')
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
            });
        } else {
            falatuBtn.innerHTML = 'Repetir fala';
        }

        // Chamada da função converterTexto() após clicar no botão
        converterTexto();
    }
});

function converterTexto() {
    for (let voice of synth.getVoices()) {
        if (voice.name === listaVoz.value) {
            falarTexto(textArea.value);
            const conversionMessage = document.getElementById('conversionMessage');
            conversionMessage.style.display = 'block';
            setTimeout(() => {
                conversionMessage.style.display = 'none';
            }, 2000);
            break;
        }
    }
}