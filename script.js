// Global variables
let currentTable = null;
let audioPlayer = null;
let isPlaying = false;
let isRepeat = false;
let progressData = {};

// Quiz variables
let selectedQuizTables = [];
let currentQuiz = [];
let currentQuestionIndex = 0;
let quizScore = 0;
let totalQuizQuestions = 10;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    audioPlayer = document.getElementById('table-audio');
    const playBtn = document.getElementById('play-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const tableButtons = document.querySelectorAll('.table-btn');
    
    // Mode selection buttons
    const learnModeBtn = document.getElementById('learn-mode-btn');
    const quizModeBtn = document.getElementById('quiz-mode-btn');
    const learnMode = document.getElementById('learn-mode');
    const quizMode = document.getElementById('quiz-mode');
    
    // Quiz elements
    const quizTableButtons = document.querySelectorAll('.quiz-table-btn');
    const startQuizBtn = document.getElementById('start-quiz-btn');
    const submitAnswerBtn = document.getElementById('submit-answer-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const endQuizBtn = document.getElementById('end-quiz-btn');
    const restartQuizBtn = document.getElementById('restart-quiz-btn');
    
    // Load progress data from localStorage if available
    loadProgress();
    
    // Add event listeners to mode buttons
    learnModeBtn.addEventListener('click', function() {
        learnModeBtn.classList.add('active');
        quizModeBtn.classList.remove('active');
        learnMode.classList.add('active');
        quizMode.classList.remove('active');
    });
    
    quizModeBtn.addEventListener('click', function() {
        quizModeBtn.classList.add('active');
        learnModeBtn.classList.remove('active');
        quizMode.classList.add('active');
        learnMode.classList.remove('active');
    });
    
    // Add event listeners to table buttons
    tableButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tableNumber = parseInt(this.getAttribute('data-table'));
            selectTable(tableNumber);
            
            // Update active button styling
            tableButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Add event listeners to audio controls
    playBtn.addEventListener('click', playTableSong);
    pauseBtn.addEventListener('click', pauseTableSong);
    repeatBtn.addEventListener('click', toggleRepeat);
    
    // Add event listener for audio completion
    audioPlayer.addEventListener('ended', function() {
        if (isRepeat) {
            // If repeat is on, play again
            audioPlayer.currentTime = 0;
            audioPlayer.play();
        } else {
            // If repeat is off, update progress and reset
            updateProgress(currentTable, 'Completed');
            isPlaying = false;
            playBtn.disabled = false;
            pauseBtn.disabled = true;
        }
    });
    
    // Add event listener for audio time update to update progress bar
    audioPlayer.addEventListener('timeupdate', updateProgressBar);
    
    // Add event listeners to quiz table buttons
    quizTableButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
    
    // Add event listener to start quiz button
    startQuizBtn.addEventListener('click', startQuiz);
    
    // Add event listener to submit answer button
    submitAnswerBtn.addEventListener('click', submitAnswer);
    
    // Add event listener to next question button
    nextQuestionBtn.addEventListener('click', showNextQuestion);
    
    // Add event listener to end quiz button
    endQuizBtn.addEventListener('click', endQuiz);
    
    // Add event listener to restart quiz button
    restartQuizBtn.addEventListener('click', function() {
        document.querySelector('.quiz-results').style.display = 'none';
        document.querySelector('.quiz-settings').style.display = 'block';
    });
    
    // Add event listener for Enter key on answer input
    document.getElementById('answer-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitAnswer();
        }
    });
});

// Function to select a multiplication table
function selectTable(tableNumber) {
    currentTable = tableNumber;
    
    // Update the table title
    document.getElementById('current-table-title').textContent = `${tableNumber} Times Table`;
    
    // Generate and display the table
    generateTable(tableNumber);
    
    // Update audio source - changed from audio/table_${tableNumber}.mp3 to flat structure
    audioPlayer.src = `table_${tableNumber}.mp3`;
    
    // Enable play button
    document.getElementById('play-btn').disabled = false;
    document.getElementById('repeat-btn').disabled = false;
    
    // Update progress status to "In Progress" if not already completed
    if (progressData[tableNumber] !== 'Completed') {
        updateProgress(tableNumber, 'In Progress');
    }
}

