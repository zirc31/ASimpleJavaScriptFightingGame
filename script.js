// initialized game status
let gameStatus = 'Initial';
let heroStatus = `alive`;
let heroObj = {
    heroStatus: `alive`,
    heroAction: ``,
};
// initialized all variables that will be used across the game
const mainContainer = document.querySelector('.main-container');
// this will get the width and height of the main-container.
const windowWidth = mainContainer.getBoundingClientRect().width;
const windowHeight = mainContainer.getBoundingClientRect().height;

const header = document.querySelector('.header');
// header.textContent = `Zirc's JavaScript Browser Fighting Game`;
header.textContent = ``;

const footer = document.querySelector('.footer');
footer.innerHTML = `Design and Coded by: ZircAlbon © 2023`;
let footerPos = getPos(footer);
footer.style.top = `${windowHeight - (footerPos.height*2)}px`;

// initialized Menu Container & Menu Content
const menuContainer = document.createElement('div');
const menuContent = document.createElement('div');
mainContainer.appendChild( menuContainer );
menuContainer.appendChild( menuContent );
menuContainer.classList.add(`menu-container`);
menuContainer.classList.add(`flex-center`);
menuContent.classList.add(`menu-content`);
menuContent.classList.add(`flex-center`);
const menuContainerClass = document.querySelector('.menu-container');
const menuContentClass = document.querySelector('.menu-content');
let menuContentClassPos = getPos(menuContentClass);

// initialized Title
const titleImgTag = document.createElement('img');
mainContainer.appendChild( titleImgTag );
titleImgTag.classList.add(`img-title`);
const titleImgTagClass = document.querySelector('.img-title');
titleImgTag.src = `assets/zjsgame_title.png`;
let titleImgTagClassPos = getPos(titleImgTagClass);
titleImgTagClass.style.top = `${menuContentClassPos.top+25}px`;
titleImgTagClass.style.left = `${(windowWidth/2)-(titleImgTagClassPos.right/2)}px`;

// initialized Press Any Key
const menuPressAnyKeyImgTag = document.createElement('img');
menuContent.appendChild( menuPressAnyKeyImgTag );
menuPressAnyKeyImgTag.classList.add(`menu-press-any-key`);
const menuPressAnyKeyImgTagClass = document.querySelector('.menu-press-any-key');
menuPressAnyKeyImgTag.src = `assets/jsgame_menu_press-any-key_a.png`;
menuPressAnyKeyImgTagClass.addEventListener('mouseover', () => {
    menuPressAnyKeyImgTag.src = `assets/jsgame_menu_press-any-key_b.png`;
});
menuPressAnyKeyImgTagClass.addEventListener('mouseout', () => {
    menuPressAnyKeyImgTag.src = `assets/jsgame_menu_press-any-key_a.png`;
});
menuPressAnyKeyImgTagClass.addEventListener('click', () => {
    showMenu();
});

