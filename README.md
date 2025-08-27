# 2D Platformer Game

A fun 2D platformer game built with HTML5, CSS3, and Phaser 3.

## 🎮 Features

- **Multi-level gameplay** with progressive difficulty
- **Collectible stars** with increasing point values
- **Enemy bombs** that get faster and more numerous each level
- **Restart functionality** with R key
- **Responsive design** that works in any modern browser

## 🚀 Play the Game

[Play Online](https://vincentserver.com) *(Coming Soon)*

## 🛠️ Local Development

1. Clone this repository
2. Start a local server: `python3 -m http.server 8000`
3. Open `http://localhost:8000` in your browser

## 🎯 Controls

- **Arrow Keys**: Move left/right and jump
- **R Key**: Restart game when game over

## 📁 Project Structure

```
cursor-tutorial/
├── index.html      # Main HTML file
├── style.css       # Game styling
├── game.js         # Phaser 3 game logic
└── README.md       # This file
```

## 🏗️ Built With

- **HTML5** - Structure
- **CSS3** - Styling  
- **JavaScript** - Game logic
- **Phaser 3** - Game engine (loaded from CDN)

## 🎨 Game Mechanics

- **Level 1**: 9 stars, easy platform layout
- **Level 2**: 11 stars, 1 bomb, medium difficulty
- **Level 3+**: More stars and bombs, increasingly challenging layouts

Points increase with each level (10 × level number per star)!
