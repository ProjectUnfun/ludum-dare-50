class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    create() {
        // Create the in game map
        this.createMap();
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
}