// Function to generate multiplication table
function generateTable(tableNumber) {
    const tableContent = document.getElementById('table-content');
    tableContent.innerHTML = '';
    
    for (let i = 1; i <= 10; i++) {
        const result = tableNumber * i;
        const tableItem = document.createElement('div');
        tableItem.className = 'table-item';
        tableItem.setAttribute('data-index', i);
        tableItem.textContent = `${tableNumber} × ${i} = ${result}`;
        tableContent.appendChild(tableItem);
    }
}

// Function to play the table song
function playTableSong() {
    if (currentTable) {
        audioPlayer.play();
        isPlaying = true;
        document.getElementById('play-btn').disabled = true;
        document.getElementById('pause-btn').disabled = false;
        
        // Start highlighting table items in sequence
        highlightTableItems();
    }
}

// Function to pause the table song
function pauseTableSong() {
    audioPlayer.pause();
    isPlaying = false;
    document.getElementById('play-btn').disabled = false;
    document.getElementById('pause-btn').disabled = true;
}

// Function to toggle repeat
function toggleRepeat() {
    isRepeat = !isRepeat;
    const repeatBtn = document.getElementById('repeat-btn');
    repeatBtn.textContent = isRepeat ? 'Repeat: ON' : 'Repeat: OFF';
}

// Function to highlight table items in sequence during playback
function highlightTableItems() {
    // Remove all highlights first
    const tableItems = document.querySelectorAll('.table-item');
    tableItems.forEach(item => item.classList.remove('highlight'));
    
    // Calculate which item to highlight based on audio progress
    if (isPlaying && audioPlayer.duration) {
        const progressPercentage = audioPlayer.currentTime / audioPlayer.duration;
        const itemIndex = Math.floor(progressPercentage * 10);
        
        if (itemIndex < 10) {
            tableItems[itemIndex].classList.add('highlight');
        }
        
        // Schedule next highlight
        setTimeout(highlightTableItems, 100);
    }
}

// Function to update progress bar
function updateProgressBar() {
    if (audioPlayer.duration) {
        const progressPercentage = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        document.getElementById('progress').style.width = `${progressPercentage}%`;
    }
}

// Function to update progress status
function updateProgress(tableNumber, status) {
    progressData[tableNumber] = status;
    saveProgress();
    
    // Update UI
    const progressItem = document.querySelector(`.progress-item[data-table="${tableNumber}"]`);
    if (progressItem) {
        // Remove existing status classes
        progressItem.classList.remove('in-progress', 'completed');
        
        // Add appropriate class
        if (status === 'In Progress') {
            progressItem.classList.add('in-progress');
        } else if (status === 'Completed') {
            progressItem.classList.add('completed');
        }
        
        // Update status text
        const statusElement = progressItem.querySelector('.status');
        if (statusElement) {
            statusElement.textContent = status;
        }
    }
}

// Function to save progress to localStorage
function saveProgress() {
    localStorage.setItem('multiplicationTablesProgress', JSON.stringify(progressData));
}

// Function to load progress from localStorage
function loadProgress() {
    const savedProgress = localStorage.getItem('multiplicationTablesProgress');
    if (savedProgress) {
        progressData = JSON.parse(savedProgress);
        
        // Update UI based on loaded progress
        for (const tableNumber in progressData) {
            updateProgress(parseInt(tableNumber), progressData[tableNumber]);
        }
    }
}

// QUIZ FUNCTIONALITY

// Function to start the quiz
function startQuiz() {
    // Get selected tables
    selectedQuizTables = [];
    document.querySelectorAll('.quiz-table-btn.active').forEach(button => {
        selectedQuizTables.push(parseInt(button.getAttribute('data-table')));
    });
    
    // Check if at least one table is selected
    if (selectedQuizTables.length === 0) {
        alert('Please select at least one multiplication table for the quiz.');
        return;
    }
    
    // Generate quiz questions
    generateQuizQuestions();
    
    // Reset quiz state
    currentQuestionIndex = 0;
    quizScore = 0;
    
    // Update UI
    document.querySelector('.quiz-settings').style.display = 'none';
    document.querySelector('.quiz-question-container').style.display = 'block';
    document.querySelector('.quiz-results').style.display = 'none';
    
    // Show first question
    showQuestion();
    
    // Update total questions display
    document.getElementById('total-questions').textContent = totalQuizQuestions;
}

