window.onload = () => {
    const cards = document.querySelectorAll('.card');
    const c = document.querySelector('.cursor');
    const f = document.querySelector('.cursor-follower');

    // КУРСОР И 3D НАКЛОН
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX, y = e.clientY;
        c.style.left = f.style.left = x + 'px';
        c.style.top = f.style.top = y + 'px';

        cards.forEach(card => {
            const r = card.getBoundingClientRect();
            if (x > r.left && x < r.right && y > r.top && y < r.bottom) {
                const rx = -(y - (r.top + r.height/2)) / 15;
                const ry = (x - (r.left + r.width/2)) / 15;
                card.style.setProperty('--rx', `${rx}deg`);
                card.style.setProperty('--ry', `${ry}deg`);
                card.style.setProperty('--s', `1.04`);
            } else {
                card.style.setProperty('--rx', `0deg`);
                card.style.setProperty('--ry', `0deg`);
                card.style.setProperty('--s', `1`);
            }
        });
    });

    // ИСКРЫ ПРИ КЛИКЕ
    document.addEventListener('click', (e) => {
        for(let i=0; i<10; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            document.body.appendChild(p);
            p.style.left = e.clientX + 'px'; p.style.top = e.clientY + 'px';
            const dX = (Math.random()-0.5)*250, dY = (Math.random()-0.5)*250;
            setTimeout(() => { p.style.transform = `translate(${dX}px, ${dY}px) scale(0)`; p.style.opacity = 0; }, 10);
            setTimeout(() => p.remove(), 600);
        }
    });

    // АНИМАЦИЯ ЦИФР И ПОЛОСОК
    document.querySelectorAll('.num').forEach(n => {
        let target = +n.getAttribute('data-val'), count = 0;
        let t = setInterval(() => { n.innerText = ++count; if(count >= target) clearInterval(t); }, 20);
    });
    document.querySelectorAll('.bar').forEach(b => {
        const val = b.parentElement.previousElementSibling.querySelector('.num').getAttribute('data-val');
        setTimeout(() => { b.style.width = val + '%'; }, 100);
    });
};

function calc() {
    const v = document.getElementById('inp').value;
    if(v) document.getElementById('res').innerText = "Нужно: " + Math.round(v/730) + " руб/день";
}
const nitroBtn = document.getElementById('nitroBtn');

nitroBtn.addEventListener('click', () => {
    // Включаем эффекты
    document.body.classList.add('nitro-active');
    nitroBtn.classList.add('btn-nitro-on');
    nitroBtn.innerText = "NITRO ACTIVE! 🔥";

    // Автоматическое выключение через 5 секунд
    setTimeout(() => {
        document.body.classList.remove('nitro-active');
        nitroBtn.classList.remove('btn-nitro-on');
        nitroBtn.innerText = "ВКЛЮЧИТЬ NITRO 🚀";
    }, 5000);
    
    // Доп. фишка: куча искр при нажатии
    for(let i=0; i<30; i++) {
        createParticle(window.innerWidth/2, window.innerHeight - 100);
    }
});

// Вспомогательная функция для искр (если её нет)
function createParticle(x, y) {
    const p = document.createElement('div');
    p.className = 'particle';
    document.body.appendChild(p);
    p.style.left = x + 'px'; p.style.top = y + 'px';
    const dX = (Math.random()-0.5)*400, dY = (Math.random()-0.5)*400;
    setTimeout(() => { p.style.transform = `translate(${dX}px, ${dY}px) scale(0)`; p.style.opacity = 0; }, 10);
    setTimeout(() => p.remove(), 1000);
}

// ФУНКЦИЯ ЛЕТАЮЩИХ ЦЕЛЕЙ
function startFloatingEmojis() {
    const container = document.querySelector('.floating-icons');
    if (!container) return;

    const emojis = ['🐶', '🏠', '🏎️', '💻', '💰', '🔥'];
    setInterval(() => {
        const emoji = document.createElement('div');
        emoji.className = 'bg-emoji';
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Стили прямо в коде, чтобы не потерялись
        emoji.style.cssText = `
            position: fixed;
            bottom: -50px;
            left: ${Math.random() * 100}vw;
            font-size: ${Math.random() * 2 + 1}rem;
            opacity: 0.15;
            z-index: -1;
            pointer-events: none;
            transition: transform 15s linear;
        `;
        
        container.appendChild(emoji);
        setTimeout(() => { 
            emoji.style.transform = 'translateY(-120vh) rotate(360deg)'; 
        }, 100);
        setTimeout(() => emoji.remove(), 16000);
    }, 2000);
}

// Запускаем!
startFloatingEmojis();