function showMenu() {
    gameStatus = 'Menu';

    menuPressAnyKeyImgTag.classList.add(`hide`);

    // initilized inner menu
    const menuInnerDivTag = document.createElement('div');
    menuContent.appendChild( menuInnerDivTag );
    menuInnerDivTag.classList.add(`menu-inner-div-tag`);
    menuInnerDivTag.classList.add(`flex-center-column`);

    // initialized Start Game Menu
    const menuStartGameImgTag = document.createElement('img');
    menuInnerDivTag.appendChild( menuStartGameImgTag );
    menuStartGameImgTag.classList.add(`menu-start-game`);
    const menuStartGameImgTagClass = document.querySelector('.menu-start-game');
    menuStartGameImgTag.src = `assets/jsgame_menu_start-game_a.png`;
    menuStartGameImgTagClass.style.margin = `75px 0 20px 0`;

    menuStartGameImgTagClass.addEventListener('mouseover', () => {
        menuStartGameImgTag.src = `assets/jsgame_menu_start-game_b.png`;
    });
    menuStartGameImgTagClass.addEventListener('mouseout', () => {
        menuStartGameImgTag.src = `assets/jsgame_menu_start-game_a.png`;
    });
    menuStartGameImgTagClass.addEventListener('click', () => {
        // clear all before calling the gameStart.
        menuInnerDivTag.classList.add(`hide`);
        menuStartGameImgTag.classList.add(`hide`);
        menuControlsImgTag.classList.add(`hide`);
        menuCreditsImgTag.classList.add(`hide`);
        menuContainer.classList.add(`hide`);
        menuContent.classList.add(`hide`);
        gameStart();
    });

    // initialized Controls Menu
    const menuControlsImgTag = document.createElement('img');
    menuInnerDivTag.appendChild( menuControlsImgTag );
    menuControlsImgTag.classList.add(`menu-controls`);
    const menuControlsImgTagClass = document.querySelector('.menu-controls');
    menuControlsImgTag.src = `assets/jsgame_menu_controls_a.png`;
    menuControlsImgTagClass.style.marginBottom = `20px`;

    menuControlsImgTagClass.addEventListener('mouseover', () => {
        menuControlsImgTag.src = `assets/jsgame_menu_controls_b.png`;
    });
    menuControlsImgTagClass.addEventListener('mouseout', () => {
        menuControlsImgTag.src = `assets/jsgame_menu_controls_a.png`;
    });
    menuControlsImgTagClass.addEventListener('click', () => {
        menuStartGameImgTag.classList.add(`hide`);
        menuControlsImgTag.classList.add(`hide`);
        menuCreditsImgTag.classList.add(`hide`);

        // display controls & mechanics
        const controlsContainer = document.createElement('div');
        mainContainer.appendChild( controlsContainer );
        controlsContainer.classList.add(`controls-p-tag`);
        controlsContainer.classList.add(`flex-center`);
        controlsContainer.innerHTML = `
            <div class="flex-center-column">
                <div>
                    <h5>Game Mechanics:</h5>
                    <ul>
                        <li>The Hero "you" is caught up and being ambush by a group of swarming enemy.</li>
                        <li>Help the Hero survive the enemy's attack.</li>
                        <li>You can navigate the Hero Character using Mouse or Keyboard.</li>
                        <li>You gain Points by defeating the enemy.</li>
                        <li>Your Hero will lose a Life when an enemy get near or attack the Hero.</li>
                        <li>Your Hero will die when Hero's Life decreases to 0%.</li>
                    </ul>
                    <h5>Mouse:</h5>
                    <ul>
                        <li>Click Attack button for the Hero character to attack.</li>
                        <li>Click Up, Down, Left or Right buttons to move the Hero.</li>
                    </ul>
                    <h5>Keyboard:</h5>
                    <ul>
                        <li>Press Spacebar or Enter Key for the Hero character to attack.</li>
                        <li>Press Up, Down, Left or Right Arrow Key to move the Hero.</li>
                    </ul>
                </div>
            </div>
        `;
        // if mouse clicked, the second time only.
        let mouseIsClicked = 0;
        document.addEventListener('click', () => {
            if ( mouseIsClicked == 1) {
                menuStartGameImgTag.classList.remove(`hide`);
                menuControlsImgTag.classList.remove(`hide`);
                menuCreditsImgTag.classList.remove(`hide`);
                controlsContainer.classList.add(`hide`);
                document.removeEventListener('click', document);
                document.removeEventListener('keydown', keyPressed);
            }
            mouseIsClicked += 1;
        });
        // if key pressed
        let keyPressed = document.addEventListener('keydown', pressedKey);
        function pressedKey(keyPressed){
            switch (keyPressed.code) {
                default:
                    menuStartGameImgTag.classList.remove(`hide`);
                    menuControlsImgTag.classList.remove(`hide`);
                    menuCreditsImgTag.classList.remove(`hide`);
                    controlsContainer.classList.add(`hide`);
                    document.removeEventListener('click', document);
                    document.removeEventListener('keydown', keyPressed);
                    break;
            }
        }

    });

    // initialized Credits Menu
    const menuCreditsImgTag = document.createElement('img');
    menuInnerDivTag.appendChild( menuCreditsImgTag );
    menuCreditsImgTag.classList.add(`menu-credits`);
    const menuCreditsImgTagClass = document.querySelector('.menu-credits');
    menuCreditsImgTag.src = `assets/jsgame_menu_credits_a.png`;

    menuCreditsImgTagClass.addEventListener('mouseover', () => {
        menuCreditsImgTag.src = `assets/jsgame_menu_credits_b.png`;
    });
    menuCreditsImgTagClass.addEventListener('mouseout', () => {
        menuCreditsImgTag.src = `assets/jsgame_menu_credits_a.png`;
    });
    menuCreditsImgTagClass.addEventListener('click', () => {
        window.open("https://github.com/zirc31/ASimpleJavaScriptFightingGame");
    });
}

