class TitleScene extends Phaser.Scene {
    constructor() {
        super("Title");
    }

    create() {
        // Display the background image
        this.backgroundImage = this.add.image(0, 0, "titleBG");
        this.backgroundImage.setOrigin(0);
        this.backgroundImage.setDisplaySize(800, 600);

        // Display Title Top
        this.gameNameTop = this.add.text(395, 115, "The Wrong Side Of", {
            color: "#DFDFDF",
            fontSize: 108,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);

        // Title top text effect
        this.redWrong = this.add.text(227, 57, "Wrong", {
            color: "#FF0000",
            fontSize: 108,
            fontFamily: "MacedoniaOld",
        });

        // Title bottom text
        this.gameNameBottom = this.add.text(395, 220, "The Rhine", {
            color: "#AA0000",
            fontSize: 148,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);

        // Display instruction text
        this.message = this.add.text(395, 490, "   Press Enter to Play\nPress Space for Tutorial", {
            color: "#DFDFDF",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);

        // Display instruction text effects
        this.enterEffect = this.add.text(364, 455, "Enter", {
            color: "#FF0000",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);

        // Display instruction text effects
        this.spaceEffect = this.add.text(324, 525, "Space", {
            color: "#FF0000",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);

        // Display credit text
        this.credits = this.add.text(687, 575, "Brought to you by:\n  Project Unfun ", {
            color: "#DFDFDF",
            fontSize: 20,
            fontStyle: "bold"
        }).setOrigin(0.5);

        // Create and play title music
        this.titleMusicAudio = this.sound.add("titleSong", {
            loop: true,
            volume: 1.1,
        });
        this.titleMusicAudio.play();

        // Track when the enter key is pressed
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // When the enter key is pressed, start game
        this.returnKey.on("down", event => {
            this.scene.stop("Title");
            this.titleMusicAudio.stop();
            this.scene.start("Intro");
        });

        // Track when space key is pressed
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // When space key is pressed start tutorial
        this.spaceKey.on("down", event => {
            this.scene.stop("Title");
            this.titleMusicAudio.stop();
            this.scene.start("Tutorial");
        });
    }
}