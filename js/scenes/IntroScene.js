class IntroScene extends Phaser.Scene {
    constructor() {
        super("Intro");
    }

    create() {
        // Display the burning image
        this.burningImage = this.add.image(0, 0, "burningVillage");
        this.burningImage.setOrigin(0);
        this.burningImage.setDisplaySize(800, 600);

        // Display instruction text
        this.message = this.add.text(395, 570, "Press Enter to Skip", {
            color: "#FFDD00",
            fontSize: 24,
            fontFamily: "Arial",
        }).setOrigin(0.5);
        this.message.setDepth(10);

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
            this.titleMusicAudio.stop();
            this.scene.stop("Intro");
            this.scene.start("Game");
        });

        // First batch of intro messages
        this.textEvent1 = this.time.addEvent({
            delay: 1000,
            callback: this.text1,
            callbackScope: this,
            loop: false,
        });
        this.textEvent2 = this.time.addEvent({
            delay: 4000,
            callback: this.text2,
            callbackScope: this,
            loop: false,
        });
        this.textEvent3 = this.time.addEvent({
            delay: 7000,
            callback: this.text3,
            callbackScope: this,
            loop: false,
        });

        // Change to graveyard image
        this.switchEvent1 = this.time.addEvent({
            delay: 10000,
            callback: this.switch1,
            callbackScope: this,
            loop: false,
        });

        // Second batch of intro messages
        this.textEvent4 = this.time.addEvent({
            delay: 11000,
            callback: this.text4,
            callbackScope: this,
            loop: false,
        });
        this.textEvent5 = this.time.addEvent({
            delay: 14000,
            callback: this.text5,
            callbackScope: this,
            loop: false,
        });

        // Change to mountains image
        this.switchEvent1 = this.time.addEvent({
            delay: 17000,
            callback: this.switch2,
            callbackScope: this,
            loop: false,
        });

        // Third batch of intro messages
        this.textEvent6 = this.time.addEvent({
            delay: 18000,
            callback: this.text6,
            callbackScope: this,
            loop: false,
        });
        this.textEvent7 = this.time.addEvent({
            delay: 21000,
            callback: this.text7,
            callbackScope: this,
            loop: false,
        });

        this.time.delayedCall(
            24000,
            () => {
                // Start Game scene
                this.titleMusicAudio.stop();
                this.scene.stop("Intro");
                this.scene.start("Game");
            },
            [],
            this
        );
    }

    text1() {
        this.firstText = this.add.text(395, 200, "  The first time they\ncame across the river...", {
            color: "#DFDFDF",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);
    }

    text2() {
        this.firstText.setVisible(false);
        this.firstText.destroy();
        this.secondText = this.add.text(395, 200, "You were away hunting\nmeat for your family...", {
            color: "#DFDFDF",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);
    }

    text3() {
        this.secondText.setVisible(false);
        this.secondText.destroy();
        this.thirdText = this.add.text(395, 200, "   ...The Romans left behind the\ncorpses and ashes of your world", {
            color: "#DFDFDF",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);
    }

    switch1() {
        this.burningImage.setVisible(false);
        this.burningImage.destroy();
        this.graveyardImage = this.add.image(0, 0, "graveyard");
        this.graveyardImage.setOrigin(0);
        this.graveyardImage.setDisplaySize(800, 600);
    }

    text4() {
        this.fourthText = this.add.text(395, 400, "You buried what was\nleft of your family...", {
            color: "#DFDFDF",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);
    }

    text5() {
        this.fourthText.setVisible(false);
        this.fourthText.destroy();
        this.fifthText = this.add.text(395, 400, "And swore and sacred oath\n    to avenge your loss\n       in Roman blood...", {
            color: "#DFDFDF",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);
    }

    switch2() {
        this.graveyardImage.setVisible(false);
        this.graveyardImage.destroy();
        this.mountainImage = this.add.image(0, 0, "mountains");
        this.mountainImage.setOrigin(0);
        this.mountainImage.setDisplaySize(800, 600);
    }

    text6() {
        this.sixthText = this.add.text(395, 300, "You will soon join your\nfamily in the afterlife...", {
            color: "#DFDFDF",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);
    }

    text7() {
        this.sixthText.setVisible(false);
        this.sixthText.destroy();
        this.seventhText = this.add.text(395, 300, "But you'll send as many Romans\n      to hell as you can first", {
            color: "#DFDFDF",
            fontSize: 64,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);
    }
}