function gameStart() {
    gameStatus = 'GameStart';

    // Initialize game details.
    const gameDetailsContainer = document.createElement('div');
    mainContainer.appendChild( gameDetailsContainer );
    gameDetailsContainer.classList.add(`game-details-container`);

    let gameDetails = {
        level: 1,
        highscore: 0,
        highscoreString: `0`,
        score: 0,
        life: 100,
        gameStatus: `ongoing`,
        numberOfEnemy: 0,
        enemyCounter: 0,
    };

    gameDetailsContainer.innerHTML = `
        <div>
            <span>Hero Life:</span> <span class="hero-game-details game-details-life">100</span><span class="hero-game-details">%</span>
        </div>
        <div>
            <span>Level:</span> <span class="hero-game-details game-details-lvl">1</span>
        </div>
        <div>
            <span>Highscore:</span> <span class="hero-game-details game-details-hscore">0</span> <span class="hero-game-details">points</span>
        </div>
        <div>
            <span>Score:</span> <span class="hero-game-details game-details-score">0</span> <span class="hero-game-details">points</span>
        </div>
    `;
    const gameDetailsLifeClass = document.querySelector('.game-details-life');
    const gameDetailsLvlClass = document.querySelector('.game-details-lvl');
    const gameDetailsHscoreClass = document.querySelector('.game-details-hscore');
    const gameDetailsScoreClass = document.querySelector('.game-details-score');

    // this is the play area, this is where the hero, enemy and boss can move freely.
    const playArea = document.querySelector('.play-area');
    playArea.style.top = `${windowHeight/2}px`;
    let playAreaPos = getPos(playArea);
    playArea.style.left = `0px`;
    playArea.style.width = `100%`;
    playArea.style.height = `${windowHeight - playAreaPos.top - 120}px`;
    playAreaPos = getPos(playArea);

    // initialized all buttons
    const btnContainer = document.querySelector('.btn-container');
    let btnContainerPos = getPos(btnContainer);
    btnContainer.style.top = `${playAreaPos.bottom - (btnContainerPos.height/2)}px`;
    const btnAtk = document.createElement('button');
    const btnUp = document.createElement('button');
    const btnDown = document.createElement('button');
    const btnLeft = document.createElement('button');
    const btnRight = document.createElement('button');

    // put button label
    btnAtk.textContent = `Attack`;
    btnUp.textContent = `↑`;
    btnDown.textContent = `↓`;
    btnLeft.textContent = `←`;
    btnRight.textContent = `→`;

    // render all buttons
    btnContainer.appendChild(btnAtk);
    btnContainer.appendChild(btnLeft);
    btnContainer.appendChild(btnUp);
    btnContainer.appendChild(btnDown);
    btnContainer.appendChild(btnRight);

    btnAtk.classList.add(`btn-key`);
    btnUp.classList.add(`btn-key`);
    btnDown.classList.add(`btn-key`);
    btnLeft.classList.add(`btn-key`);
    btnRight.classList.add(`btn-key`);

    btnAtk.classList.add(`btn-atk`);
    btnUp.classList.add(`btn-up`);
    btnDown.classList.add(`btn-down`);
    btnLeft.classList.add(`btn-left`);
    btnRight.classList.add(`btn-right`);

    // initialized hero character.
    const heroChar = document.querySelector('.hero-char');
    heroChar.classList.remove(`hide`);
    let heroCharPos = getPos(heroChar);
    playAreaPos = getPos(playArea);
    heroChar.style.top = `${(playAreaPos.top+(playAreaPos.height/2))-(heroCharPos.height/2)}px`;
    heroChar.style.left = `${(windowWidth/2)-(heroCharPos.width/2)}px`;

    // initialized enemy character
    function generateEnemy(generateQty,gameLevel) {
        gameDetails.level = gameLevel;
        gameDetails.numberOfEnemy = generateQty;
        gameDetails.enemyCounter = generateQty;

        // spawn enemy
        const enemyContainer = new Array;
        let enemyChar = new Array;
        let enemyCharPos = new Array;
        let enemyCharObj = [{}];

        let frognemySpriteObj = {
            idle: [
                `url('assets/frognemy/frognemy_idle1.min.png')`,
                `url('assets/frognemy/frognemy_idle2.min.png')`
            ],
            walk: [
                `url('assets/frognemy/frognemy_walk1.min.png')`,
                `url('assets/frognemy/frognemy_walk2.min.png')`
            ],
            attack: [
                `url('assets/frognemy/frognemy_attack1.min.png')`,
                `url('assets/frognemy/frognemy_attack2.min.png')`
            ],
            hit: [
                `url('assets/frognemy/frognemy_hit1.min.png')`,
                `url('assets/frognemy/frognemy_hit2.min.png')`,
                `url('assets/frognemy/frognemy_hit3.min.png')`,
                `url('assets/frognemy/frognemy_hit4.min.png')`,
                `url('assets/frognemy/frognemy_hit5.min.png')`
            ]
        };

        
        // This will create and render all the enemy.
        for(enemyCount = 0; enemyCount < generateQty; enemyCount++ ) {
            // random number, will later use in if else.
            let randomOddEven = Math.floor( Math.random()*100);

            enemyContainer[enemyCount] = document.createElement('div');
            enemyContainer[enemyCount].classList.add(`enemy-spawn${enemyCount+1}`);
            enemyContainer[enemyCount].classList.add(`enemy-char`);
            mainContainer.appendChild( enemyContainer[enemyCount] );
            enemyChar[enemyCount] = document.querySelector(`.enemy-spawn${enemyCount+1}`);
            enemyCharPos[enemyCount] = getPos(enemyChar[enemyCount]);

            // enemy random re/spawn
            let randomSpot = Math.floor( Math.random()*(playAreaPos.height-enemyCharPos[enemyCount].height));
            let randomSpotY = randomSpot + playAreaPos.top;
            enemyChar[enemyCount].style.top = `${randomSpotY}px`;

            enemyCharObj[enemyCount] = { enemyId: enemyCount, };

            // IF even respawn left, if odd respawn right.
            enemyCharObj[enemyCount].enemyLevel = `normal`; // normal, alpha
            enemyCharObj[enemyCount].enemyLife = 3; // alive, dead
            enemyCharObj[enemyCount].enemyLifeStatus = `alive`; // alive, dead
            enemyCharObj[enemyCount].enemyMode = `active`; // active, moving, attacking, dying
            enemyCharObj[enemyCount].enemyAction = `forward`; // forward, up, down

            // IF even respawn left, if odd respawn right.
            if(randomOddEven % 2 == 0 ) {
                enemyChar[enemyCount].style.left = `${playAreaPos.left+1}px`;

                // Initialized Enemy object.
                // respawn to left facing right.
                enemyCharObj[enemyCount].facingDirection = `right`;
                enemyCharPos[enemyCount] = getPos(enemyChar[enemyCount]);
                enemyCharObj[enemyCount].position = enemyCharPos[enemyCount];
            } else {
                enemyChar[enemyCount].style.left = `${playAreaPos.right-enemyCharPos[enemyCount].width-1}px`;

                // Initialized Enemy object.
                // respawn to right facing left.
                enemyCharObj[enemyCount].facingDirection = `left`;
                enemyCharPos[enemyCount] = getPos(enemyChar[enemyCount]);
                enemyCharObj[enemyCount].position = enemyCharPos[enemyCount];
            }
        }

        // this will passed enemy's object to make the enemy do an action repeatedly.
        for(enemyCount = 0; enemyCount < generateQty; enemyCount++ ) {
            // generate an array of enemy, and designate who will be alpha.
            // will still add function for it

            // call enemy function
            enemyWalk(enemyCharObj[enemyCount]);
        }

        let switchFacing = ``;
        function enemyWalk(mobsObj) {
            // function enemyWalk(whatMobs,mobsObj) {
            let id = null;
            clearInterval(id);

            id = setInterval(enemyAction, 150);

            // Enemy Action:
            // Move to designated location left or right
            // Move to opposite direction if reach the end of its direction
            // Random movement: forward, up or down.

            // Enemy Action function
            let randomNum = 0;
            let enemySpriteNum = 0;
            let enemyRenderStatus = 0;
            let checkHighScore = 0;
            let checkHighScoreString = '';
            let enemyResult = {
                facing: '',
                allEnemy: ''
            };

            function enemyAction() {
                statsUpdate();

                // check if hero is dead. then Game Over.
                if( gameDetails.life <= 0 ) {
                    if( heroObj.heroStatus != `dead` ) {
                        renderHeroAction('death');
                        heroObj.heroStatus = `dead`;
                        gameDetails.life = 0;

                        // Initialize game details.
                        const gameOverContainer = document.createElement('div');
                        mainContainer.appendChild( gameOverContainer );
                        gameOverContainer.classList.add(`game-over-container`);
                        gameOverContainer.classList.add(`flex-center`);
                        gameOverContainer.style.width = `100%`;
                        gameOverContainer.style.height = `100vh`;
                        gameOverContainer.innerHTML = `
                            <div>
                                <h1>Game Over!</h1>
                            </div>
                        `;
                    }
                }

                // will check which direction the enemy will walk. Left or Right.
                randomNum = getRandomNumber(10);
                if( mobsObj.facingDirection == 'left' ) {
                    enemyChar[mobsObj.enemyId].style.transform = `scaleX(-1)`;
                    enemyResult = moveEnemyLeft(enemyChar[mobsObj.enemyId],mobsObj);
                    if(randomNum == 1 || randomNum == 2 || randomNum == 3) {
                        moveEnemyUp(enemyChar[mobsObj.enemyId]);
                    } else if(randomNum == 4 || randomNum == 5 || randomNum == 6) {
                        moveEnemyDown(enemyChar[mobsObj.enemyId]);
                    }
                } else if( mobsObj.facingDirection == 'right' ) {
                    enemyChar[mobsObj.enemyId].style.transform = `scaleX(1)`;
                    enemyResult = moveEnemyRight(enemyChar[mobsObj.enemyId],mobsObj);
                    if(randomNum == 1 || randomNum == 2 || randomNum == 3) {
                        moveEnemyUp(enemyChar[mobsObj.enemyId]);
                    } else if(randomNum == 4 || randomNum == 5 || randomNum == 6) {
                        moveEnemyDown(enemyChar[mobsObj.enemyId]);
                    }
                } else {
                }
                // this animates the enemy.
                if( enemySpriteNum == 0 ) {
                    enemyChar[mobsObj.enemyId].style.backgroundImage = frognemySpriteObj.walk[0];
                    enemySpriteNum += 1;
                    enemyRenderStatus = 1;
                } else if( enemySpriteNum == 1 ) {
                    enemyChar[mobsObj.enemyId].style.backgroundImage = frognemySpriteObj.walk[1];
                    enemySpriteNum += 1;
                    enemyRenderStatus = 1;
                } else {
                    enemyChar[mobsObj.enemyId].style.backgroundImage = frognemySpriteObj.idle[0];
                    enemySpriteNum = 0;
                    enemyRenderStatus = 0;
                }
                mobsObj.facingDirection = enemyResult.facing;

                // get the highscore
                checkHighScoreString = localStorage.getItem("highScore");
                // convert the highScore string into number.
                checkHighScore = checkHighScoreString * 1;
                // clear highScore
                // localStorage.setItem('highScore', 0);

                if( gameDetails.score > checkHighScore ) {
                    // Set New Highscore
                    localStorage.setItem('highScore', gameDetails.score);
                }

                // clear interval and return
                if( gameDetails.enemyCounter == 0 ) {
                    gameDetails.gameStatus = `cleared`;
                    clearInterval(id);
                    return;
                }
            }
        }

        function statsUpdate() {
            gameDetailsLifeClass.textContent = gameDetails.life;
            gameDetailsLvlClass.textContent = `${gameDetails.level} [${gameDetails.enemyCounter}/${gameDetails.numberOfEnemy}]`;
            gameDetails.highscoreString = localStorage.getItem("highScore");
            gameDetailsHscoreClass.textContent = gameDetails.highscoreString;
            gameDetailsScoreClass.textContent = gameDetails.score;
        }

        let enemyMovementSpeed = 7;
        let facing = ``;
        let allEnemy = ``;
        let heroCharCore = 0;
        let enemyCharCore = 0;
        let coreGap = 0;
        // move enemy to the left
        function moveEnemyLeft(thisMobs,mobsObj) {
            heroCharPos = getPos(heroChar);
            heroCharCore = heroCharPos.top+(heroCharPos.height/2);
            coreGap = (heroCharPos.height/5)*3;
            let thisMobsPos = getPos(thisMobs);
            enemyCharCore = thisMobsPos.top+(thisMobsPos.height/2);
            if( thisMobsPos.left <= (heroCharPos.right-5) &&
                thisMobsPos.left > (heroCharPos.left + (heroCharPos.width/3)) &&
                enemyCharCore >= heroCharCore - coreGap &&
                enemyCharCore <= heroCharCore + coreGap
            ) {
                if(heroObj.heroStatus == `alive`) {
                    if(heroObj.heroAction == `attack`) {
                        mobsObj.enemyLife = mobsObj.enemyLife - 1;
                        if(mobsObj.enemyLife == 0) {
                            thisMobs.style.display = `none`;
                            thisMobs.remove();
                            gameDetails.enemyCounter = gameDetails.enemyCounter -1;
                            gameDetails.score = gameDetails.score + 1;
                            console.log(`gameDetails.enemyCounter:${gameDetails.enemyCounter} | gameDetails.score:${gameDetails.score}`);
                            facing = `left`;
                            allEnemy = `defeated`;
                            return { facing, allEnemy };
                        }
                    } else {
                        gameDetails.life = gameDetails.life - getRandomNumber(5);
                        renderHeroAction(`hit`);
                    }
                }
            } else if( thisMobsPos.left - enemyMovementSpeed > playAreaPos.left ) {
                thisMobsPos.left = thisMobsPos.left - enemyMovementSpeed;
                thisMobs.style.left = `${thisMobsPos.left}px`;
            }
            else {
                facing = `right`;
                allEnemy = `someAlive`;
                return { facing, allEnemy };
            }
            facing = `left`;
            allEnemy = `someAlive`;
            return { facing, allEnemy };
        }
        // move enemy to the right
        function moveEnemyRight(thisMobs,mobsObj) {
            heroCharPos = getPos(heroChar);
            heroCharCore = heroCharPos.top+(heroCharPos.height/2);
            coreGap = (heroCharPos.height/5)*3;
            let thisMobsPos = getPos(thisMobs);
            enemyCharCore = thisMobsPos.top+(thisMobsPos.height/2);
            if( thisMobsPos.right >= heroCharPos.left &&
                thisMobsPos.right < (heroCharPos.left + (heroCharPos.width/3)) &&
                enemyCharCore >= heroCharCore - coreGap &&
                enemyCharCore <= heroCharCore + coreGap
            ) {
                if(heroObj.heroStatus == `alive`) {
                    if(heroObj.heroAction == `attack`) {
                        mobsObj.enemyLife = mobsObj.enemyLife - 1;
                        if(mobsObj.enemyLife == 0) {
                            thisMobs.style.display = `none`;
                            thisMobs.remove();
                            gameDetails.enemyCounter = gameDetails.enemyCounter -1;
                            gameDetails.score = gameDetails.score + 1;
                            console.log(`gameDetails.enemyCounter:${gameDetails.enemyCounter} | gameDetails.score:${gameDetails.score}`);
                            facing = `right`;
                            allEnemy = `defeated`;
                            return { facing, allEnemy };
                        }
                    } else {
                        gameDetails.life = gameDetails.life - getRandomNumber(5);
                        renderHeroAction(`hit`);
                    }
                }
            }
            else if( thisMobsPos.right + enemyMovementSpeed < playAreaPos.right ) {
                thisMobsPos.left = thisMobsPos.left + enemyMovementSpeed;
                thisMobs.style.left = `${thisMobsPos.left}px`;
            } else {
                // return `left`;
                facing = `left`;
                allEnemy = `someAlive`;
                return { facing, allEnemy };
            }
            // return `right`;
            facing = `right`;
            allEnemy = `someAlive`;
            return { facing, allEnemy };
        }
        // move enemy up
        function moveEnemyUp(thisMobs) {
            let thisMobsPos = getPos(thisMobs);
            if( thisMobsPos.top - enemyMovementSpeed > playAreaPos.top ) {
                thisMobsPos.top = thisMobsPos.top - enemyMovementSpeed;
                thisMobs.style.top = `${thisMobsPos.top}px`;
            } else {
                thisMobsPos.top = thisMobsPos.top + enemyMovementSpeed;
                thisMobs.style.top = `${thisMobsPos.top}px`;
            }
        }
        // move enemy down
        function moveEnemyDown(thisMobs) {
            let thisMobsPos = getPos(thisMobs);
            if( thisMobsPos.bottom + enemyMovementSpeed < playAreaPos.bottom ) {
                thisMobsPos.top = thisMobsPos.top + enemyMovementSpeed;
                thisMobs.style.top = `${thisMobsPos.top}px`;
            } else {
                thisMobsPos.top = thisMobsPos.top - enemyMovementSpeed;
                thisMobs.style.top = `${thisMobsPos.top}px`;
            }
        }

        // check if level is cleared, then respawn monster.
        let gameStatusCheckerCounter = 2;
        function gameStatusChecker() {
            let id = null;
            clearInterval(id);
            id = setInterval(respawnEnemy, 1000);
            function respawnEnemy() {
                if(gameDetails.enemyCounter == 0) {
                    gameStatusCheckerCounter += 1;
                    generateEnemy((gameStatusCheckerCounter*2)-1,gameStatusCheckerCounter+1);
                }
                console.log(`checking gameDetails.enemyCounter = ${gameDetails.enemyCounter}`);
            }
        }
        gameStatusChecker();
    }
    generateEnemy(3,1); // start generate enemy.

    // this will be passed to a function call outside.
    let btnClickEvent = [0,0,0,0,0];

    // event listener for mouseclick.
    const btnAtkEvent = document.querySelector('.btn-atk');
    btnClickEvent[0] = btnAtkEvent;
    ['mousedown','mouseup'].forEach( event => btnAtkEvent.addEventListener( event, function(){
        btnAtkEvent.classList.toggle('btn-key-clicked');
        unstuckToggleExcept('Atk');
        if( heroObj.heroStatus == 'alive' ) {
            renderHeroAction('attack');
        }
    }));

    const btnUpEvent = document.querySelector('.btn-up');
    btnClickEvent[1] = btnUpEvent;
    ['mousedown','mouseup'].forEach( event => btnUpEvent.addEventListener( event, function(){
        btnUpEvent.classList.toggle('btn-key-clicked');
        unstuckToggleExcept('Up');
        if( heroObj.heroStatus == 'alive' ) {
            moveUp(heroChar,playAreaPos);
            renderHeroWalk('');
        }
    }));

    const btnDownEvent = document.querySelector('.btn-down');
    btnClickEvent[2] = btnDownEvent;
    ['mousedown','mouseup'].forEach( event => btnDownEvent.addEventListener( event, function(){
        btnDownEvent.classList.toggle('btn-key-clicked');
        unstuckToggleExcept('Down');
        if( heroObj.heroStatus == 'alive' ) {
            moveDown(heroChar,playAreaPos);
            renderHeroWalk('');
        }    
    }));

    const btnLeftEvent = document.querySelector('.btn-left');
    btnClickEvent[3] = btnLeftEvent;
    ['mousedown','mouseup'].forEach( event => btnLeftEvent.addEventListener( event, function(){
        btnLeftEvent.classList.toggle('btn-key-clicked');
        unstuckToggleExcept('Left');
        if( heroObj.heroStatus == 'alive' ) {
            moveLeft(heroChar,playAreaPos);
            renderHeroWalk('left');
        }
    }));

    const btnRightEvent = document.querySelector('.btn-right');
    btnClickEvent[4] = btnRightEvent;
    ['mousedown','mouseup'].forEach( event => btnRightEvent.addEventListener( event, function(){
        btnRightEvent.classList.toggle('btn-key-clicked');
        unstuckToggleExcept('Right');
        if( heroObj.heroStatus == 'alive' ) {
            moveRight(heroChar,playAreaPos);
            renderHeroWalk('right');
        }    
    }));

    // some are being stucked in the previous toggle, so to remove it, i have to call the remove class when a different button has been clicked
    function unstuckToggleExcept(action) {
        if(action !== 'Up') {
            btnUpEvent.classList.remove('btn-key-clicked');
        }
        if(action !== 'Down') {
            btnDownEvent.classList.remove('btn-key-clicked');
        }
        if(action !== 'Left') {
            btnLeftEvent.classList.remove('btn-key-clicked');
        }
        if(action !== 'Right') {
            btnRightEvent.classList.remove('btn-key-clicked');
        }
        if(action !== 'Atk') {
            btnAtkEvent.classList.remove('btn-key-clicked');
        }
    }
    //
    callKeyEventListener('',heroChar,btnClickEvent,playAreaPos);
}

