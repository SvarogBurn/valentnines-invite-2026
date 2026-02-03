// State management
const state = {
    selections: {
        game: null,
        wishes: ''
    },
    noInteraction: {
        hovers: 0,
        clicks: 0,
        lastMoveTime: 0
    },
    phrases: [
        "No",
        "Pikachu used dodge!",
        "Clicking 'No' is illegal today",
        "Nice try!",
        "Really?",
        "Are you sure?",
        "Wait, wrong button",
        "Try again"
    ]
};

// Screen navigation
function showScreen(screenId) {
    document.querySelectorAll('[id^="screen"]').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

function transitionToPlanner() {
    showScreen('screen2');
}

function transitionToFinalScreen() {
    showScreen('screen3');
    document.getElementById('bottomImages').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Selection management
function selectOption(element, type, value) {
    if (element.classList.contains('selected')) {
        element.classList.remove('selected');
        state.selections[type] = null;
        return;
    }
    
    const siblings = element.parentElement.querySelectorAll('.option-card');
    siblings.forEach(s => s.classList.remove('selected'));
    
    element.classList.add('selected');
    state.selections[type] = value;
}

// Finalize and transition
function sealTheDeal() {
    const sealBtn = document.getElementById('sealBtn');
    sealBtn.classList.add('tearing');
    
    setTimeout(() => {
        finalizeLetter();
    }, 600);
}

function finalizeLetter() {
    const dateInput = document.getElementById('dateInput').value;
    const timeInput = document.getElementById('timeInput').value;
    const wishesInput = document.getElementById('wishesInput').value;
    
    if (!dateInput) {
        alert("Please pick a date first! I gotta know when to prepare!");
        document.getElementById('sealBtn').classList.remove('tearing');
        return;
    }

    const letterDate = formatDateForLetter(new Date(dateInput));
    const emailDate = timeInput ? `${letterDate} at ${timeInput}` : letterDate;
    const activity = state.selections.game || "our special mystery date";
    
    // Update letter display
    document.getElementById('finalDate').innerText = letterDate;
    document.getElementById('finalActivity').innerText = activity;

    // Send notification and show final screen
    sendEmailNotification(emailDate, activity, wishesInput);
    transitionToFinalScreen();
    triggerConfetti();
}

function formatDateForLetter(date) {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}
