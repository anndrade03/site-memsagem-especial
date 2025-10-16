document.addEventListener('DOMContentLoaded', () => {
    
    /* ------------------------------------------------ */
    /* --- Efeito Corações e Rosas Caindo em Background --- */
    /* ------------------------------------------------ */
    // Mantenha este bloco (corações e rosas) como está no arquivo anterior.
    // Ele não interfere na música, mas garante a funcionalidade visual.

    const fallingContainer = document.querySelector('.falling-elements');
    const elements = ['❤️', '🌹'];
    const numElements = 20;

    function createFallingElement() {
        const element = document.createElement('div');
        element.classList.add('falling-element');
        const content = elements[Math.floor(Math.random() * elements.length)];
        element.innerHTML = content;
        const startX = Math.random() * 100;
        element.style.left = `${startX}vw`;
        const size = Math.random() * 0.8 + 1; 
        element.style.fontSize = `${size}em`;
        const duration = Math.random() * 10 + 10;
        element.style.animationDuration = `${duration}s`;
        const delay = Math.random() * numElements * 0.5;
        element.style.animationDelay = `${delay}s`;
        fallingContainer.appendChild(element);
        element.addEventListener('animationend', () => {
            element.remove();
        });
    }

    for (let i = 0; i < numElements; i++) {
        createFallingElement();
    }
    setInterval(createFallingElement, 1000);


    /* ------------------------------------------------ */
    /* --- Controle da Música (Play/Pause) ATUALIZADO --- */
    /* ------------------------------------------------ */
    const music = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause-btn');

    // Estado inicial
    let isPlaying = false; 

    // Função para tocar a música
    function playMusic() {
        // Remove o mute antes de tocar
        music.muted = false; 
        
        // Tenta tocar e lida com a promessa (necessário para navegadores)
        const playPromise = music.play();

        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Tocou com sucesso
                playPauseBtn.innerHTML = '⏸️ Pause';
                playPauseBtn.setAttribute('aria-label', 'Pausar Música');
                isPlaying = true;
            }).catch(error => {
                // O autoplay foi bloqueado (esperado em alguns casos)
                console.log("Autoplay bloqueado. Música pronta para tocar ao clicar.");
                playPauseBtn.innerHTML = '▶️ Play';
                playPauseBtn.setAttribute('aria-label', 'Play Música');
                isPlaying = false;
                music.muted = true; // Mantém mudo até o clique
            });
        }
    }
    
    // Tenta tocar a música assim que o DOM estiver pronto
    // No celular, isso vai falhar e ela só tocará no clique.
    playMusic(); 
    
    // Listener do Botão
    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            // Pausar
            music.pause();
            playPauseBtn.innerHTML = '▶️ Play';
            playPauseBtn.setAttribute('aria-label', 'Play Música');
            isPlaying = false;
        } else {
            // Tocar (e tentar desmutar/tocar se já estiver em estado pausado/bloqueado)
            playMusic();
        }
    });

});