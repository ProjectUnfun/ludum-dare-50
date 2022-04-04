class EndScene extends Phaser.Scene {
    constructor() {
        super("End");
    }

    init(data) {
        this.kills = data.killCount;
        this.timeAlive = data.timeAlive;

        // // TEST CODE
        // this.kills = 5;
        // this.timeAlive = 40;
    }

    create() {
        // Display the background image
        this.backgroundImage = this.add.image(0, 0, "endBG");
        this.backgroundImage.setOrigin(0);
        this.backgroundImage.setDisplaySize(800, 600);

        // Display credits label text
        this.creditsLabel = this.add.text(230, 20, "Credits for assets:", {
            color: "#AAAA00",
            fontSize: 24,
            fontStyle: "bold",
        }).setOrigin(0.5);

        // Display credits text
        this.creditsText = this.add.text(400, 100, "Stephen Challener (Redshrike), Johannes Sjölund (wulax),\nMatthew Krohn (makrohn), bluecarrot16, DCSS authors,\nMichael Whitlock (bigbeargames), David Conway Jr (JaidynReiman),\nJoe White, Nila122, Benjamin K. Smith (BenCreating),\nSander Frenken (castelonia), Pierre Vigier (pvigier),\nInboxninja, DarkwallLKE, Tuomo Untinen (reemax), XOR,\nCasper Nilsson, Daniel Eddeland, Johann CHARLOT,\nSkyler Robert Colladay, Lanea Zimmerman, Charles Sanchez,\nManuel Riecke, Daniel Armstrong, edermuniz, RodrixAP, Jubilee", {
            color: "#DFDFDF",
            fontSize: 16,
            fontStyle: "bold"
        }).setOrigin(0.5);

        // Display Game over Text
        this.gameOver = this.add.text(395, 340, "Game Over", {
            color: "#FF2200",
            fontSize: 164,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);

        // Display kills text
        this.killsText = this.add.text(200, 460, `Kills: ${this.kills}`, {
            color: "#FF2200",
            fontSize: 72,
            fontFamily: "Arial",
        }).setOrigin(0.5);

        // Display time text
        this.timeText = this.add.text(560, 460, `Time: ${this.timeAlive}`, {
            color: "#FF2200",
            fontSize: 72,
            fontFamily: "Arial",
        }).setOrigin(0.5);

        // Display instruction text
        this.message = this.add.text(395, 560, "Press Enter to Play Again", {
            color: "#FF2200",
            fontSize: 96,
            fontFamily: "MacedoniaOld",
        }).setOrigin(0.5);

        // Track when the enter key is pressed
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        // When the enter key is pressed, start game
        this.returnKey.on("down", event => {
            this.scene.start("Game");
        });
    }
}