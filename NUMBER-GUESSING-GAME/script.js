let lower, upper, randomNumber, totalChances, count = 0, flag = false;

// Handle lower bound input
document.getElementById('lower').onkeypress = function(event) {
    if (event.key === 'Enter') {
        lower = parseInt(document.getElementById('lower').value);
        if (!isNaN(lower)) {
            document.getElementById('upperInput').style.display = 'block'; // Show upper bound input
            document.getElementById('upper').focus(); // Focus on upper bound input
        }
    }
};

// Handle upper bound input
document.getElementById('upper').onkeypress = function(event) {
    if (event.key === 'Enter') {
        upper = parseInt(document.getElementById('upper').value);
        if (!isNaN(upper) && upper > lower) {
            startGame();
        } else {
            alert("Please enter a valid upper bound greater than the lower bound.");
        }
    }
};

// Start the game
function startGame() {
    randomNumber = Math.floor(Math.random() * (upper - lower + 1)) + lower;
    totalChances = Math.ceil(Math.log2(upper - lower + 1));
    
    count = 0;
    flag = false;

    document.getElementById('chancesMessage').textContent = `You've only ${totalChances} chances to guess the integer!`;
    document.getElementById('gameSection').style.display = 'block';
    document.getElementById('guess').value = ''; // Reset guess input
    document.getElementById('message').textContent = '';
    document.getElementById('feedback').textContent = ''; // Clear feedback message

    // Show Reset Button
    document.getElementById('resetGame').style.display = 'block';
}

// Handle guess submission
document.getElementById('guess').onkeypress = function(event) {
    if (event.key === 'Enter') {
        submitGuess();
    }
};

document.getElementById('submitGuess').onclick = function() {
    submitGuess();
};

function submitGuess() {
    const guess = parseInt(document.getElementById('guess').value);
    
    if (isNaN(guess)) {
        alert("Please enter a valid number.");
        return;
    }

    count++;
    document.getElementById('guess').value = ''; // Reset guess input

    let feedbackMessage = '';

    if (randomNumber === guess) {
        document.getElementById('message').textContent = `Congratulations! You guessed the number ${guess} in ${count} tries!`;
        flag = true;
        showFlowers(); // Call function to show flowers
    } else {
        if (randomNumber > guess) {
            feedbackMessage = `Your guess of ${guess} is too low!`;
        } else {
            feedbackMessage = `Your guess of ${guess} is too high!`;
        }
        
        document.getElementById('feedback').textContent = feedbackMessage;

        if (count < totalChances) {
            document.getElementById('chancesMessage').textContent = `You've only ${totalChances - count} chances left.`;
        } else {
            document.getElementById('message').textContent += ` Out of chances! The number was ${randomNumber}. Better luck next time!`;
        }
    }
}

// Reset the game
document.getElementById('resetGame').onclick = function() {
    resetGame();
};

function resetGame() {
    // Reset values and UI elements
    lower = null;
    upper = null;
    randomNumber = null;
    totalChances = 0;
    count = 0;

    // Hide game sections and reset inputs
    document.getElementById('lower').value = '';
    document.getElementById('upper').value = '';
    document.getElementById('upperInput').style.display = 'none';
    document.getElementById('gameSection').style.display = 'none';
    document.getElementById('resetGame').style.display = 'none';

    document.getElementById('message').textContent = '';
    document.getElementById('chancesMessage').textContent = '';
    document.getElementById('feedback').textContent = '';
}

// Show flowers animation
function showFlowers() {
    const flowerContainer = document.getElementById('flowerContainer');
    flowerContainer.style.display = 'block';
    flowerContainer.innerHTML = "🌸🌼🌻"; // Placeholder for flower emojis or any visual representation

    // Optional: You can add a timeout to hide the flowers after some time
    setTimeout(() => {
        flowerContainer.style.display = 'none';
    }, 5000); // Hides after 5 seconds
}

