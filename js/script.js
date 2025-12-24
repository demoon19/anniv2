// Data puzzle dengan tanggal dan deskripsi foto
const puzzles = [
    {
        question: "Coba tebak kapan kamu ngefoto ini?",
        image: "assets/soal1.png",
        correctAnswer: "15 Agustus 2024",
        options: ["6 Januari 2024", "15 Agustus 2024", "9 Desember 2024"]
    },
    {
        question: "Tanggal kenangan di foto ini?",
        image: "assets/soal2.png",
        correctAnswer: "27 Desember 2023",
        options: ["27 Desember 2023", "26 Desember 2023", "25 Desember 2023"]
    },
    {
        question: "Momen spesial ini terjadi kapan?",
        image: "assets/soal3.png",
        correctAnswer: "3 Desember 2023",
        options: ["20 Desember 2023", "7 Oktober 2023", "3 Desember 2023"]
    }
];

let currentPuzzleIndex = 0;
let lives = 3;

function goTo(page) {
    window.location.href = page;
}

function resetGame() {
    currentPuzzleIndex = 0;
    lives = 3;
    updateLives();
    document.getElementById('currentPuzzle').textContent = '1';
}

function loadPuzzle() {
    if (!document.getElementById('puzzleContainer')) return;

    const puzzle = puzzles[currentPuzzleIndex];
    const container = document.getElementById('puzzleContainer');

    container.innerHTML = `
        <div class="puzzle">
            <div class="puzzle-question">${puzzle.question}</div>
            <div class="puzzle-image">
                <img src="${puzzle.image}" alt="Puzzle Image">
            </div>
            <div class="date-options">
                ${puzzle.options.map(opt =>
                    `<button class="date-option" onclick="checkAnswer('${opt}')">${opt}</button>`
                ).join('')}
            </div>
        </div>
    `;
}


function checkAnswer(answer) {
    const puzzle = puzzles[currentPuzzleIndex];

    if (answer === puzzle.correctAnswer) {
        currentPuzzleIndex++;
        if (currentPuzzleIndex < puzzles.length) {
            document.getElementById('currentPuzzle').textContent = currentPuzzleIndex + 1;
            loadPuzzle();
        } else {
            goTo('page4.html');
        }
    } else {
        lives--;
        updateLives();
        if (lives === 0) {
            alert('Kesempatan habis! Mulai ulang.');
            resetGame();
            loadPuzzle();
        } else {
            alert('Jawaban salah!');
        }
    }
}

function updateLives() {
    const el = document.getElementById('lives');
    if (el) el.textContent = lives;
}

function showModal() {
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function loadPhotos() {
    const container = document.getElementById('photoBackground');
    if (!container) return;

    // daftar foto background
    const photos = [
        'assets/1.jpeg',
        'assets/2.jpeg',
        'assets/3.jpeg',
        'assets/4.jpeg',
        'assets/5.png',
        'assets/6.jpeg',
        'assets/7.jpeg',
        'assets/8.jpeg',
        'assets/9.jpeg',
        'assets/10.jpeg'
    ];

    let html = '';

    // ulangi supaya scroll terasa penuh
    for (let i = 0; i < photos.length * 2; i++) {
        const src = photos[i % photos.length];
        html += `
            <div class="photo-item" style="background-image: url('${src}')"></div>
        `;
    }

    container.innerHTML = html;
}


window.onload = () => {
    loadPuzzle();
    loadPhotos();
};

function playMusicAndGo() {
    const music = document.getElementById('bgMusic');

    if (!music) {
        console.log('Audio element tidak ditemukan');
        return;
    }

    music.volume = 0.6;

    const playPromise = music.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            // audio berhasil diputar
            console.log('Audio diputar');
            setTimeout(() => {
                window.location.href = 'page5.html';
            }, 300);
        }).catch(error => {
            console.log('Audio gagal diputar:', error);
            // tetap lanjut halaman
            window.location.href = 'page5.html';
        });
    }
}
function goToFinal() {
    // simpan izin dari user
    localStorage.setItem('playMusic', 'yes');
    window.location.href = 'page5.html';
}
window.addEventListener('load', () => {
    const music = document.getElementById('bgMusic');

    if (music && localStorage.getItem('playMusic') === 'yes') {
        music.volume = 0.6;
        music.play().then(() => {
            console.log('Musik diputar');
            localStorage.removeItem('playMusic');
        }).catch(err => {
            console.log('Gagal memutar musik:', err);
        });
    }
});