// Function to generate quiz questions
function generateQuizQuestions() {
    currentQuiz = [];
    
    // Create a pool of all possible questions from selected tables
    let questionPool = [];
    
    selectedQuizTables.forEach(table => {
        for (let i = 1; i <= 10; i++) {
            questionPool.push({
                multiplicand: table,
                multiplier: i,
                answer: table * i
            });
        }
    });
    
    // Shuffle the question pool
    shuffleArray(questionPool);
    
    // Select questions for the quiz (up to totalQuizQuestions)
    currentQuiz = questionPool.slice(0, totalQuizQuestions);
    
    // If we don't have enough questions, repeat some
    if (currentQuiz.length < totalQuizQuestions) {
        while (currentQuiz.length < totalQuizQuestions) {
            // Get random questions from the pool and add them
            const randomIndex = Math.floor(Math.random() * questionPool.length);
            currentQuiz.push(questionPool[randomIndex]);
        }
    }
    
    // Shuffle the final quiz questions
    shuffleArray(currentQuiz);
}

// Function to shuffle an array (Fisher-Yates algorithm)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to show the current question
function showQuestion() {
    const question = currentQuiz[currentQuestionIndex];
    const questionText = document.getElementById('question-text');
    
    // Display the question
    questionText.textContent = `What is ${question.multiplicand} × ${question.multiplier}?`;
    
    // Clear previous answer and feedback
    document.getElementById('answer-input').value = '';
    document.getElementById('feedback-message').textContent = '';
    document.getElementById('feedback-message').className = 'feedback-message';
    
    // Update current score display
    document.getElementById('current-score').textContent = quizScore;
    
    // Hide next/end buttons
    document.getElementById('next-question-btn').style.display = 'none';
    document.getElementById('end-quiz-btn').style.display = 'none';
    
    // Focus on answer input
    document.getElementById('answer-input').focus();
}

// Function to submit an answer
function submitAnswer() {
    const answerInput = document.getElementById('answer-input');
    const userAnswer = parseInt(answerInput.value);
    
    // Check if answer is a number
    if (isNaN(userAnswer)) {
        document.getElementById('feedback-message').textContent = 'Please enter a number.';
        return;
    }
    
    const correctAnswer = currentQuiz[currentQuestionIndex].answer;
    const feedbackMessage = document.getElementById('feedback-message');
    
    // Check if answer is correct
    if (userAnswer === correctAnswer) {
        feedbackMessage.textContent = 'Correct! Great job!';
        feedbackMessage.className = 'feedback-message correct';
        quizScore++;
        document.getElementById('current-score').textContent = quizScore;
    } else {
        feedbackMessage.textContent = `Incorrect. The correct answer is ${correctAnswer}.`;
        feedbackMessage.className = 'feedback-message incorrect';
    }
    
    // Show next question or end quiz button
    if (currentQuestionIndex < totalQuizQuestions - 1) {
        document.getElementById('next-question-btn').style.display = 'inline-block';
    } else {
        document.getElementById('end-quiz-btn').style.display = 'inline-block';
    }
    
    // Disable submit button until next question
    document.getElementById('submit-answer-btn').disabled = true;
    document.getElementById('answer-input').disabled = true;
}

// Function to show the next question
function showNextQuestion() {
    currentQuestionIndex++;
    
    // Enable submit button and answer input
    document.getElementById('submit-answer-btn').disabled = false;
    document.getElementById('answer-input').disabled = false;
    
    // Show the next question
    showQuestion();
}

// Function to end the quiz and show results
function endQuiz() {
    // Calculate percentage
    const percentage = Math.round((quizScore / totalQuizQuestions) * 100);
    
    // Update results display
    document.getElementById('final-score').textContent = quizScore;
    document.getElementById('final-total').textContent = totalQuizQuestions;
    document.getElementById('score-percentage').textContent = percentage;
    
    // Set feedback message based on score
    const resultsFeedback = document.getElementById('results-feedback');
    if (percentage >= 90) {
        resultsFeedback.textContent = 'Excellent! You\'re a multiplication master!';
        resultsFeedback.style.color = '#43aa8b';
    } else if (percentage >= 70) {
        resultsFeedback.textContent = 'Great job! You\'re getting really good at this!';
        resultsFeedback.style.color = '#4cc9f0';
    } else if (percentage >= 50) {
        resultsFeedback.textContent = 'Good effort! Keep practicing to improve!';
        resultsFeedback.style.color = '#f9c74f';
    } else {
        resultsFeedback.textContent = 'Keep practicing! You\'ll get better with time!';
        resultsFeedback.style.color = '#f94144';
    }
    
    // Show results screen
    document.querySelector('.quiz-question-container').style.display = 'none';
    document.querySelector('.quiz-results').style.display = 'block';
}