// This will get the actual: top, left, right bottom, width, height
function getPos(posToGet) {
    let posObject = {
        top: posToGet.getBoundingClientRect().top,
        left: posToGet.getBoundingClientRect().left,
        right: posToGet.getBoundingClientRect().right,
        bottom: posToGet.getBoundingClientRect().bottom,
        width: posToGet.getBoundingClientRect().width,
        height: posToGet.getBoundingClientRect().height
    };
    return posObject;
}

// move the character up.
let movementSpeed = 2;
function moveUp(thisChar,playAreaPos) {
    let thisCharPos = getPos(thisChar);
    if( thisCharPos.top - movementSpeed > playAreaPos.top ) {
        thisCharPos.top = thisCharPos.top - movementSpeed;
        thisChar.style.top = `${thisCharPos.top}px`;
    }
}
// move the character down.
function moveDown(thisChar,playAreaPos) {
    let thisCharPos = getPos(thisChar);
    if( thisCharPos.bottom + movementSpeed < playAreaPos.bottom ) {
        thisCharPos.top = thisCharPos.top + movementSpeed;
        thisChar.style.top = `${thisCharPos.top}px`;
    }
}
// move the character to the left.
function moveLeft(thisChar,playAreaPos) {
    let thisCharPos = getPos(thisChar);
    if( thisCharPos.left - movementSpeed > playAreaPos.left ) {
        thisCharPos.left = thisCharPos.left - movementSpeed;
        thisChar.style.left = `${thisCharPos.left}px`;
    }
}
// move the character to the right.
function moveRight(thisChar,playAreaPos) {
    let thisCharPos = getPos(thisChar);
    if( thisCharPos.right + movementSpeed < playAreaPos.right ) {
        thisCharPos.left = thisCharPos.left + movementSpeed;
        thisChar.style.left = `${thisCharPos.left}px`;
    }
}

