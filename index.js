const h2 = document.querySelector('#question');
const option1 = document.querySelector('#option1');
const option2 = document.querySelector('#option2');
const option3 = document.querySelector('#option3');
const option4 = document.querySelector('#option4');
const label1 = document.querySelector('#label1');
const label2 = document.querySelector('#label2');
const label3 = document.querySelector('#label3');
const label4 = document.querySelector('#label4');
const next = document.querySelector('#next');
const clear = document.querySelector('#clear');
const startAgain = document.querySelector('#startAgain');
const home = document.querySelector('#home');
const liveScore = document.querySelector('#liveScore');
const questionNumber = document.querySelector('#questionNumber');
const minutesDisplay = document.querySelector('#minutes');
const secondsDisplay = document.querySelector('#seconds');

const questions = [
    {
        que: "Which of the following is used to declare a variable in JavaScript?",
        a: 'var',
        b: 'let',
        c: 'const',
        d: 'all',
        correct: 'all'
    },
    {
        que: "Which function is used to display an alert box in JavaScript?",
        a: 'alert',
        b: 'msg',
        c: 'popup',
        d: 'notify',
        correct: 'alert'
    },
    {
        que: "Which of the following is NOT a JavaScript data type?",
        a: 'String',
        b: 'boolean',
        c: 'Float',
        d: 'Int',
        correct: 'Float'
    },
    {
        que: "How do you access the first element of an array arr?",
        a: 'arr.first()',
        b: 'arr[0]',
        c: 'arr.begin()',
        d: 'arr.get(0)',
        correct: 'arr[0]'
    },
];

let currentIndex = 0;
let score = 0;
let timerInterval;

const updateScore = () => {
    liveScore.textContent = `Score: ${score}`;
}

const updateQuestionNumber = () => {
    questionNumber.textContent = `Question No. ${currentIndex + 1} of ${questions.length}`;
}

const paste = (index) => {
    h2.innerHTML = questions[index].que;
    label1.innerHTML = questions[index].a;
    label2.innerHTML = questions[index].b;
    label3.innerHTML = questions[index].c;
    label4.innerHTML = questions[index].d;

    document.querySelectorAll('input[name="choice"]').forEach(input => {
        input.checked = false;
    });

    updateQuestionNumber();
}

const checkAnswer = (index) => {
    const selectedOption = document.querySelector('input[name="choice"]:checked');
    if (selectedOption) {
        const userAnswer = selectedOption.nextElementSibling.innerHTML;
        if (userAnswer === questions[index].correct) {
            score++;
        }
    }
    updateScore();
};

const congratulation = () => {
    h2.innerHTML = `You have completed the quiz. Your score is ${score}/${questions.length}.`;
    document.querySelector('.options').style.display = 'none';
    document.querySelector('.button-container').style.display = 'none';
    clearInterval(timerInterval);
};

const resetQuiz = () => {
    currentIndex = 0;
    score = 0;
    updateScore();
    document.querySelector('.options').style.display = 'block';
    document.querySelector('.button-container').style.display = 'flex';
    paste(currentIndex);
    resetTimer();
};

next.addEventListener('click', () => {
    if (currentIndex < questions.length) {
        checkAnswer(currentIndex);
        currentIndex++;
        if (currentIndex < questions.length) {
            paste(currentIndex);
        } else {
            congratulation();
        }
    }
});

clear.addEventListener('click', () => {
    document.querySelectorAll('input[name="choice"]').forEach(input => {
        input.checked = false;
    });
});

startAgain.addEventListener('click', () => {
    resetQuiz();
});

home.addEventListener('click', () => {
    window.location.reload();
});

paste(currentIndex);

const startTimer = () => {
    let timeRemaining = 5 * 60; // 5 minutes in seconds

    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;

        minutesDisplay.textContent = minutes < 10 ? `0${minutes}` : minutes;
        secondsDisplay.textContent = seconds < 10 ? `0${seconds}` : seconds;

        if (timeRemaining > 0) {
            timeRemaining--;
        } else {
            clearInterval(timerInterval);
            congratulation();
        }
    }, 1000);
};

const resetTimer = () => {
    clearInterval(timerInterval);
    minutesDisplay.textContent = "05";
    secondsDisplay.textContent = "00";
    startTimer();
};

startTimer();
