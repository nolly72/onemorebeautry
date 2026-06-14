// --- 1. ЛОГИКА МОБИЛЬНОГО МЕНЮ ---
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
    
    // Анимация самого бургера (опционально превращает полоски в крестик)
    const burger = document.querySelector('.burger-menu');
    burger.classList.toggle('open');
}

// Заглушка для кнопки онлайн-записи
function openBooking() {
    alert('Открытие виджета онлайн-записи (например, YCLIENTS)...');
}


// --- 2. ЛОГИКА ИИ-АССИСТЕНТА (СКРИПТ НА 5 ВОПРОСОВ) ---
let currentStep = 0;
const userAnswers = {};

// Структура квиза
const quizData = [
    {
        question: "Какая зона вас интересует больше всего?",
        options: [
            { text: "💇‍♀️ Волосы (стрижка, окрашивание)", value: "волосы" },
            { text: "💅 Ногти (маникюр, педикюр)", value: "ногти" },
            { text: "✨ Лицо (брови, ресницы, уход)", value: "лицо" }
        ]
    },
    {
        question: "Какая главная цель визита?",
        options: [
            { text: "⚡ Кардинальное изменение стиля", value: "смена_стиля" },
            { text: "🌿 Релакс, уход и восстановление", value: "уход" },
            { text: "⏱️ Быстро освежить образ перед событием", value: "экспресс" }
        ]
    },
    {
        question: "Как часто вы обычно посещаете бьюти-пространства?",
        options: [
            { text: "📅 Каждые 2-3 недели стабильно", value: "регулярно" },
            { text: "⏳ Раз в 1-2 месяца", value: "редко" },
            { text: "🎉 Только по особым случаям", value: "событие" }
        ]
    },
    {
        question: "Какой ценовой сегмент и категорию мастера вы рассматриваете?",
        options: [
            { text: "🌟 Топ-мастер (премиум подход)", value: "топ" },
            { text: "💎 Классический мастер (оптимально)", value: "стандарт" }
        ]
    },
    {
        question: "Какой бонус для первого визита вам активировать?",
        options: [
            { text: "☕ Бесплатный авторский матча-латте", value: "матча" },
            { text: "💸 Скидка 10% на первую услугу", value: "скидка" },
            { text: "🧴 Профессиональный мини-уход в подарок", value: "подарок" }
        ]
    }
];

// Показать/скрыть окно чата
function toggleAiChat() {
    const widget = document.getElementById('ai-widget');
    widget.classList.toggle('hidden');
}

// Запуск квиза по нажатию на стартовую кнопку
function nextAiStep() {
    currentStep = 0;
    const chatBody = document.getElementById('chat-body');
    
    // Очищаем чат, оставляя приветствие
    chatBody.innerHTML = `<div class="message ai">Отлично! Начнем подбор.</div>`;
    renderQuestion();
}

// Отрендерить текущий вопрос и варианты ответов
function renderQuestion() {
    const chatBody = document.getElementById('chat-body');
    const chatFooter = document.getElementById('chat-footer');
    
    if (currentStep < quizData.length) {
        const stepData = quizData[currentStep];
        
        // Добавляем вопрос от ИИ в окно чата
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message ai';
        msgDiv.innerText = `Вопрос ${currentStep + 1}/${quizData.length}: ${stepData.question}`;
        chatBody.appendChild(msgDiv);
        
        // Очищаем футер и генерируем кнопки вариантов ответа
        chatFooter.innerHTML = '';
        stepData.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'btn-chat-action';
            btn.innerText = opt.text;
            btn.onclick = () => handleUserAnswer(opt.text, opt.value);
            chatFooter.appendChild(btn);
        });
        
        // Прокручиваем чат вниз к новому вопросу
        chatBody.scrollTop = chatBody.scrollHeight;
    } else {
        showResult();
    }
}

// Обработка выбора пользователя
function handleUserAnswer(text, value) {
    const chatBody = document.getElementById('chat-body');
    
    // Сохраняем ответ
    userAnswers[`step_${currentStep}`] = value;
    
    // Выводим ответ пользователя в чат для симуляции диалога
    const userMsg = document.createElement('div');
    userMsg.className = 'message user';
    userMsg.innerText = text;
    chatBody.appendChild(userMsg);
    
    // Переходим к следующему шагу с небольшой естественной задержкой
    currentStep++;
    setTimeout(renderQuestion, 400);
}

// Расчет и вывод итогового результата
function showResult() {
    const chatBody = document.getElementById('chat-body');
    const chatFooter = document.getElementById('chat-footer');
    
    let recommendation = "";
    
    // Базовая логика ветвления на основе ответов
    if (userAnswers.step_0 === "волосы") {
        recommendation = "Идеальный выбор — наш фирменный комплекс 'Умная стрижка + SPA-уход для волос'.";
    } else if (userAnswers.step_0 === "ногти") {
        recommendation = "Рекомендуем сет 'Маникюр + Педикюр в 4 руки' — это сэкономит ваше время и подарит премиум-комфорт.";
    } else {
        recommendation = "Вам идеально подойдет комплексный уход за лицом и архитектура бровей от наших ведущих мастеров.";
    }
    
    if (userAnswers.step_3 === "топ") {
        recommendation += " Мы закрепим за вами Топ-мастера студии.";
    }
    
    // Выводим финальное сообщение ИИ
    const resultMsg = document.createElement('div');
    resultMsg.className = 'message ai';
    resultMsg.style.borderColor = 'var(--lime)'; // Подсвечиваем результат зеленым лаймом
    resultMsg.innerHTML = `🎉 <b>Анализ завершен!</b><br><br>${recommendation}<br><br>Ваш выбранный бонус успешно забронирован! Нажмите кнопку ниже, чтобы выбрать удобное время.`;
    chatBody.appendChild(resultMsg);
    
    // Меняем футер на финальное действие
    chatFooter.innerHTML = `
        <button class="btn-primary" style="width: 100%; text-align: center; padding: 12px;" onclick="openBooking()">Записаться на этот комплекс</button>
        <button class="btn-chat-action" style="text-align: center; margin-top: 5px;" onclick="nextAiStep()">Пройти заново 🔄</button>
    `;
    
    chatBody.scrollTop = chatBody.scrollHeight;
}
