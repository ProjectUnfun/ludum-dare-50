class TitleScene extends Phaser.Scene {
    constructor() {
        super("Title");
    }

    create() {
        // Display the background image
        this.backgroundImage = this.add.image(0, 0, "titleBG");
        this.backgroundImage.setOrigin(0);
        this.backgroundImage.setDisplaySize(800, 600);

        // Display Title Text
        this.gameName = this.add.text(395, 80, "Romans on the Rhine", {
            color: "#DFDFDF",
            fontSize: 108,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);

        // Display instruction text
        this.message = this.add.text(395, 270, "   Press Enter to Play\nPress Space for Tutorial", {
            color: "#DFDFDF",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);

        // Display credit text
        this.credits = this.add.text(687, 575, "Brought to you by:\n  Project Unfun ", {
            color: "#DFDFDF",
            fontSize: 20,
            fontStyle: "bold"
        }).setOrigin(0.5);

        // Track when the enter key is pressed
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // When the enter key is pressed, start game
        this.returnKey.on("down", event => {
            this.scene.start("Game");
        });

        // Track when space key is pressed
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // When space key is pressed start tutorial
        this.spaceKey.on("down", event => {
            this.scene.start("Tutorial");
        });
    }
}