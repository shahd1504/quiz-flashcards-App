let flashcards = [
    {
        question: "What is the normal body temperature range?",
        answer: "36.1°C to 37.2°C (97°F to 99°F)",
        category: "Physiology"
    },
    {
        question: "What are bone-forming cells called?",
        answer: "Osteoblasts",
        category: "Histology"
    },
    // Add more flashcards here
];

let currentCardIndex = 0;
let currentCategory = "all";
let quizMode = false;

document.getElementById('category-select').addEventListener('change', (e) => {
    currentCategory = e.target.value;
    currentCardIndex = 0;
    displayCard(currentCardIndex);
});

document.getElementById('show-answer').addEventListener('click', () => {
    document.getElementById('flashcard').classList.toggle('flip');
});

document.getElementById('next-card').addEventListener('click', () => {
    currentCardIndex = (currentCardIndex + 1) % getFilteredFlashcards().length;
    displayCard(currentCardIndex);
    document.getElementById('flashcard').classList.remove('flip');
});

document.getElementById('add-card').addEventListener('click', () => {
    const question = prompt("Enter the question:");
    const answer = prompt("Enter the answer:");
    const category = prompt("Enter the category:");
    if (question && answer && category) {
        flashcards.push({ question, answer, category });
        alert('Flashcard added!');
    }
});

document.getElementById('remove-card').addEventListener('click', () => {
    if (flashcards.length > 0) {
        flashcards.splice(currentCardIndex, 1);
        currentCardIndex = 0;
        if (flashcards.length > 0) {
            displayCard(currentCardIndex);
        } else {
            document.querySelector('.question').textContent = '';
            document.querySelector('.answer').textContent = '';
        }
        alert('Flashcard removed!');
    } else {
        alert('No flashcards to remove!');
    }
});

document.getElementById('start-quiz').addEventListener('click', () => {
    quizMode = true;
    currentCardIndex = 0;
    displayCard(currentCardIndex);
    document.getElementById('flashcard').classList.remove('flip');
    alert('Quiz started! Answer the questions.');
});

function getFilteredFlashcards() {
    if (currentCategory === "all") {
        return flashcards;
    }
    return flashcards.filter(card => card.category === currentCategory);
}

function displayCard(index) {
    const filteredFlashcards = getFilteredFlashcards();
    if (filteredFlashcards.length > 0) {
        document.querySelector('.question').textContent = filteredFlashcards[index].question;
        document.querySelector('.answer').textContent = filteredFlashcards[index].answer;
        document.querySelector('.answer').style.display = 'flex';
    } else {
        document.querySelector('.question').textContent = 'No flashcards available in this category.';
        document.querySelector('.answer').textContent = '';
    }
}

// Initial display
displayCard(currentCardIndex);
