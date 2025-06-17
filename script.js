document.addEventListener('DOMContentLoaded', function() {
    // Personalize the page
    const graduateName ='Engineer Tamagn Zewdu';
    const gradYear = '2025';
    const personalMessage = `Your hard work, dedication, and perseverance have paid off. We knew you could do it, <strong>${graduateName}</strong> ! This is just the beginning of an amazing journey. The future holds endless possibilities for someone as talented and determined as you.`;
    
    document.getElementById('graduate-name').textContent = graduateName;
    document.getElementById('grad-year').textContent = gradYear;
    document.getElementById('personal-message').innerHTML = personalMessage;
    
    // Photo gallery setup
    const galleryPhotos = [
         {
            url: 'images/photo_2024-10-20_17-15-30.jpg',
            caption: 'The day we first met'
        },
        {
            url: 'images/photo_2024-10-20_17-15-28.jpg',
            caption: 'Laundry memory'
        },
        {
            url: 'images/photo_2024-10-20_17-15-25.jpg',
            caption: 'Laundry memory'
        },
        {
            url: 'images/premium_photo-1683749809617-bb6885a1e7ae.avif',
            caption: 'God has blessed your efforts; you did it!'
        },
        {
            url: 'images/photo_2024-10-19_08-29-17.jpg',
            caption: 'የነዳያን ልብስ አጠባ ላይ'
        },
       
        {
            url: 'images/photo_2025-01-28_21-05-23.jpg',
            caption: 'The 2017 Epiphany Celebration at St. Michael s Church, Durbe District => የ2017 ዓ.ም የጥምቀት በዓልን ዱርቤ ወረዳ ቅዱስ ሚካኤል ቤተክርስቲያን'
        },
        {
            url: 'images/photo_2025-04-17_13-07-01 (2).jpg',
            caption:'The AMU TECH HUB MOVEMENT'
        },
        {
            url:'images/photo_2025-05-13_15-53-02.jpg',
            caption: 'God s guidance and Your hard work have led you to this graduation'
        },
        {
            url:'images/668ad07c2d4d624c48731a02-huxters-exam-congratulations-card-with.jpg',
            caption: 'May God bless your future plans'
        }
    ];
    
    const galleryContainer = document.querySelector('.gallery-container');
    let currentSlide = 0;
    let validSlides = [];
    
    function initGallery() {
        galleryContainer.innerHTML = '';
        validSlides = [];
        
        galleryPhotos.forEach((photo, index) => {
            const slide = document.createElement('div');
            slide.className = 'gallery-slide';
            
            const img = new Image();
            img.src = photo.url;
            img.alt = photo.caption || 'Memory photo';
            
            img.onerror = () => {
                console.warn('Image failed to load:', photo.url);
                slide.remove();
            };
            
            img.onload = () => {
                if (photo.caption) {
                    const caption = document.createElement('div');
                    caption.className = 'gallery-caption';
                    caption.textContent = photo.caption;
                    slide.appendChild(caption);
                }
                
                slide.appendChild(img);
                galleryContainer.appendChild(slide);
                validSlides.push(slide);
                
                if (index === 0) showSlide(0);
            };
        });
    }
    
    function showSlide(index) {
        if (validSlides.length === 0) return;
        
        currentSlide = (index + validSlides.length) % validSlides.length;
        
        validSlides.forEach((slide, i) => {
            slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`;
        });
    }
    
    // Navigation
    document.getElementById('next-btn').addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });
    
    document.getElementById('prev-btn').addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });
    
    // Initialize gallery
    initGallery();
    
    // Surprise button
    const surpriseBtn = document.getElementById('surprise-btn');
    const celebrationSound = document.getElementById('celebration-sound');
    
    surpriseBtn.addEventListener('click', function() {
        celebrationSound.play();
        createConfetti();
        
        const gradCap = document.querySelector('.grad-cap-animation i');
        gradCap.style.animation = 'none';
        void gradCap.offsetWidth;
        gradCap.style.animation = 'bounce 0.5s infinite, spin 1s linear';
        
        surpriseBtn.innerHTML = '<i class="fas fa-smile-beam"></i> You Did It!';
        setTimeout(() => {
            surpriseBtn.innerHTML = 'Click for a Surprise!';
            gradCap.style.animation = 'bounce 2s infinite';
        }, 3000);
    });
    
    // Share button
    const shareBtn = document.getElementById('share-btn');
    
    shareBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: `Congratulations ${graduateName} on Your Graduation!`,
                text: `Join me in celebrating ${graduateName}'s graduation from the Class of ${gradYear}!`,
                url: window.location.href
            }).catch(err => {
                console.log('Error sharing:', err);
                fallbackShare();
            });
        } else {
            fallbackShare();
        }
    });
    
    function fallbackShare() {
        alert('Link copied to clipboard! Share it with others to celebrate!');
    }
    
    // Confetti function
    function createConfetti() {
        const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
        
        const confettiContainer = document.getElementById('confetti');
        confettiContainer.innerHTML = '';
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}%`;
            confetti.style.animationDuration = `${animationDuration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            confettiContainer.appendChild(confetti);
        }
        
        setTimeout(() => {
            confettiContainer.innerHTML = '';
        }, 5000);
    }
    
    // Add spin animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin {
            0% { transform: translateY(0) rotate(0deg); }
            100% { transform: translateY(-20px) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});