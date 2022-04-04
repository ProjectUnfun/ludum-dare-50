class TutorialScene extends Phaser.Scene {
    constructor() {
        super("Tutorial");
    }

    create() {
        // Display the background image
        this.backgroundImage = this.add.image(0, 0, "tutorialBG");
        this.backgroundImage.setOrigin(0);
        this.backgroundImage.setDisplaySize(800, 600);

        // Display instruction text
        this.message = this.add.text(395, 300, "Arrow keys move your character\nSpace bar swings your axe\nKilling Romans restores your health", {
            color: "#DFDFDF",
            fontSize: 36,
            fontFamily: "Monospace",
        }).setOrigin(0.5);

        // Display instruction text
        this.returnMessage = this.add.text(395, 25, "Press Space to Return to the Title Screen", {
            color: "yellow",
            fontSize: 36,
            fontFamily: "Arial",
            fontStyle: "bold",
        }).setOrigin(0.5);

        // Track when the space key is pressed
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // When the space key is pressed and something has been input, set the name
        this.spaceKey.on("down", event => {
            this.scene.stop("Tutorial");
            this.scene.start("Title");
        });
    }
}