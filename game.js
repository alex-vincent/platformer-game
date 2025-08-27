// Game variables
let player;
let platforms;
let cursors;
let stars;
let bombs;
let score = 0;
let scoreText;
let levelText;
let gameOver = false;
let level = 1;
let starsCollected = 0;
let restartKey;
let gameScene;

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#87CEEB',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Initialize the game
const game = new Phaser.Game(config);

function preload() {
    // Create placeholder graphics using Phaser's built-in tools
    
    // Ground/Platform - 400x32 brown rectangle
    this.add.graphics({ x: 0, y: 0 })
        .fillStyle(0x8B4513)
        .fillRect(0, 0, 400, 32)
        .generateTexture('ground', 400, 32)
        .destroy();
    
    // Player - 32x48 red rectangle
    this.add.graphics({ x: 0, y: 0 })
        .fillStyle(0xFF0000)
        .fillRect(0, 0, 32, 48)
        .generateTexture('player', 32, 48)
        .destroy();
    
    // Star - 24x22 yellow square (simplified star)
    this.add.graphics({ x: 0, y: 0 })
        .fillStyle(0xFFFF00)
        .fillRect(0, 0, 24, 22)
        .generateTexture('star', 24, 22)
        .destroy();
    
    // Bomb - 16x16 black circle
    this.add.graphics({ x: 0, y: 0 })
        .fillStyle(0x000000)
        .fillCircle(8, 8, 8)
        .generateTexture('bomb', 16, 16)
        .destroy();
}

function create() {
    // Store scene reference
    gameScene = this;
    
    // Create platforms
    platforms = this.physics.add.staticGroup();
    
    // Create level-specific platforms
    createLevelPlatforms();
    
    // Create player
    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    // Player collides with platforms
    this.physics.add.collider(player, platforms);
    
    // Create cursor keys
    cursors = this.input.keyboard.createCursorKeys();
    
    // Create restart key (R key)
    restartKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    
    // Create stars
    createStars.call(this);
    
    // Create score text
    scoreText = this.add.text(16, 16, 'Score: 0', { 
        fontSize: '32px', 
        fill: '#000' 
    });
    
    // Create level text
    levelText = this.add.text(16, 60, 'Level: 1', { 
        fontSize: '32px', 
        fill: '#000' 
    });
    
    // Create bombs group
    bombs = this.physics.add.group();
    
    // Bombs collide with platforms
    this.physics.add.collider(bombs, platforms);
    
    // Player collides with bombs (game over)
    this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
    // Check for restart key
    if (gameOver && Phaser.Input.Keyboard.JustDown(restartKey)) {
        restartGame.call(this);
        return;
    }
    
    if (gameOver) {
        return;
    }
    
    // Player movement controls
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
    } else {
        player.setVelocityX(0);
    }
    
    // Player jumping (only when touching ground)
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-530);
    }
}

function collectStar(player, star) {
    star.disableBody(true, true);
    starsCollected++;
    
    // Update score
    score += 10 * level; // More points for higher levels
    scoreText.setText('Score: ' + score);
    
    // Check if all stars collected
    if (stars.countActive(true) === 0) {
        // All stars collected - advance to next level
        level++;
        console.log('Advancing to level:', level);
        levelText.setText('Level: ' + level);
        
        // Show level complete message
        const levelCompleteText = gameScene.add.text(400, 250, 'Level ' + (level - 1) + ' Complete!', { 
            fontSize: '48px', 
            fill: '#000' 
        });
        levelCompleteText.setOrigin(0.5);
        
        // Wait 2 seconds then start next level
        gameScene.time.delayedCall(2000, () => {
            levelCompleteText.destroy();
            startNextLevel.call(gameScene);
        });
    }
}

