// Controle de Alternância do Tema (Acessibilidade)
const btnTheme = document.getElementById('btn-theme');
btnTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// Mecanismo de Simulação de Áudio Regulador (Ruído Branco Sintetizado)
const btnSound = document.getElementById('btn-sound');
let audioContext = null;
let noiseNode = null;
let isPlaying = false;

btnSound.addEventListener('click', () => {
    if (!isPlaying) {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        // Geração de ruído marrom/branco via Web Audio API para não depender de arquivos externos
        const bufferSize = 2 * audioContext.sampleRate;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            // Filtro para aproximar ao ruído marrom (mais suave e regulador para o TEA)
            output[i] = (lastOut + (0.02 * white)) / 1.02;
            lastOut = output[i];
            output[i] *= 3.5; 
        }
        
        noiseNode = audioContext.createBufferSource();
        noiseNode.buffer = noiseBuffer;
        noiseNode.loop = true;
        noiseNode.connect(audioContext.destination);
        noiseNode.start();
        
        btnSound.textContent = "🔊 Som Regulador: Ligado";
        btnSound.style.backgroundColor = "#2ecc71";
        btnSound.style.color = "white";
        isPlaying = true;
    } else {
        if (noiseNode) {
            noiseNode.stop();
            noiseNode.disconnect();
        }
        btnSound.textContent = "🔊 Som Regulador: Desligado";
        btnSound.style.backgroundColor = "";
        btnSound.style.color = "";
        isPlaying = false;
    }
});

// Lógica das Funções do Modal de Emergência e Proteção contra Crises
const modal = document.getElementById('pause-modal');
const btnPause = document.getElementById('btn-pause');
const btnResume = document.getElementById('btn-resume');

btnPause.addEventListener('click', () => {
    modal.style.display = 'flex';
});

btnResume.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Seleção de Alternativas de Forma Visual Separada
function selectOption(element) {
    const options = document.querySelectorAll('.option-card');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
}

// Fluxo de Transição Dinâmica de Questões (Simulação de Progresso Modular)
// Fluxo de Transição Dinâmica de Questões (Simulação de Progresso Modular)
let currentStep = 1;
function nextQuestion() {
    if(currentStep === 1) {
        document.getElementById('question-text').textContent = "Traduza para a linguagem simbólica: 'Se Estefany estuda computação, então ela desenvolve sistemas inclusivos.' Considerar os símbolos literais.";
        options[0].textContent = "A) $$p \\lor q$$";
        options[1].textContent = "B) $$p \\rightarrow q$$";
        options[2].textContent = "C) $$\\\\neg p \\\\land q$$";
        options[2].textContent = "C) \\( \\neg p \\land q \\)";
        options.forEach(opt => opt.classList.remove('selected'));
        
        document.getElementById('progress-text').textContent = "Questão 2 de 2";
        document.getElementById('progress-fill').style.width = "100%";
        document.getElementById('btn-next').textContent = "Finalizar Avaliação Confortável ➔";
        
        // COMANDO ADICIONADO: Avisa ao MathJax para renderizar as novas fórmulas da Questão 2
        if (typeof MathJax !== 'undefined') {
            MathJax.typeset();
        }

        currentStep = 2;
    } else {
        alert("Avaliação concluída com sucesso e estabilidade de saúde assegurada!");
    }
}