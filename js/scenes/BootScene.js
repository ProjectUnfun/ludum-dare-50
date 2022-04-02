class BootScene extends Phaser.Scene {
    constructor() {
        super("Boot");
    }

    preload() {

    }

    // Start the next scene
    create() {
        this.scene.start("Game");
    }
}