function hitBomb(player, bomb) {
    gameScene.physics.pause();
    
    player.setTint(0xff0000);
    
    gameOver = true;
    
    // Display game over message
    const gameOverText = gameScene.add.text(400, 250, 'Game Over', { 
        fontSize: '64px', 
        fill: '#000' 
    });
    gameOverText.setOrigin(0.5);
    
    // Display restart instruction
    const restartText = gameScene.add.text(400, 350, 'Press R to Restart', { 
        fontSize: '32px', 
        fill: '#000' 
    });
    restartText.setOrigin(0.5);
}

// Helper functions for level management
function createLevelPlatforms() {
    // Clear existing platforms
    platforms.clear(true, true);
    
    // Main ground platform across the bottom
    platforms.create(400, 568, 'ground').setScale(2, 1).refreshBody();
    
    // Create level-specific platform layouts
    switch(level) {
        case 1:
            // Easy level - 3 well-spaced platforms
            platforms.create(600, 400, 'ground');
            platforms.create(50, 250, 'ground');
            platforms.create(750, 220, 'ground');
            break;
        case 2:
            // Medium level - 4 platforms, some closer together
            platforms.create(150, 450, 'ground');
            platforms.create(500, 350, 'ground');
            platforms.create(300, 200, 'ground');
            platforms.create(700, 150, 'ground');
            break;
        case 3:
            // Hard level - 5 platforms in trickier positions
            platforms.create(100, 500, 'ground');
            platforms.create(400, 450, 'ground');
            platforms.create(650, 300, 'ground');
            platforms.create(200, 200, 'ground');
            platforms.create(600, 100, 'ground');
            break;
        default:
            // For levels 4+ - increasingly difficult patterns
            const numPlatforms = Math.min(3 + level, 8);
            for (let i = 0; i < numPlatforms; i++) {
                const x = Phaser.Math.Between(50, 750);
                const y = Phaser.Math.Between(100, 500);
                platforms.create(x, y, 'ground');
            }
            break;
    }
}

function createStars() {
    // Clear existing stars first
    if (stars) {
        stars.clear(true, true);
    }
    
    // Create stars group
    const numStars = Math.min(8 + level * 2, 15); // More stars in higher levels
    stars = this.physics.add.group({
        key: 'star',
        repeat: numStars,
        setXY: { x: 12, y: 0, stepX: Math.min(70, 780 / numStars) } // Adjust spacing based on number of stars
    });
    
    stars.children.entries.forEach(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    
    // Stars collide with platforms
    this.physics.add.collider(stars, platforms);
    
    // Player collects stars
    this.physics.add.overlap(player, stars, collectStar, null, this);
}

function startNextLevel() {
    console.log('Starting level:', level);
    
    // Reset player position
    player.setPosition(100, 450);
    player.setTint(0xffffff);
    player.setVelocity(0, 0);
    
    // Create new level platforms
    createLevelPlatforms();
    
    // Create new stars
    createStars.call(gameScene);
    
    // Add bombs based on level (more bombs = harder)
    const numBombs = Math.min(level - 1, 5);
    for (let i = 0; i < numBombs; i++) {
        const x = Phaser.Math.Between(100, 700);
        const bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        
        // Faster bombs in higher levels
        const speed = 100 + (level * 30);
        bomb.setVelocity(Phaser.Math.Between(-speed, speed), 20);
        bomb.allowGravity = false;
    }
}

function restartGame() {
    // Reset all game variables
    score = 0;
    level = 1;
    starsCollected = 0;
    gameOver = false;
    
    // Update displays
    scoreText.setText('Score: 0');
    levelText.setText('Level: 1');
    
    // Clear all game objects
    bombs.clear(true, true);
    
    // Reset player
    player.setPosition(100, 450);
    player.setTint(0xffffff);
    player.setVelocity(0, 0);
    
    // Restart physics
    gameScene.physics.resume();
    
    // Recreate level 1
    createLevelPlatforms();
    createStars.call(gameScene);
    
    // Clear any text overlays (create a copy of the list to avoid iteration issues)
    const childrenToDestroy = gameScene.children.list.filter(child => 
        child.type === 'Text' && child !== scoreText && child !== levelText
    );
    childrenToDestroy.forEach(child => child.destroy());
}
