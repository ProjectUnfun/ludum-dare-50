class GamePlayer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, images) {
        super(scene, x, y, images);
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.images = images;

        // Enable player physics
        this.scene.physics.world.enable(this);

        // Create animations
        this.createWalkAnimations();
        this.createAttackAnimations();

        // Set default animation status
        this.currentDirection = Direction.DOWN;
        this.setFrame(18);

        // Config combat
        this.configCombat();

        // Create health bar
        this.createHealthBar();

        // Make the game camera follow the player
        this.scene.cameras.main.startFollow(this);

        // Add player object to scene
        this.scene.add.existing(this);

        // Config player timer
        this.configTimer();
    }

    update(cursors) {
        this.checkIdle(cursors);
        this.checkMovement(cursors);
        this.checkAttack(cursors);
        this.updateHealthBar();

        // Handle physics body repositioning due to larger attack sprite frame size
        if (this.isAttacking) {
            this.body.setOffset(80, 94);
        } else {
            this.body.setOffset(16, 30);
        }
    }

    // Method configs combat
    configCombat() {
        // Config physics body
        this.body.setSize(32, 32);
        this.body.setOffset(16, 30);

        // Config health
        this.health = 7;
        this.maxHealth = 7;

        // Config attack value
        this.attackValue = 3;

        // Track damage dealing status
        this.isAttacking = false;

        // Track damage receiving status
        this.canBeAttacked = true;

        // Track number of Romans killed
        this.killCount = 0;

        // Track hitbox location
        this.hitboxLocation = {
            x: 0,
            y: 0,
        }

        // Create hitbox physics body
        this.hitbox = this.scene.add.image(this.x, this.y, "playerHitbox");

        // Enable hitbox physics
        this.scene.physics.world.enable(this.hitbox);

        // Set default hitbox status
        this.hitbox.setAlpha(0);
        this.makeHitboxInactive();
        this.hitboxIsActive = false;

        // Player hitbox vs Romans overlap method call
        this.scene.physics.add.overlap(this.hitbox, this.scene.romans, this.handleRomanAttacked, undefined, this);
    }

    // Method handles player attack hiting romans
    handleRomanAttacked(hitbox, roman) {
        roman.updateHealth(this.attackValue);
    }

    // Method handles hitbox location assignment
    checkAttack(cursors) {
        if (Phaser.Input.Keyboard.JustDown(cursors.space) && !this.isAttacking) {
            // Stop animations and movement, alter attacking flag
            this.anims.stop();
            this.body.setVelocity(0);
            this.isAttacking = true;

            // Determine direction, appropriate animation, and hitbox location
            if (this.currentDirection === Direction.DOWN) {
                this.anims.play("attackDown", true);
                this.hitboxLocation.x = this.x;
                this.hitboxLocation.y = this.y + 24;
            } else if (this.currentDirection === Direction.UP) {
                this.anims.play("attackUp", true);
                this.hitboxLocation.x = this.x;
                this.hitboxLocation.y = this.y - 8;
            } else if (this.currentDirection === Direction.LEFT) {
                this.anims.play("attackLeft", true);
                this.hitboxLocation.x = this.x - 16;
                this.hitboxLocation.y = this.y + 6;
            } else if (this.currentDirection === Direction.RIGHT) {
                this.anims.play("attackRight", true);
                this.hitboxLocation.x = this.x + 16;
                this.hitboxLocation.y = this.y + 6;
            }

            // Update location of hitbox
            this.hitbox.setPosition(this.hitboxLocation.x, this.hitboxLocation.y);

            // Play attack audio
            this.scene.playerAttackAudio.play();

            // Activate hitbox for attack detection
            this.makeHitboxActive();

            // Delay player attack repetition by .3 seconds
            this.scene.time.delayedCall(
                300,
                () => {
                    // Reset flag & deactivate hitbox
                    this.isAttacking = false;
                },
                [],
                this
            );
        } else {
            if (this.hitboxIsActive) {
                this.makeHitboxInactive();
            }
        }
    }

    // Method make hitbox active for attack overlap checking
    makeHitboxActive() {
        // Activate hitbox overlap checking
        this.hitbox.setActive(true);
        this.hitbox.body.checkCollision.none = false;
        this.hitboxIsActive = true;
    }

    // Method makes hitbox inactive to prevent attack overlap checking
    makeHitboxInactive() {
        // Deactivate hitbox overlap checking
        this.hitbox.setActive(false);
        this.hitbox.body.checkCollision.none = true;
        this.hitboxIsActive = false;
    }

    // Method handles idle status
    checkIdle(cursors) {
        // If none of the cursors are being pressed
        if (
            !cursors.left.isDown &&
            !cursors.right.isDown &&
            !cursors.up.isDown &&
            !cursors.down.isDown &&
            !this.isAttacking
        ) {
            // Stop animations
            this.anims.stop();

            // Check which direction player is facing and set frame
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

    // Method handles movement status
    checkMovement(cursors) {
        // Reset player velocity
        this.body.setVelocity(0);

        // Check which key is pressed; assign direction, velocity, and animations
        if (cursors.left.isDown && !this.isAttacking) {
            this.body.setVelocityX(-playerMoveSpeed);
            this.currentDirection = Direction.LEFT;
            this.anims.play("walkLeft", true);
        } else if (cursors.right.isDown && !this.isAttacking) {
            this.body.setVelocityX(playerMoveSpeed);
            this.currentDirection = Direction.RIGHT;
            this.anims.play("walkRight", true);
        } else if (cursors.up.isDown && !this.isAttacking) {
            this.body.setVelocityY(-playerMoveSpeed);
            this.currentDirection = Direction.UP;
            this.anims.play("walkUp", true);
        } else if (cursors.down.isDown && !this.isAttacking) {
            this.body.setVelocityY(playerMoveSpeed);
            this.currentDirection = Direction.DOWN;
            this.anims.play("walkDown", true);
        }
    }

    // Method handles updating health when damage is taken
    updateHealth(amount) {
        this.health -= amount;
        if (this.health < 0) this.health = 0;

        // Play hit audio
        this.scene.playerGruntAudio.play();
        this.scene.playerHitAudio.play();

        console.log(`Player has been damaged`);
    }

    // Method creates the health bar
    createHealthBar() {
        this.healthBar = this.scene.add.graphics();
        this.updateHealthBar();
    }

    // Method updates the location and fullness of health bar
    updateHealthBar() {
        this.healthBar.clear();
        this.healthBar.fillStyle(0xffffff, 1);
        this.healthBar.fillRect(this.x - 20, this.y - 30, 40, 5);
        this.healthBar.fillGradientStyle(0x00ff00, 0x00ff00, 4);
        this.healthBar.fillRect(
            this.x - 20,
            this.y - 30,
            (40 * this.health) / this.maxHealth,
            5
        );
    }

    // Method configs the player life timer
    configTimer() {
        this.timerEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: this.handleTime,
            callbackScope: this,
            loop: true,
        });
        this.timeAlive = 0;
    }

    // Method handles incrementing player life timer
    handleTime() {
        this.timeAlive++;

        // Emit event for updating UI counters
        this.scene.events.emit(
            "updateTime",
            this.timeAlive,
        );
    }

    // Method generatesd frames for walking animations
    createWalkAnimations() {
        let rateOfFrames = 15;
        let repeatValue = 0;

        this.anims.create({
            key: "walkUp",
            frames: this.anims.generateFrameNumbers("playerWalk", {
                start: 0,
                end: 8,
            }),
            frameRate: rateOfFrames,
            repeat: repeatValue,
        });
        this.anims.create({
            key: "walkLeft",
            frames: this.anims.generateFrameNumbers("playerWalk", {
                start: 9,
                end: 17,
            }),
            frameRate: rateOfFrames,
            repeat: repeatValue,
        });
        this.anims.create({
            key: "walkDown",
            frames: this.anims.generateFrameNumbers("playerWalk", {
                start: 18,
                end: 26,
            }),
            frameRate: rateOfFrames,
            repeat: repeatValue,
        });
        this.anims.create({
            key: "walkRight",
            frames: this.anims.generateFrameNumbers("playerWalk", {
                start: 27,
                end: 35,
            }),
            frameRate: rateOfFrames,
            repeat: repeatValue,
        });
    }

    // Method generates frames for attack animations
    createAttackAnimations() {
        let rateOfFrames = 20;
        let repeatValue = 0;

        this.anims.create({
            key: "attackUp",
            frames: this.anims.generateFrameNumbers("playerAttack", {
                start: 0,
                end: 5,
            }),
            frameRate: rateOfFrames,
            yoyo: true,
            repeat: repeatValue,
        });
        this.anims.create({
            key: "attackLeft",
            frames: this.anims.generateFrameNumbers("playerAttack", {
                start: 6,
                end: 11,
            }),
            frameRate: rateOfFrames,
            yoyo: true,
            repeat: repeatValue,
        });
        this.anims.create({
            key: "attackDown",
            frames: this.anims.generateFrameNumbers("playerAttack", {
                start: 12,
                end: 17,
            }),
            frameRate: rateOfFrames,
            yoyo: true,
            repeat: repeatValue,
        });
        this.anims.create({
            key: "attackRight",
            frames: this.anims.generateFrameNumbers("playerAttack", {
                start: 18,
                end: 23,
            }),
            frameRate: rateOfFrames,
            yoyo: true,
            repeat: repeatValue,
        });
    }
}