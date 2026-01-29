# Slot Machine Game 🎰

A fun HTML/JavaScript/CSS slot machine game that's mathematically balanced for fair play!

## How to Play

1. Open `index.html` in your web browser
2. Click the "SPIN" button (costs 1 coin per spin)
3. Match 3 symbols to win!
4. Watch your balance and statistics

## Game Features

- **Starting Balance**: 100 coins
- **Cost Per Spin**: 1 coin
- **Win Condition**: Match 3 identical symbols
- **Mathematically Balanced**: Expected value of ~0 gain/loss over time

## Payout Table

| Symbols | Payout | Probability |
|---------|--------|-------------|
| 🪙🪙🪙 | 100 coins | 0.001% (Jackpot!) |
| 🍒🍒🍒 | 10 coins | 0.0125% |
| 🍋🍋🍋 | 5 coins | 0.1% |
| 🍇🍇🍇 | 3 coins | 32.85% |
| 🍊🍊🍊 | 2.41 coins | 0.3375% |

## Technical Details

The game uses weighted random selection to generate symbols, with payouts carefully balanced so that over time (statistically over 100 spins), the sum of invested coins and won coins averages to 0.

**Expected Value**: 1.0000107500 coins per spin (essentially break-even)

## Files

- `index.html` - Main game page
- `styles.css` - Styling and animations
- `script.js` - Game logic

## Running the Game

Simply open `index.html` in any modern web browser. No build process or dependencies required!