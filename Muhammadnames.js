const names = [
    { number: 1, arabic: "ٱلرَّحْمَٰن", english: "Ar-Rahman", meaning: "The Most Gracious" },
    { number: 2, arabic: "ٱلرَّحِيم", english: "Ar-Raheem", meaning: "The Most Merciful" },
    { number: 3, arabic: "ٱلْمَلِك", english: "Al-Malik", meaning: "The King, The Sovereign" },
    { number: 4, arabic: "ٱلْقُدُّوس", english: "Al-Quddus", meaning: "The Most Holy" },
    { number: 5, arabic: "ٱلسَّلَام", english: "As-Salam", meaning: "The Source of Peace" },
    { number: 6, arabic: "ٱلْمُؤْمِن", english: "Al-Mu'min", meaning: "The Guardian of Faith" },
    { number: 7, arabic: "ٱلْمُهَيْمِن", english: "Al-Muhaymin", meaning: "The Protector" },
    { number: 8, arabic: "ٱلْعَزِيز", english: "Al-Aziz", meaning: "The Almighty" },
    { number: 9, arabic: "ٱلْجَبَّار", english: "Al-Jabbar", meaning: "The Compeller" },
    { number: 10, arabic: "ٱلْمُتَكَبِّر", english: "Al-Mutakabbir", meaning: "The Greatest" }
    // Add all 99 names here
];

let currentIndex = 0;
let isAutoPlaying = false;
let autoPlayInterval;

function displayName(index, direction = 'next') {
    const name = names[index];
    const nameCard = document.getElementById('nameCard');
    
    // Remove all animation classes
    nameCard.classList.remove('flip-in', 'flip-out', 'next-enter', 'next-exit', 'prev-enter', 'prev-exit');
    
    // Add exit animation
    if (direction === 'next') {
        nameCard.classList.add('next-exit');
    } else {
        nameCard.classList.add('prev-exit');
    }
    
    // Update content after exit animation
    setTimeout(() => {
        // Update content
        document.getElementById('nameNumber').textContent = `#${name.number}`;
        document.getElementById('nameArabic').textContent = name.arabic;
        document.getElementById('nameEnglish').textContent = name.english;
        document.getElementById('nameMeaning').textContent = name.meaning;
        document.getElementById('pageInfo').textContent = `${name.number} / ${names.length}`;
        
        // Add enter animation
        nameCard.classList.remove('next-exit', 'prev-exit');
        if (direction === 'next') {
            nameCard.classList.add('next-enter');
        } else {
            nameCard.classList.add('prev-enter');
        }
        
        updateNavigationButtons();
    }, 400); // Half of the animation duration
}

function nextName() {
    if (currentIndex < names.length - 1) {
        currentIndex++;
        displayName(currentIndex, 'next');
    }
}

function previousName() {
    if (currentIndex > 0) {
        currentIndex--;
        displayName(currentIndex, 'prev');
    }
}

function toggleAutoPlay() {
    const autoPlayBtn = document.getElementById('autoPlayBtn');
    const nameCard = document.getElementById('nameCard');
    isAutoPlaying = !isAutoPlaying;
    
    nameCard.classList.toggle('active');
    autoPlayBtn.classList.toggle('active');
    
    if (isAutoPlaying) {
        autoPlayBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
        autoPlayInterval = setInterval(() => {
            if (currentIndex === names.length - 1) {
                currentIndex = -1;
            }
            nextName();
        }, 3000);
    } else {
        autoPlayBtn.innerHTML = '<i class="fas fa-play"></i> Auto Play';
        nameCard.classList.remove('active');
        clearInterval(autoPlayInterval);
    }
}

function showRandomName() {
    const randomIndex = Math.floor(Math.random() * names.length);
    if (randomIndex !== currentIndex) {
        const nameCard = document.getElementById('nameCard');
        nameCard.classList.add('flip-out');
        
        setTimeout(() => {
            currentIndex = randomIndex;
            nameCard.classList.remove('flip-out');
            nameCard.classList.add('flip-in');
            displayName(currentIndex, 'next');
        }, 400);
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === names.length - 1;
}

document.addEventListener('DOMContentLoaded', () => {
    displayName(currentIndex);
    
    document.getElementById('nextBtn').addEventListener('click', nextName);
    document.getElementById('prevBtn').addEventListener('click', previousName);
    document.getElementById('autoPlayBtn').addEventListener('click', toggleAutoPlay);
    document.getElementById('randomBtn').addEventListener('click', showRandomName);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextName();
        } else if (e.key === 'ArrowLeft') {
            previousName();
        } else if (e.key === ' ') {
            e.preventDefault();
            toggleAutoPlay();
        } else if (e.key === 'r') {
            showRandomName();
        }
    });
});
