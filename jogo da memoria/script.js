const icons = ['🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🍉', '🍍', '🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🍉', '🍍'];
let firstCard, secondCard;
let hasFlippedCard = false;
let lockBoard = false;
let matches = 0;

const grid = document.getElementById('grid');
const message = document.getElementById('mensagem');
const restartButton = document.getElementById('reiniciar');

// Cria o tabuleiro do jogo
function createBoard() {
    const shuffledIcons = icons.sort(() => 0.5 - Math.random());
    shuffledIcons.forEach(icon => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.icon = icon;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

// Função para virar as cartas
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.icon;

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

// Verifica se as cartas combinam
function checkForMatch() {
    const isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

    isMatch ? disableCards() : unflipCards();
}

// Desativa as cartas combinadas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matches += 1;
    resetBoard();
    checkForWin();
}

// Desvira as cartas se não combinarem
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        firstCard.textContent = '';
        secondCard.classList.remove('flipped');
        secondCard.textContent = '';
        resetBoard();
    }, 1500);
}

// Reseta o estado do tabuleiro
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Verifica se o jogador ganhou
function checkForWin() {
    if (matches === icons.length / 2) {
        message.textContent = "Parabéns! Você encontrou todos os pares!";
    }
}

// Reinicia o jogo
restartButton.addEventListener('click', () => {
    grid.innerHTML = '';
    matches = 0;
    message.textContent = '';
    createBoard();
});

// Inicia o jogo
createBoard();
