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
        this.message = this.add.text(395, 380, "Press Enter to Play", {
            color: "#DFDFDF",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);

        this.message = this.add.text(235, 560, "Arrow keys move your character\nSpace bar swings your axe\nKilling Romans restores your health", {
            color: "#DFDFDF",
            fontSize: 24,
            fontFamily: "Monospace",
        }).setOrigin(0.5);

        // Display instruction text effects
        this.enterEffect = this.add.text(374, 380, "Enter", {
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
    }
}