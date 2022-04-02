// Enum for tracking 4 direction movement and attacking
const Direction = {
    DOWN: 1,
    UP: 2,
    LEFT: 3,
    RIGHT: 4
};

// Track movement velocity of player in game
const playerMoveSpeed = 180;


class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    create() {
        // Create the input keys
        this.createInputCursors();

        // Create the in game map
        this.createMap();

        // Create the player
        this.createPlayer();

        // Add collisions with the map
        this.addCollisions();
    }

    update() {
        // Call the player object update method
        this.player.update(this.cursors);
    }

    // Method creates the game input using Phaser method
    createInputCursors() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Method creates the game map using the GameMap class defined in ../classes/GameMap.js
    createMap() {
        this.map = new GameMap(
            this,
            "map",
            "terrain_atlas",
            "Ground",
            "Blocked",
            "Deco1",
            "Deco2"
        );
    }

    // Method creates the user player using the Player class defined in ../classes/GamePlayer.js
    createPlayer() {
        this.player = new GamePlayer(this, 200, 200, "playerWalk");
    }

    // Method creates collisions between map vs creatures & creatures vs creatures
    addCollisions() {
        // Player vs map blocked layer
        this.physics.add.collider(this.player, this.map.blockedLayer);

        this.player.setCollideWorldBounds(true);
    }
}