// move the character using keyboard keys.
// Up Down Left Right arrow keys to move the characters
// Space key to Attack or Select
// Enter key to Attack or Select
function callKeyEventListener(checkForMenu,checkForHero,btnClickEvent,playAreaPos) {
    let array = 0;

    // this will toggle the buttons.
    function toggleBtn(array){
        btnClickEvent[array].classList.toggle('btn-key-clicked');
        for(count=0;count<5;count++) {
            if(array==count) {
            } else {
                btnClickEvent[count].classList.remove('btn-key-clicked');
            }
        }
    }

    // this will check of a keyboard key press.
    let whatKeyIsPressed = document.addEventListener('keydown', pressedKey);
    function pressedKey(whatKeyIsPressed){
        switch (whatKeyIsPressed.code) {
            case 'ArrowUp':
                if( heroObj.heroStatus == 'alive' ) {
                    if(gameStatus == 'GameStart') {
                        moveUp(checkForHero,playAreaPos);
                        renderHeroWalk('');
                        toggleBtn(1);
                    }
                }
                break;
            case 'ArrowDown':
                if( heroObj.heroStatus == 'alive' ) {
                    if(gameStatus == 'GameStart') {
                        moveDown(checkForHero,playAreaPos);
                        renderHeroWalk('');
                        toggleBtn(2);
                    }
                }
                break;
            case 'ArrowLeft':
                if( heroObj.heroStatus == 'alive' ) {
                    if(gameStatus == 'GameStart') {
                        moveLeft(checkForHero,playAreaPos);
                        renderHeroWalk('left');
                        toggleBtn(3);
                    }
                }
                break;
            case 'ArrowRight':
                if( heroObj.heroStatus == 'alive' ) {
                    if(gameStatus == 'GameStart') {
                        moveRight(checkForHero,playAreaPos);
                        renderHeroWalk('right');
                        toggleBtn(4);
                    }
                }
                break;
            case 'Space':
                if( heroObj.heroStatus == 'alive' ) {
                    if(gameStatus == 'GameStart') {
                        renderHeroAction('attack');
                        toggleBtn(0);
                    }
                }
                break;
            case 'Enter':
                if( heroObj.heroStatus == 'alive' ) {
                    if(gameStatus == 'GameStart') {
                        renderHeroAction('hit');
                        toggleBtn(0);
                    }
                }
                break;
            case 'KeyW':
                if( heroObj.heroStatus == 'alive' ) {
                    if(gameStatus == 'GameStart') {
                        renderHeroAction('death');
                    }
                }
                break;
            default:
                console.log(`code: "${whatKeyIsPressed.code}"`);
                break;
        }
    }
}

