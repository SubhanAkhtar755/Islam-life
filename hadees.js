




const hadeesData = [
    {
        number: 1,
        arabic: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ",
        urdu: "اعمال کا دارومدار نیتوں پر ہے",
        translation: "Actions are judged by intentions.",
        reference: "Sahih al-Bukhari 1",
        icon: "star"
    },
    {
        number: 2,
        arabic: "الدِّينُ النَّصِيحَةُ",
        urdu: "دین خیر خواہی کا نام ہے",
        translation: "The religion is sincerity.",
        reference: "Sahih Muslim 55",
        icon: "moon"
    },
    {
        number: 3,
        arabic: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ",
        urdu: "تم میں سے کوئی شخص اس وقت تک مومن نہیں ہو سکتا جب تک وہ اپنے بھائی کے لیے وہی پسند نہ کرے جو اپنے لیے پسند کرتا ہے",
        translation: "None of you truly believes until he loves for his brother what he loves for himself.",
        reference: "Sahih al-Bukhari 13",
        icon: "heart"
    },
    {
        number: 4,
        arabic: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ",
        urdu: "جو شخص اللہ اور آخرت کے دن پر ایمان رکھتا ہے اسے چاہیے کہ وہ اچھی بات کہے یا خاموش رہے",
        translation: "Whoever believes in Allah and the Last Day, let him speak good or remain silent.",
        reference: "Sahih al-Bukhari 6018",
        icon: "comment"
    },
    {
        number: 5,
        arabic: "طَلَبُ الْعِلْمِ فَرِيضَةٌ عَلَى كُلِّ مُسْلِمٍ",
        urdu: "علم حاصل کرنا ہر مسلمان پر فرض ہے",
        translation: "Seeking knowledge is an obligation upon every Muslim.",
        reference: "Sunan Ibn Majah 224",
        icon: "book"
    },
    {
        number: 6,
        arabic: "الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ",
        urdu: "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں",
        translation: "A Muslim is one from whose tongue and hands other Muslims are safe.",
        reference: "Sahih al-Bukhari 10",
        icon: "hands"
    }
];






















let currentIndex = 0;
const cardsPerLoad = 1;
const container = document.getElementById('hadeesContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const loading = document.getElementById('loading');
const currentHadeesDisplay = document.getElementById('currentHadees');
const totalHadeesDisplay = document.getElementById('totalHadees');

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('hadeesContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const loading = document.getElementById('loading');
    const currentHadeesDisplay = document.getElementById('currentHadees');
    const totalHadeesDisplay = document.getElementById('totalHadees');
    let currentIndex = 0;

    // Initialize total Hadees count
    totalHadeesDisplay.textContent = hadeesData.length;
    updateCounter();

    function createHadeesCard(hadees) {
        const card = document.createElement('div');
        card.className = 'hadees-card';
        
        card.innerHTML = `
            <div class="card-content">
                <i class="fas fa-${hadees.icon} decoration animate-float"></i>
                <div class="hadees-number slide-in">Hadees #${hadees.number}</div>
                <div class="arabic-text fade-in">${hadees.arabic}</div>
                <div class="urdu-text fade-in">${hadees.urdu}</div>
                <div class="translation slide-in-delayed">${hadees.translation}</div>
                <div class="reference fade-in-delayed">${hadees.reference}</div>
            </div>
        `;

        // Add hover animations
        card.addEventListener('mouseenter', () => {
            card.classList.add('card-hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('card-hover');
        });

        // Add click animation
        card.addEventListener('click', () => {
            card.classList.add('card-pulse');
            setTimeout(() => card.classList.remove('card-pulse'), 300);
        });

        return card;
    }

    function updateCounter() {
        currentHadeesDisplay.textContent = currentIndex + 1;
        // Update navigation buttons
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === hadeesData.length - 1;
    }

    function showLoading() {
        loading.style.display = 'block';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    }

    function hideLoading() {
        loading.style.display = 'none';
        updateCounter();
    }

    function displayHadees(index) {
        if (index < 0 || index >= hadeesData.length) return;

        showLoading();
        currentIndex = index;

        setTimeout(() => {
            // Create and display the current Hadees card
            const hadees = hadeesData[currentIndex];
            const card = createHadeesCard(hadees);
            
            // Clear previous card and add new one with fade out/in effect
            container.style.opacity = '0';
            setTimeout(() => {
                container.innerHTML = '';
                container.appendChild(card);
                container.style.opacity = '1';
                
                // Add entrance animation to the new card
                requestAnimationFrame(() => {
                    card.classList.add('card-visible');
                });
                
                hideLoading();
            }, 300);
        }, 500);
    }

    // Navigation event listeners
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            displayHadees(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < hadeesData.length - 1) {
            displayHadees(currentIndex + 1);
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            displayHadees(currentIndex - 1);
        } else if (e.key === 'ArrowRight' && currentIndex < hadeesData.length - 1) {
            displayHadees(currentIndex + 1);
        }
    });

    // Display first Hadees on page load
    displayHadees(0);
});
