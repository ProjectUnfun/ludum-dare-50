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

        // Load the audio
        this.loadAudio();
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

        // Basic Roman soldier sprites
        this.load.spritesheet("basicWalk", "assets/images/roman/basicWalk.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("basicAttack", "assets/images/roman/basicAttack.png", {
            frameWidth: 64,
            frameHeight: 64,
        });

        // Roman commander sprites
        this.load.spritesheet("commanderWalk", "assets/images/roman/commanderWalk.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet("commanderAttack", "assets/images/roman/commanderAttack.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
    }

    // Load the images
    loadImages() {
        // Fighter class hitbox (never seen, just used for physics body)
        this.load.image("playerHitbox", "assets/images/player/hitboxImage.png");

        // Title screen background image
        this.load.image("titleBG", "assets/images/backgrounds/TitleBG.png");

        // Tutorial scene background image
        this.load.image("tutorialBG", "assets/images/backgrounds/TutorialBG.png");

        // Game over scene background image
        this.load.image("endBG", "assets/images/backgrounds/EndBG.png");

        // HUD images
        this.load.image("axeIcon", "assets/images/hud/axeIcon.png");
        this.load.image("hourglass", "assets/images/hud/Hourglass.png");
    }

    // Method loads in the game audio
    loadAudio() {
        // Basic Roman sounds
        this.load.audio("basicGrunt", ["assets/audio/basicGrunt.wav"]);
        this.load.audio("basicDeath", ["assets/audio/basicDeath.wav"]);
        this.load.audio("basicAttack", ["assets/audio/basicAttack.wav"]);

        // Commander Roman sounds
        this.load.audio("commanderGrunt", ["assets/audio/commanderGrunt.mp3"]);
        this.load.audio("commanderDeath", ["assets/audio/commmanderDeath.mp3"]);
        this.load.audio("commanderAttack", ["assets/audio/commanderAttack.wav"]);

        // Player sounds
        this.load.audio("playerGrunt", ["assets/audio/playerGrunt.wav"]);
        this.load.audio("playerDeath", ["assets/audio/playerDeath.wav"]);
        this.load.audio("playerAttack", ["assets/audio/playerAttack.wav"]);

        // Attacks hitting target sounds
        this.load.audio("playerHit", ["assets/audio/playerHit.wav"]);
        this.load.audio("enemyHit", ["assets/audio/enemyHit.wav"]);
    }

    // Start the next scene
    create() {
        this.scene.start("Title");
    }
}