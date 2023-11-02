const html = document.querySelector('html');

const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const mudicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const alterarImagemPlauPause = document.querySelector('#start-pause img');
const tempoNaTela = document.querySelector('#timer');

const musica = new Audio('/sons/luna-rise-part-one.mp3');
const tocar = new Audio('/sons/play.wav');
const pause = new Audio('/sons/pause.mp3');
const stop = new Audio('/sons/beep.mp3');

musica.loop = true;
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

mudicaFocoInput.addEventListener('change', () => {
    if(mudicaFocoInput.checked){
        musica.play();
    }else{
        musica.pause();
    }
});

focoBt.addEventListener('click', () => {
   alterarContexto('foco');
   focoBt.classList.add('active');
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
})

function alterarContexto(contexto){
    botoes.forEach(function(contexto){
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);

    switch(contexto){
        case 'foco':
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case 'descanso-curto':
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case 'descanso-longo':
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        // stop.play();
        alert('Tempo finalizado!')
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        pause.play();
        zerar();
        return;
    }
    tocar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    alterarImagemPlauPause.setAttribute('src', 'imagens/pause.png');
    iniciarOuPausarBt.textContent = 'Pausar';
}

function zerar(){
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';
    alterarImagemPlauPause.setAttribute('src', 'imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = tempoDecorridoEmSegundos;
    tempoNaTela.innerHTML = `${tempo}`;
}

mostrarTempo();