class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    preload() {
        // Load the assets for the tiled map
        this.loadTiledMapAssets();

        // Load the spritesheets
        this.loadSpriteSheets();

        // Load the images
        this.loadImages();
    }

    // Load the assets for the tiled map
    loadTiledMapAssets() {
        this.load.image("terrain_atlas", "assets/level/terrain_atlas.png");
        this.load.tilemapTiledJSON("map", "assets/level/MapLD50.json");
    }

    // Load the spritesheets
    loadSpriteSheets() {
        // Player sprites
        this.load.spritesheet("playerWalk", "assets/images/player/playerWalk.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("playerAttack", "assets/images/player/playerAttack.png", {
            frameWidth: 192,
            frameHeight: 192,
        });
    }

    // Load the images
    loadImages() {
        // Fighter class hitbox (never seen, just used for physics body)
        this.load.image("playerHitbox", "assets/images/player/hitboxImage.png");
    }

    // Start the next scene
    create() {
        this.scene.start("Game");
    }
}