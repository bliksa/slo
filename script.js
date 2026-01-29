// Game state
let balance = 100;
let totalSpins = 0;
let totalInvested = 0;
let totalWon = 0;

// Symbols and their probabilities
// Weights are balanced so expected value = 1 coin (break-even over time)
const symbols = [
    { emoji: '🪙', weight: 1, payout: 100 },    // Coin - Jackpot (1% chance)
    { emoji: '🍒', weight: 5, payout: 10 },     // Cherry (5% chance)
    { emoji: '🍋', weight: 10, payout: 5 },     // Lemon (10% chance)
    { emoji: '🍊', weight: 15, payout: 2.41 },  // Orange (15% chance)
    { emoji: '🍇', weight: 69, payout: 3 }      // Grape (69% chance)
];

// Calculate total weight for weighted random selection
const totalWeight = symbols.reduce((sum, symbol) => sum + symbol.weight, 0);

// DOM elements
const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const spinButton = document.getElementById('spinButton');
const messageDiv = document.getElementById('message');
const balanceSpan = document.getElementById('balance');
const spinsSpan = document.getElementById('spins');
const investedSpan = document.getElementById('invested');
const wonSpan = document.getElementById('won');
const netSpan = document.getElementById('net');

// Get random symbol based on weights
function getRandomSymbol() {
    let random = Math.random() * totalWeight;
    let cumulativeWeight = 0;
    
    for (const symbol of symbols) {
        cumulativeWeight += symbol.weight;
        if (random < cumulativeWeight) {
            return symbol;
        }
    }
    
    return symbols[symbols.length - 1]; // Fallback
}

// Update display
function updateDisplay() {
    balanceSpan.textContent = balance.toFixed(2);
    spinsSpan.textContent = totalSpins;
    investedSpan.textContent = totalInvested;
    wonSpan.textContent = totalWon.toFixed(2);
    
    const net = totalWon - totalInvested;
    netSpan.textContent = net.toFixed(2);
    netSpan.style.color = net > 0 ? '#28a745' : net < 0 ? '#dc3545' : '#667eea';
}

// Spin animation
function animateSlots(duration) {
    const slots = [slot1, slot2, slot3];
    
    slots.forEach(slot => slot.classList.add('spinning'));
    
    const interval = setInterval(() => {
        slots.forEach(slot => {
            const randomSymbol = getRandomSymbol();
            slot.textContent = randomSymbol.emoji;
        });
    }, 100);
    
    return new Promise(resolve => {
        setTimeout(() => {
            clearInterval(interval);
            slots.forEach(slot => slot.classList.remove('spinning'));
            resolve();
        }, duration);
    });
}

// Main spin function
async function spin() {
    if (balance < 1) {
        messageDiv.textContent = '❌ Not enough coins! Game Over!';
        messageDiv.className = 'message lose';
        return;
    }
    
    // Disable button during spin
    spinButton.disabled = true;
    messageDiv.textContent = '🎰 Spinning...';
    messageDiv.className = 'message';
    
    // Deduct coin
    balance -= 1;
    totalSpins += 1;
    totalInvested += 1;
    updateDisplay();
    
    // Animate slots for 2 seconds
    await animateSlots(2000);
    
    // Generate final results
    const result1 = getRandomSymbol();
    const result2 = getRandomSymbol();
    const result3 = getRandomSymbol();
    
    slot1.textContent = result1.emoji;
    slot2.textContent = result2.emoji;
    slot3.textContent = result3.emoji;
    
    // Check for win
    if (result1.emoji === result2.emoji && result2.emoji === result3.emoji) {
        const winAmount = result1.payout;
        balance += winAmount;
        totalWon += winAmount;
        
        messageDiv.textContent = `🎉 YOU WIN ${winAmount.toFixed(2)} COINS! 🎉`;
        messageDiv.className = 'message win';
        
        // Special message for jackpot
        if (result1.emoji === '🪙') {
            messageDiv.textContent = `💰 JACKPOT! ${winAmount.toFixed(2)} COINS! 💰`;
        }
    } else {
        messageDiv.textContent = '😔 No match. Try again!';
        messageDiv.className = 'message lose';
    }
    
    updateDisplay();
    
    // Re-enable button
    spinButton.disabled = false;
}

// Event listener
spinButton.addEventListener('click', spin);

// Initialize display
updateDisplay();
