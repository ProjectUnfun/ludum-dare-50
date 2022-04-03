// Enum for tracking 4 direction movement and attacking
const Direction = {
    DOWN: 1,
    UP: 2,
    LEFT: 3,
    RIGHT: 4
};

// Enum for tracking monster class
const RomanTypes = {
    BASIC: 1,
    COMMANDER: 2,
}

// Track movement velocity of player in game (original speed = 180)
const playerMoveSpeed = 200;

// Track movement velocity of monsters in game
const romanMoveSpeed = 170;

// Track the ID of monsters
let romanID = 0;

// Locations for spawning monsters
const spawnLocations = [
    [239, 784],
    [239, 632],
    [239, 436],
    [239, 271],
    [399, 347],
    [399, 473],
    [399, 619],
    [538, 514],
    [538, 642],
    [615, 577],
    [697, 514],
    [697, 642],
    [792, 578]
]


class GameScene extends Phaser.Scene {
    constructor() {
        super("Game");
    }

    create() {
        // Track number of enemies
        this.numberOfRomans = 10;
        this.moreRomans = 5;

        // Create the input keys
        this.createInputCursors();

        // Create the in game map
        this.createMap();

        // Config the enemies
        this.configRomans();

        // Create the player
        this.createPlayer();

        // Spawn the first wave of enemies
        this.spawnRomans(this.numberOfRomans);

        // Add collisions with the map
        this.addCollisions();

        // Create audio
        this.createAudio();
    }

    update() {
        // Check player death
        if (this.player.health < 1) {
            this.scene.start("End", { killCount: this.player.killCount, timeAlive: this.player.timeAlive });
        }

        // Call the player object update method
        this.player.update(this.cursors);

        // If Romans numbers are depleted, spawn more
        if (this.numberOfRomans < 6) {
            this.moreRomans += 5;
            this.spawnRomans(this.moreRomans);
            this.numberOfRomans += this.moreRomans;
        }
    }

    // Method creates the game input using Phaser method
    createInputCursors() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    // Method creates the game map using the GameMap class defined in ../classes/GameMap.js
    createMap() {
        this.map = new GameMap(
            this,
            "map",
            "terrain_atlas",
            "Ground",
            "Blocked",
            "Deco1",
            "Deco2"
        );
    }

    // Method creates the user player using the Player class defined in ../classes/GamePlayer.js
    createPlayer() {
        this.player = new GamePlayer(this, 1348, 759, "playerWalk");
    }

    // Method creates a physics collection for monster containment
    configRomans() {
        this.romans = this.physics.add.group();

        // Run the update method of all children objects of the group
        // everytime the update method of this scene is called
        this.romans.runChildUpdate = true;
    }

    // Method spawns the given number of Romans
    spawnRomans(numberToSpawn) {
        // Field to spawn & reactivate Romans
        let roman;

        // Field tracks Roman type
        let typeSelection;

        // Array for random Roman spawn location
        let spawnLocation = [];

        // Loop until all Romans are created/reactivated
        for (let i = 0; i < numberToSpawn; i++) {
            //Get the first inactive Roman in the group
            roman = this.romans.getFirstDead();

            // Get a random spawn location
            spawnLocation = spawnLocations[Math.floor(Math.random() * 13)];

            // Create a new Roman if there are no inactive Romans
            if (!roman) {
                // Get a random Roman type class selection
                typeSelection = Math.floor(Math.random() * 10) + 1;

                // Set type selection probability
                if (typeSelection > 0 && typeSelection < 10) typeSelection = 1;
                else typeSelection = 2;

                if (typeSelection === RomanTypes.BASIC) {
                    roman = new Roman(this, spawnLocation[0], spawnLocation[1], "basicWalk", `Roman-${romanID}`, typeSelection);
                }

                else if (typeSelection === RomanTypes.COMMANDER) {
                    roman = new Roman(this, spawnLocation[0], spawnLocation[1], "commanderWalk", `Roman-${romanID}`, typeSelection);
                }

                // Add the new Roman to the group
                this.romans.add(roman);

                // Add world bounds collision to Roman
                roman.setCollideWorldBounds(true);

                // Increment the Roman ID number
                romanID++;
            } else {
                // Re-config inactive Roman and reactivate it
                roman.makeActive(spawnLocation);
            }
        }
    }

    // Method creates collisions between map vs creatures & creatures vs creatures
    addCollisions() {
        // Player vs map blocked layer & edges
        this.physics.add.collider(this.player, this.map.blockedLayer);
        this.player.setCollideWorldBounds(true);

        // Romans vs map blocked layer
        this.physics.add.collider(this.romans, this.map.blockedLayer);

        // Romans attacking player overlap event
        this.physics.add.overlap(this.player, this.romans, (player, roman) => {
            roman.markAsAttacking();
        });
    }

    // Method creates the audio clips
    createAudio() {
        // Basic Roman audio
        this.basicDeathAudio = this.sound.add("basicDeath", {
            loop: false,
            volume: 1.1,
        });
        this.basicGruntAudio = this.sound.add("basicGrunt", {
            loop: false,
            volume: 3.3,
        });
        this.basicAttackAudio = this.sound.add("basicAttack", {
            loop: false,
            volume: 1.1,
        });

        // Commander Roman audio
        this.commanderDeathAudio = this.sound.add("commanderDeath", {
            loop: false,
            volume: 1.1,
        });
        this.commanderGruntAudio = this.sound.add("commanderGrunt", {
            loop: false,
            volume: 3.3,
        });
        this.commanderAttackAudio = this.sound.add("commanderAttack", {
            loop: false,
            volume: 2.7,
        });

        // Player audio
        this.playerDeathAudio = this.sound.add("playerDeath", {
            loop: false,
            volume: 1.1,
        });
        this.playerGruntAudio = this.sound.add("playerGrunt", {
            loop: false,
            volume: 1.3,
        });
        this.playerAttackAudio = this.sound.add("playerAttack", {
            loop: false,
            volume: 1.1,
        });

        // Attacks hitting target audio
        this.playerHitAudio = this.sound.add("playerHit", {
            loop: false,
            volume: 1.3,
        });
        this.enemyHitAudio = this.sound.add("enemyHit", {
            loop: false,
            volume: 1.8,
        });
    }
}