// Will be use to render Hero's Movement
let renderStatus = 0; // this will be for checking if need to render another movement so that it wont stuck and animation will be smooth.
let heroActionObj = {
    idle: [
        `url('assets/hero-char/hero-char_idle1.min.png')`,
        `url('assets/hero-char/hero-char_idle2.min.png')`
    ],
    walk: [
        `url('assets/hero-char/hero-char_walk1.min.png')`,
        `url('assets/hero-char/hero-char_walk2.min.png')`
    ],
    attack: [
        `url('assets/hero-char/hero-char_attack1.min.png')`,
        `url('assets/hero-char/hero-char_attack2.min.png')`
    ],
    hit: [
        `url('assets/hero-char/hero-char_hit1.min.png')`,
        `url('assets/hero-char/hero-char_hit2.min.png')`
    ],
    death: [
        `url('assets/hero-char/hero-char_death1.min.png')`,
        `url('assets/hero-char/hero-char_death2.min.png')`,
        `url('assets/hero-char/hero-char_death3.min.png')`
    ],
    dead: [
        `url('assets/hero-char/hero-char_death3_a.min.png')`,
        `url('assets/hero-char/hero-char_death3_b.min.png')`,
        `url('assets/hero-char/hero-char_death3_c.min.png')`
    ]
}
let actionDefault = heroActionObj.idle[0];
let actionOne = '';
let actionTwo = '';
let actionThree = '';

