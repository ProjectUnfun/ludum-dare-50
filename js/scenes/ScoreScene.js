class ScoreScene extends Phaser.Scene {
    constructor() {
        super("Score");
    }

    init() {
        // Create a reference to the game scene
        this.gameScene = this.scene.get("Game");
    }

    create() {
        // Setup methods
        this.setupUiElements();
        this.setupEvents();
    }

    // Method creates the counter text and icon
    setupUiElements() {
        // Create kills text
        this.killsText = this.add.text(500, 5, "Kills: 0", {
            fontSize: "36px",
            fill: "#fff",
            fontFamily: "MacedoniaOld",
        });

        // Create mobs text
        this.timeText = this.add.text(220, 5, "Time: 0", {
            fontSize: "36px",
            fill: "#fff",
            fontFamily: "MacedoniaOld",
        });

        // Create kills icon
        this.killsIcon = this.add.image(475, 22, "axeIcon");
        this.killsIcon.setScale(1.2);

        // Create mobs icon
        this.timeIcon = this.add.image(205, 23, "hourglass");
    }

    // Method creates the event listener for counter updates
    setupEvents() {
        this.gameScene.events.on("updateKills", (kills) => {
            this.killsText.setText(`Kills: ${kills}`);
        });
        this.gameScene.events.on("updateTime", (time) => {
            this.timeText.setText(`Time: ${time}`);
        });
    }

    update() { }
}