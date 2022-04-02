class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        // Load the assets for the tiled map
        this.loadTiledMapAssets();
    }

    // Load the assets for the tiled map
    loadTiledMapAssets() {
        this.load.image("terrain_atlas", "assets/level/terrain_atlas.png");
        this.load.tilemapTiledJSON("map", "assets/level/MapLD50.json");
    }

    // Start the next scene
    create() {
        this.scene.start("Game");
    }
}