heroChar = document.querySelector('.hero-char');

function renderHeroWalk(facing) {
    let id = null;
    clearInterval(id);
    let heroSpriteNum = 0;
    // console.log(renderStatus); // enable for checking

    // this is to allow the animation to be smooth.
    if(renderStatus == 0) {
        id = setInterval(heroAction, 150);
    }
    // Hero Action function
    function heroAction() {
        if( facing == 'left' ) {
            heroChar.style.transform = `scaleX(-1)`;
        } else if( facing == 'right' ) {
            heroChar.style.transform = `scaleX(1)`;
        } else {
        }
        if(heroSpriteNum == 0) {
            heroChar.style.backgroundImage = heroActionObj.walk[0];
            heroSpriteNum += 1;
            renderStatus = 1;
        } else if(heroSpriteNum == 1) {
            heroChar.style.backgroundImage = heroActionObj.walk[1];
            heroSpriteNum += 1;
            renderStatus = 1;
        } else {
            heroChar.style.backgroundImage = heroActionObj.idle[0];
            renderStatus = 0;
            clearInterval(id);
            return;
        }
    }
}

function renderHeroAction(ifAction) {
    let id = null;
    clearInterval(id);
    let heroSpriteNum = 0;

    if( ifAction == 'attack' ) {
        heroObj.heroAction = `attack`;
        actionOne = heroActionObj.attack[0];
        actionTwo = heroActionObj.attack[1];
    } else if( ifAction == 'hit' ) {
        heroObj.heroAction = `hit`;
        actionOne = heroActionObj.hit[0];
        actionTwo = heroActionObj.hit[1];
    } else if( ifAction == 'death' ) {
        heroObj.heroAction = `dying`;
        heroObj.heroStatus = 'dead'
    } else {
        actionOne = actionDefault;
        actionTwo = actionDefault;
        actionThree = actionDefault;
    }
    let deathOfHeroSprite = [
        heroActionObj.death[0],
        heroActionObj.death[1],
        heroActionObj.death[2]
    ];
    let deadHeroSprite = [
        heroActionObj.death[2],
        heroActionObj.dead[0],
        heroActionObj.dead[1],
        heroActionObj.dead[2],
        heroActionObj.dead[1],
        heroActionObj.dead[0]
    ];

    // this is to allow the animation to be smooth.
    renderTime = 250;
    if( ifAction == 'attack' || ifAction == 'hit' ) {
        if( renderStatus == 0 ) {
            id = setInterval(heroAction, renderTime);
        }
    } else {
        id = setInterval(heroActionDied, renderTime);
    }

    // Hero Action function
    function heroAction() {
        if(heroSpriteNum == 0) {
            heroChar.style.backgroundImage = actionOne;
            heroSpriteNum += 1;
            renderStatus = 1;
        } else if(heroSpriteNum == 1) {
            heroChar.style.backgroundImage = actionTwo;
            heroSpriteNum += 1;
            renderStatus = 1;
        } else if(heroSpriteNum == 2) {
            if( ifAction == 'attack' || ifAction == 'hit' ) {
                heroChar.style.backgroundImage = actionDefault;
                heroObj.heroAction = ``;
                renderStatus = 0;
                clearInterval(id);
                return;
            }
            heroChar.style.backgroundImage = actionThree;
            heroSpriteNum += 1;
            renderStatus = 1;
        } else {
            heroChar.style.backgroundImage = actionDefault;
            heroObj.heroAction = ``;
            renderStatus = 0;
            clearInterval(id);
            return;
        }
    }
    function heroActionDied() {
        renderStatus = 1;

        if( heroSpriteNum < 3 ) {
            heroChar.style.backgroundImage = deathOfHeroSprite[heroSpriteNum];
            heroSpriteNum += 1;
        } else {
            clearInterval(id);
            deadHeroLoop(deadHeroSprite);
        }
    }
}

function deadHeroLoop(deadHeroSprite) {
    renderStatus = 1;
    heroSpriteNum = 0;
    id = setInterval(heroIsDead, 250);
    function heroIsDead() {
        heroObj.heroStatus = `dead`;
        heroObj.heroAction = `dead`;
        heroChar.style.backgroundImage = deadHeroSprite[heroSpriteNum];
        heroSpriteNum += 1;
        if( heroSpriteNum == 6 ) {
            heroSpriteNum = 0;
        }
    }
}

function getRandomNumber(maxNum) {
    return Math.floor( Math.random()*maxNum);
}