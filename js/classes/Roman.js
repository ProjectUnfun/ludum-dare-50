class Roman extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, images, id, type) {
        super(scene, x, y, images);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.images = images;
        this.id = id;
        this.type = type;

        // Enable physics
        this.scene.physics.world.enable(this);

        // Config physics body
        this.body.setSize(32, 32);
        this.body.setOffset(16, 28);

        // Create walk animations
        this.createWalkAnimations();
        this.createAttackAnimations();

        // Set default animation status
        this.currentDirection = Direction.DOWN;
        this.setFrame(18);

        // Config movement & combat
        this.configMovement();
        this.configCombat();

        // Add object to scene
        this.scene.add.existing(this);
    }

    update() {
        this.checkMovement();
    }

    // Method configures movement
    configMovement() {
        // Set max and minimum movement selection processing values
        this.minStepCount = 16;
        this.maxStepCount = 32;

        // Get a random number of steps from 0 to 64
        this.stepCount = Math.floor(Math.random() * this.maxStepCount);

        // Ensure step count is at least 32
        if (this.stepCount < this.minStepCount) this.stepCount = this.minStepCount;

        // Tracks movement selection processing
        this.isProcessing = false;
    }

    // Method handles movement option selection
    checkMovement() {
        // When monster has processed the current selection to completion
        if (this.stepCount < 0) this.isProcessing = false;

        // Process further or make new selection
        if (this.isProcessing) {
            this.stepCount--;
        } else {
            // Get a random number for movement
            this.move(Math.floor(Math.random() * 21));

            // Prioritize moving left dominantly
            if (this.move > 0 && this.move < 9) this.move = 0;

            // Prioritize moving up and down secondarily
            else if (this.move > 8 && this.move < 13) this.move = 2;
            else if (this.move > 12 && this.move < 17) this.move = 3;

            // Prioritize being still and moving right least
            else if (this.move > 16 && this.move < 19) this.move = 4;
            else if (this.move > 18 && this.move < 21) this.move = 1;

            // Get a random number for step count
            this.stepCount = Math.floor(Math.random() * this.maxStepCount);

            // Ensure step count is at least the minimum
            if (this.stepCount < this.minStepCount) this.stepCount = this.minStepCount;
        }
    }

    // Method handles movement option execution
    move(movementOption) {
        // Reset monster velocity
        this.body.setVelocity(0);

        // Check which option is given; assign direction, velocity, animations, flag
        if (movementOption === 0) {
            this.body.setVelocityX(-romanMoveSpeed);
            this.currentDirection = Direction.LEFT;
            this.anims.play("walkLeft", true);
            this.isProcessing = true;
        } else if (movementOption === 1) {
            this.body.setVelocityX(romanMoveSpeed);
            this.currentDirection = Direction.RIGHT;
            this.anims.play("walkRight", true);
            this.isProcessing = true;
        } else if (movementOption === 2) {
            this.body.setVelocityY(-romanMoveSpeed);
            this.currentDirection = Direction.UP;
            this.anims.play("walkUp", true);
            this.isProcessing = true;
        } else if (movementOption === 3) {
            this.body.setVelocityY(romanMoveSpeed);
            this.currentDirection = Direction.DOWN;
            this.anims.play("walkDown", true);
            this.isProcessing = true;
        } else if (movementOption === 4) {
            this.body.setVelocity(0);
            this.anims.stop();
            this.isProcessing = true; // This is for the step count functionality
            if (this.currentDirection === Direction.DOWN) {
                this.anims.play("walkDown", true);
                this.anims.stop();
                this.setFrame(18);
            } else if (this.currentDirection === Direction.UP) {
                this.anims.play("walkUp", true);
                this.anims.stop();
                this.setFrame(0);
            } else if (this.currentDirection === Direction.LEFT) {
                this.anims.play("walkLeft", true);
                this.anims.stop();
                this.setFrame(9);
            } else if (this.currentDirection === Direction.RIGHT) {
                this.anims.play("walkRight", true);
                this.anims.stop();
                this.setFrame(27);
            }
        }
    }

    // Method configs combat
    configCombat() {
        // TODO: Check whether basic or commander and config accordingly
    }

    // Method handles updating health when damage is taken
    updateHealth(amount) {
        this.health -= amount;
        console.log(`Enemy: ${this.id} has been damaged`);
    }

    // Method prepares Roman for reactivation
    makeActive(locationArray) {
        // Set animation frame & direction to down
        this.anims.stop();
        this.anims.play("walkDown", true);
        this.setFrame(18);
        this.currentDirection = Direction.DOWN;
        this.health = this.maxHealth;

        // Sets spawn location with the random location array passed in
        this.setPosition(locationArray[0], locationArray[1]);

        // Set Roman to active & visible
        this.setActive(true);
        this.setVisible(true);

        // Activate Roman collisions
        this.body.checkCollision.none = false;
        this.body.onOverlap = true;
    }

    // Method makes monster inactive and invisible when killed
    makeInactive() {
        this.setActive(false);
        this.setVisible(false);
        this.body.checkCollision.none = true;
        this.body.onOverlap = false;
        this.body.setVelocity(0);
    }

    // Method generates movement frames for walking animations
    createWalkAnimations() {
        let rateOfFrames = 15;
        let repeatValue = -1;

        if (this.type === RomanTypes.BASIC) {
            this.anims.create({
                key: "walkUp",
                frames: this.anims.generateFrameNumbers("basicWalk", {
                    start: 0,
                    end: 8,
                }),
                frameRate: rateOfFrames,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "walkLeft",
                frames: this.anims.generateFrameNumbers("basicWalk", {
                    start: 9,
                    end: 17,
                }),
                frameRate: rateOfFrames,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "walkDown",
                frames: this.anims.generateFrameNumbers("basicWalk", {
                    start: 18,
                    end: 26,
                }),
                frameRate: rateOfFrames,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "walkRight",
                frames: this.anims.generateFrameNumbers("basicWalk", {
                    start: 27,
                    end: 35,
                }),
                frameRate: rateOfFrames,
                repeat: repeatValue,
            });
        }

        else if (this.type === RomanTypes.COMMANDER) {
            this.anims.create({
                key: "walkUp",
                frames: this.anims.generateFrameNumbers("commanderWalk", {
                    start: 0,
                    end: 8,
                }),
                frameRate: rateOfFrames,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "walkLeft",
                frames: this.anims.generateFrameNumbers("commanderWalk", {
                    start: 9,
                    end: 17,
                }),
                frameRate: rateOfFrames,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "walkDown",
                frames: this.anims.generateFrameNumbers("commanderWalk", {
                    start: 18,
                    end: 26,
                }),
                frameRate: rateOfFrames,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "walkRight",
                frames: this.anims.generateFrameNumbers("commanderWalk", {
                    start: 27,
                    end: 35,
                }),
                frameRate: rateOfFrames,
                repeat: repeatValue,
            });
        }
    }

    // Method generates frames for attack animations
    createAttackAnimations() {
        let rateOfFrames = 20;
        let repeatValue = 0;

        if (this.type === RomanTypes.BASIC) {
            this.anims.create({
                key: "attackUp",
                frames: this.anims.generateFrameNumbers("basicAttack", {
                    start: 0,
                    end: 5,
                }),
                frameRate: rateOfFrames,
                yoyo: true,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "attackLeft",
                frames: this.anims.generateFrameNumbers("basicAttack", {
                    start: 6,
                    end: 11,
                }),
                frameRate: rateOfFrames,
                yoyo: true,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "attackDown",
                frames: this.anims.generateFrameNumbers("basicAttack", {
                    start: 12,
                    end: 17,
                }),
                frameRate: rateOfFrames,
                yoyo: true,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "attackRight",
                frames: this.anims.generateFrameNumbers("basicAttack", {
                    start: 18,
                    end: 23,
                }),
                frameRate: rateOfFrames,
                yoyo: true,
                repeat: repeatValue,
            });
        }

        else if (this.type === RomanTypes.COMMANDER) {
            this.anims.create({
                key: "attackUp",
                frames: this.anims.generateFrameNumbers("commanderAttack", {
                    start: 0,
                    end: 5,
                }),
                frameRate: rateOfFrames,
                yoyo: true,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "attackLeft",
                frames: this.anims.generateFrameNumbers("commanderAttack", {
                    start: 6,
                    end: 11,
                }),
                frameRate: rateOfFrames,
                yoyo: true,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "attackDown",
                frames: this.anims.generateFrameNumbers("commanderAttack", {
                    start: 12,
                    end: 17,
                }),
                frameRate: rateOfFrames,
                yoyo: true,
                repeat: repeatValue,
            });
            this.anims.create({
                key: "attackRight",
                frames: this.anims.generateFrameNumbers("commanderAttack", {
                    start: 18,
                    end: 23,
                }),
                frameRate: rateOfFrames,
                yoyo: true,
                repeat: repeatValue,
            });
        }
    }
}