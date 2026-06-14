function toggleMobileMenu() {
    document.getElementById('mobileNav').classList.toggle('active');
}

function openLeadModal() {
    document.getElementById('lead-modal').classList.remove('hidden');
}

function closeLeadModal() {
    document.getElementById('lead-modal').classList.add('hidden');
}

function handleFormSubmit(e) {
    e.preventDefault();
    alert('Заявка отправлена! Свяжемся с вами в течение 5 минут.');
    closeLeadModal();
    e.target.reset();
}

document.getElementById('lead-modal').addEventListener('click', function(e) {
    if (e.target === this) closeLeadModal();
});

let currentStep = 0;
const userAnswers = {};

const quizData = [
    {
        question: "Какое направление вас интересует?",
        options: [
            { text: "💇‍♀️ Волосы (стрижка, окрашивание)", value: "волосы" },
            { text: "💅 Ногти (маникюр, педикюр)", value: "ногти" },
            { text: "✨ Лицо (брови, ресницы, уход)", value: "лицо" }
        ]
    },
    {
        question: "Какая основная задача стоит перед нами?",
        options: [
            { text: "🔥 Полная смена имиджа", value: "смена" },
            { text: "🌿 Восстановление и релакс", value: "уход" },
            { text: "⏱️ Экспресс-образ к событию", value: "экспресс" }
        ]
    },
    {
        question: "В какое время вам удобнее прийти?",
        options: [
            { text: "☀️ Утро (с 10:00 до 14:00)", value: "утро" },
            { text: "☕ День (с 14:00 до 18:00)", value: "день" },
            { text: "🌌 Вечер (с 18:00 до 22:00)", value: "вечер" }
        ]
    },
    {
        question: "Какую категорию мастера выберем?",
        options: [
            { text: "🌟 Топ-мастер (премиум подход)", value: "топ" },
            { text: "💎 Классический мастер студии", value: "профи" }
        ]
    },
    {
        question: "Какой подарок закрепить за вашим визитом?",
        options: [
            { text: "🥂 Премиальный напиток (матча / игристое)", value: "напиток" },
            { text: "💸 Приветственный комплимент -10%", value: "скидка" },
            { text: "🧴 Экспресс-уход во время процедуры", value: "уход_рук" }
        ]
    }
];

function toggleAiChat() {
    document.getElementById('ai-widget').classList.toggle('hidden');
}

function nextAiStep() {
    currentStep = 0;
    const body = document.getElementById('chat-body');
    body.innerHTML = `<div class="message ai">Анализирую ваши предпочтения...</div>`;
    renderQuestion();
}

function renderQuestion() {
    const body = document.getElementById('chat-body');
    const footer = document.getElementById('chat-footer');
    
    if (currentStep < quizData.length) {
        const step = quizData[currentStep];
        const qDiv = document.createElement('div');
        qDiv.className = 'message ai';
        qDiv.innerText = `Вопрос ${currentStep + 1}/${quizData.length}: ${step.question}`;
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
    
    if (userAnswers.step_0 === "волосы") {
        res = "Рекомендуем записаться на комплексное окрашивание или стрижку 'Smart Cut' с восстанавливающим уходом.";
    } else if (userAnswers.step_0 === "ногти") {
        res = "Вам отлично подойдет комплекс премиум маникюра и педикюра в 4 руки для идеальной экономии времени.";
    } else {
        res = "Наилучший выбор — моделирование взгляда (брови + ресницы) и легкий уход за кожей лица.";
    }
    
    if (userAnswers.step_3 === "топ") {
        res += " Для реализации вашей задачи мы закрепим за вами Топ-мастера студии.";
    }
    
    const rDiv = document.createElement('div');
    rDiv.className = 'message ai';
    rDiv.style.borderColor = 'var(--lime)';
    rDiv.innerHTML = `🎯 <b>Решение подобрано!</b><br><br>${res}<br><br>Подарок успешно забронирован. Нажмите кнопку ниже для записи.`;
    body.appendChild(rDiv);
    
    footer.innerHTML = `
        <button class="btn-primary" style="width:100%; text-align:center; padding:12px;" onclick="toggleAiChat(); openLeadModal();">Записаться на сеанс</button>
        <button class="btn-chat-action" style="text-align:center; margin-top:4px;" onclick="nextAiStep()">Пройти заново 🔄</button>
    `;
    body.scrollTop = body.scrollHeight;
}
