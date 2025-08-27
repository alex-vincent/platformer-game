### **The Prompt to Copy and Paste into Cursor:**

Hello! I need your help to create a complete, working prototype for a simple 2D platformer game, similar to Super Mario Bros., that can run in a web browser. Please provide the full code for all the necessary files.

**Project Requirements:**

1.  **Technology:** Use only HTML, CSS, and JavaScript with the **Phaser 3 game engine**. Please load Phaser from a CDN, so I don't need to download it.
2.  **File Structure:** The project should consist of three files:
    *   `index.html`
    *   `style.css`
    *   `game.js`

**Detailed Instructions for Each File:**

**1. `index.html` File:**
*   Create a standard HTML5 boilerplate.
*   Set the page title to "My Platformer Game".
*   Link the `style.css` file.
*   In the body, include the Phaser 3 library script from `https://cdn.jsdelivr.net/npm/phaser@3.60.0/dist/phaser.min.js`.
*   After the Phaser script, include my `game.js` script.

**2. `style.css` File:**
*   Add basic CSS to make the page background a dark grey (`#222`).
*   Center the game canvas horizontally and vertically on the page.

**3. `game.js` File (The Game Logic):**
Please write the JavaScript code for a Phaser 3 game with the following features:

*   **Game Configuration:**
    *   Create a game with a resolution of 800x600 pixels.
    *   Use Arcade Physics.
    *   Set the background color to a light blue (`#87CEEB`).

*   **Assets:**
    *   We will not use real images. Please create placeholder graphics using Phaser's built-in tools.
    *   **Ground/Platforms:** A 400x32 pixel brown rectangle texture named `ground`.
    *   **Player:** A 32x48 pixel red rectangle texture named `player`.
    *   **Star:** A 24x22 pixel yellow star texture (if possible) or a simple yellow square named `star`.
    *   **Bomb:** A 16x16 pixel black circle texture named `bomb`.

*   **Game World:**
    *   Create a static group for the ground and platforms.
    *   Add a main ground platform across the bottom of the screen.
    *   Add three smaller platforms floating at different positions for the player to jump on.

*   **Player Character:**
    *   Add the player sprite to the world and enable physics on it.
    *   Give the player a slight bounce (`setBounce(0.2)`).
    *   Make the player collide with the platforms (`collideWorldBounds = true`).
    *   **Controls:**
        *   When the left arrow key is pressed, move the player left.
        *   When the right arrow key is pressed, move the player right.
        *   When the player is not pressing left or right, they should stop moving horizontally.
        *   When the up arrow key is pressed **and** the player is touching the ground, make the player jump.

*   **Collectibles (Stars):**
    *   Create a group of stars that fall from the top and bounce when they hit the platforms.
    *   Create 12 stars and scatter them across the level.
    *   When the player overlaps with a star, the star should disappear.

*   **Scoring:**
    *   Create a text object in the top-left corner to display the score, initialized to "Score: 0".
    *   Each time the player collects a star, add 10 points to the score and update the text.

*   **Enemies (Bombs):**
    *   Once all stars are collected, release a bomb from the opposite side of the screen from the player.
    *   The bomb should bounce around the screen, colliding with platforms.
    *   If the player collides with the bomb, the game is over: the player sprite turns red, physics is paused, and a "Game Over" message appears in the center of the screen.

*   **Win Condition:**
    *   When the player collects all 12 stars, display a "You Win!" message in the center of the screen.

Please provide the final, complete code for all three files, clearly marking where each file's code begins and ends.

---

### **What to Do After You Get the Code**

1.  **Create the Files:** In your project folder, create the three empty files: `index.html`, `style.css`, and `game.js`.
2.  **Copy and Paste:** Copy the code that Cursor generates for each file and paste it into the corresponding empty file you just created.
3.  **Open in Browser:** Find the `index.html` file in your folder and double-click it. It should open in your web browser, and you should see a playable game!

From this point, you can start asking Cursor follow-up questions like, "How can I change the player's jump height?" or "Explain how the collision detection works in this code." This prototype is the perfect foundation for learning and building upon.