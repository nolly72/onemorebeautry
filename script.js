// --- 1. МОБИЛЬНОЕ МЕНЮ И МОДАЛЬНОЕ ОКНО ---
function toggleMobileMenu() {
    const nav = document.getElementById('mobileNav');
    const burger = document.querySelector('.burger-menu');
    nav.classList.toggle('active');
    burger.classList.toggle('open');
}

function openLeadModal() {
    document.getElementById('lead-modal').classList.remove('hidden');
}

function closeLeadModal() {
    document.getElementById('lead-modal').classList.add('hidden');
}

function handleFormSubmit(e) {
    e.preventDefault();
    alert('Спасибо! Заявка успешно отправлена. Координатор свяжется с вами в течение 5 минут.');
    closeLeadModal();
    e.target.reset();
}

// Закрытие модального окна при клике на темную область вокруг формы
document.getElementById('lead-modal').addEventListener('click', function(e) {
    if (e.target === this) closeLeadModal();
});


// --- 2. ИИ-АССИСТЕНТ (СКРИПТ НА 5 ВОПРОСОВ) ---
let currentStep = 0;
const userAnswers = {};

const quizData = [
    {
        question: "Какое бьюти-направление вас интересует?",
        options: [
            { text: "💇‍♀️ Стилистика волос (стрижки, окрашивания)", value: "волосы" },
            { text: "💅 Ногтевой сервис (маникюр, педикюр)", value: "ногти" },
            { text: "✨ Эстетика лица (брови, ресницы, уход)", value: "лицо" }
        ]
    },
    {
        question: "Какая основная задача перед нами стоит?",
        options: [
            { text: "🔥 Полная смена имиджа и новый стиль", value: "смена" },
            { text: "🌿 Восстановление, уход и тотальный релакс", value: "уход" },
            { text: "⏱️ Экспресс-образ перед важным мероприятием", value: "экспресс" }
        ]
    },
    {
        question: "В какое время вам обычно комфортнее посещать салон?",
        options: [
            { text: "☀️ Утренние часы (с 10:00 до 14:00)", value: "утро" },
            { text: "☕ Дневное время (с 14:00 до 18:00)", value: "день" },
            { text: "🌌 Вечерние слоты (с 18:00 до 22:00)", value: "вечер" }
        ]
    },
    {
        question: "Категория мастера, которой вы отдаете предпочтение?",
        options: [
            { text: "🌟 Топ-мастер (авторские техники и премиум-опыт)", value: "топ" },
            { text: "💎 Классический мастер студии (высокое качество)", value: "профи" }
        ]
    },
    {
        question: "Какой персональный комплимент активировать к вашему визиту?",
        options: [
            { text: "🥂 Бокал премиального игристого или свежий матча-латте", value: "напиток" },
            { text: "💸 Приветственный комплимент -10% на первую услугу", value: "скидка" },
            { text: "🧴 Экспресс-уход для рук/волос во время процедуры", value: "гифт" }
        ]
    }
];

function toggleAiChat() {
    document.getElementById('ai-widget').classList.toggle('hidden');
}

function nextAiStep() {
    currentStep = 0;
    const body = document.getElementById('chat-body');
    body.innerHTML = `<div class="message ai">Анализируем ваши предпочтения...</div>`;
    renderQuestion();
}

function renderQuestion() {
    const body = document.getElementById('chat-body');
    const footer = document.getElementById('chat-footer');
    
    if (currentStep < quizData.length) {
        const step = quizData[currentStep];
        
        const qDiv = document.createElement('div');
        qDiv.className = 'message ai';
        qDiv.innerText = `Этап ${currentStep + 1}/${quizData.length}: ${step.question}`;
        body.appendChild(qDiv);
        
        footer.innerHTML = '';
        step.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-chat-action';
            btn.innerText = opt.text;
            btn.onclick = () => saveAnswer(opt.text, opt.value);
            footer.appendChild(btn);
        });
        
        body.scrollTop = body.scrollHeight;
    } else {
        showResult();
    }
}

function saveAnswer(text, val) {
    const body = document.getElementById('chat-body');
    userAnswers[`step_${currentStep}`] = val;
    
    const uDiv = document.createElement('div');
    uDiv.className = 'message user';
    uDiv.innerText = text;
    body.appendChild(uDiv);
    
    currentStep++;
    setTimeout(renderQuestion, 400);
}

function showResult() {
    const body = document.getElementById('chat-body');
    const footer = document.getElementById('chat-footer');
    let res = "";
    
    // Ветвление рекомендаций на основе ответов
    if (userAnswers.step_0 === "волосы") {
        res = "Исходя из ваших ответов, мы рекомендуем забронировать сложную технику окрашивания или премиум-стрижку 'Smart Cut' с восстанавливающим уходом.";
    } else if (userAnswers.step_0 === "ногти") {
        res = "Вам идеально подойдет наш фирменный комплекс в 4 руки (премиальный маникюр и педикюр) для максимальной экономии вашего времени.";
    } else {
        res = "Наилучший выбор для вас — комплекс моделирования взгляда (брови + ламинирование ресниц) в сочетании с экспресс-уходом за кожей лица.";
    }
    
    if (userAnswers.step_3 === "топ") {
        res += " Для реализации вашей задачи мы закрепим за вами Арт-директора или Топ-мастера студии.";
    }
    
    const rDiv = document.createElement('div');
    rDiv.className = 'message ai';
    rDiv.style.borderColor = 'var(--lime)';
    rDiv.innerHTML = `🎯 <b>Идеальное решение подобрано!</b><br><br>${res}<br><br>Ваш выбранный комплимент успешно зафиксирован за номером. Нажмите кнопку ниже для бронирования.`;
    body.appendChild(rDiv);
    
    footer.innerHTML = `
        <button class="btn-primary" style="width:100%; text-align:center; padding:12px;" onclick="toggleAiChat(); openLeadModal();">Забронировать этот вариант</button>
        <button class="btn-chat-action" style="text-align:center; margin-top:4px;" onclick="nextAiStep()">Пройти тест заново 🔄</button>
    `;
    
    body.scrollTop = body.scrollHeight;
}
