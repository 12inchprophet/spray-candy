document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.querySelector('.game-board');
    const scoreDisplay = document.getElementById('score');
    const restartButton = document.getElementById('restart');
    const startButton = document.getElementById('start');
    const winMessage = document.getElementById('win-message');
    const gameOverMessage = document.getElementById('game-over-message');
    const restartBottom = document.getElementById('restart-bottom');
    const nextStageButton = document.getElementById('next-stage');
    const restartGameOver = document.getElementById('restart-game-over');

    const level1 = document.getElementById('level1');
    const level2 = document.getElementById('level2');
    const level3 = document.getElementById('level3');
    const level4 = document.getElementById('level4');
    const level5 = document.getElementById('level5');
    const gunshot = document.getElementById('gunshot');
    const stage3MilestoneSound = new Audio("https://thedailyarc.did.life/image-bin/uploads/1dc148e63f09d9da297c3759bc662a5b.mpga");
    const stage2MilestoneSound = new Audio("https://thedailyarc.did.life/image-bin/uploads/7fd22dc05872f9c8aa966bdc61979e45.mpga");
    const siren = document.getElementById('siren');
    const cheering = document.getElementById('cheering');
    const scratchSound = document.getElementById('scratch');
    const stage2DjMatchSound = new Audio("https://thedailyarc.did.life/image-bin/uploads/8072d0fbe82e5d4b926c5bb8edd47f6c.mpga");
    const stage3DjMatchSound = new Audio("https://thedailyarc.did.life/image-bin/uploads/e00d682e447bc02927b676794ca723f6.mpga");

    // DJ icon URLs for each stage
    const djIconUrlStage1 = 'https://thedailyarc.did.life/image-bin/uploads/dc0e7b76dbe5460a83627848ffa67e55.png';
    const djIconUrlStage2 = 'https://thedailyarc.did.life/image-bin/uploads/f739567a27e2c5350ae4333585808912.png';
    const djIconUrlStage3 = 'https://thedailyarc.did.life/image-bin/uploads/6d7c9298f50cb96f06976aff2b6539fd.png';

    // Stage Variables
    let currentStage = 1; // Start at Stage 1

    // Stage 1 Icons
    const stage1Icons = [
        'https://thedailyarc.did.life/image-bin/uploads/dc0e7b76dbe5460a83627848ffa67e55.png',
        'https://thedailyarc.did.life/image-bin/uploads/b0a756a008fe3a0422a195d0685faaee.png',
        'https://thedailyarc.did.life/image-bin/uploads/6f29d1bf54f0513d08b109a2cc30e37f.png',
        'https://thedailyarc.did.life/image-bin/uploads/d927c9c36f3d01dcdcf55ee29049a939.png',
        'https://thedailyarc.did.life/image-bin/uploads/b00ccc812160df472a783c63fea178c7.png'
    ];

    // Stage 2 Icons
    const stage2Icons = [
        'https://thedailyarc.did.life/image-bin/uploads/7f8698959a4ca815b039eb0eaf951201.png', // Rapper
        'https://thedailyarc.did.life/image-bin/uploads/e43e18d8fc6dcee4ea529fabc7b6d929.png', // Gold chain
        'https://thedailyarc.did.life/image-bin/uploads/74da8eb5c44f1cf8dac65b4792129620.png', // Break dancer
        'https://thedailyarc.did.life/image-bin/uploads/f739567a27e2c5350ae4333585808912.png', // DJ
        'https://thedailyarc.did.life/image-bin/uploads/6e52d211faa427eb8f68ab8287714da5.png'  // Spray can
    ];

    // Stage 3 Icons
    const stage3Icons = [
        'https://thedailyarc.did.life/image-bin/uploads/2e43097c81055f7dd5cfe1ced2317432.png', // Rapper
        'https://thedailyarc.did.life/image-bin/uploads/b2a75b7c61c204b04cb1eac820cda6f6.png', // Yo Hat
        'https://thedailyarc.did.life/image-bin/uploads/2881652408fc72939d3e11c4191e4be2.png', // Breaker
        'https://thedailyarc.did.life/image-bin/uploads/4fc57bd989eec395e9b3907f40f3a420.png', // Spray Can
        'https://thedailyarc.did.life/image-bin/uploads/6d7c9298f50cb96f06976aff2b6539fd.png'  // DJ
    ];

    // Current icons in use
    let imageUrls = [...stage1Icons];

    let score = 0;
    const width = 8;
    const elements = [];

    let firstClick = null;
    let gameActive = false;
    let currentLevel = 1;
    let timer;
    const milestoneScores = [50, 125, 225, 350, 500];

    function startGame() {
        document.getElementById("black-overlay").style.display = "none"; // Ensure black overlay is hidden on restart
        document.getElementById("police-lights").style.display = "none"; // Hide police lights
        document.body.className = "stage1"; // Set background to stage1 by default
        score = 0;
        currentLevel = 1;
        currentStage = 1;
        scoreDisplay.textContent = score;
        gameActive = true;
    
        startButton.style.display = 'none';
        restartButton.style.display = 'none';
        restartBottom.style.display = 'none';
        restartGameOver.style.display = 'none';
        nextStageButton.style.display = 'none'; 
        gameBoard.style.display = 'grid';
        winMessage.style.display = 'none';
        gameOverMessage.style.display = 'none';
    
        stopAllAudio();
    
        // Set the icons and background for Stage 1
        imageUrls = [...stage1Icons];
        updateBackground();
    
        createBoard();
        startLevel(currentLevel);
    }

    function startLevel(level) {
        playLevelAudio(level);
        resetTimer();
    }

    function playLevelAudio(level) {
        stopAllAudio();  // Ensure all audio stops before playing the next level
    
        if (currentStage === 1) {
            if (level === 1) level1.play();
            else if (level === 2) level2.play();
            else if (level === 3) level3.play();
            else if (level === 4) level4.play();
            else if (level === 5) level5.play();
        } else if (currentStage === 2) {
            const stage2Level = document.getElementById(`stage2-level${level}`);
            if (stage2Level) stage2Level.play();
        } else if (currentStage === 3) {
            const stage3Level = document.getElementById(`stage3-level${level}`);
            if (stage3Level) stage3Level.play();
        }
    }
    
    function stopAllAudio() {
        level1.pause(); level1.currentTime = 0;
        level2.pause(); level2.currentTime = 0;
        level3.pause(); level3.currentTime = 0;
        level4.pause(); level4.currentTime = 0;
        level5.pause(); level5.currentTime = 0;
    
        const stage2Levels = [
            document.getElementById('stage2-level1'),
            document.getElementById('stage2-level2'),
            document.getElementById('stage2-level3'),
            document.getElementById('stage2-level4'),
            document.getElementById('stage2-level5')
        ];
    
        stage2Levels.forEach(level => {
            if (level) {
                level.pause();
                level.currentTime = 0;
            }
        });

        const stage3Levels = [
            document.getElementById('stage3-level1'),
            document.getElementById('stage3-level2'),
            document.getElementById('stage3-level3'),
            document.getElementById('stage3-level4'),
            document.getElementById('stage3-level5')
        ];
        
        stage3Levels.forEach(level => {
            if (level) {
                level.pause();
                level.currentTime = 0;
            }
        });
    }

    function resetTimer() {
        clearTimeout(timer);
        
        // Set timer based on the current stage
        let timeLimit;
        if (currentStage === 2) {
            timeLimit = 30000; // 20 seconds for Stage 2
        } else if (currentStage === 3) {
            timeLimit = 15000; // 15 seconds for Stage 3
        } else {
            timeLimit = 35000; // Default 30 seconds for other stages
        }
    
        // Start timer with the adjusted time limit
        timer = setTimeout(() => {
            if (score < milestoneScores[currentLevel - 1]) {
                endGame();
            }
        }, timeLimit);
    }
    

    function endGame() {
        gameActive = false;
        stopAllAudio();
        document.getElementById("siren").play(); // Play siren sound for added effect
        document.getElementById("police-lights").style.display = "block"; // Show police lights
        gameBoard.style.display = 'none';
        gameOverMessage.style.display = 'block';
        restartGameOver.style.display = 'block';
        document.body.classList.add("game-over");
    }

    function createBoard() {
        gameBoard.innerHTML = ''; // Clear the grid
        elements.length = 0;
    
        for (let i = 0; i < width * width; i++) {
            const element = document.createElement('div');
            const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
            element.classList.add('element');
            element.style.backgroundImage = `url(${randomImage})`;
            element.style.backgroundSize = 'cover';
            element.setAttribute('data-id', i);
            element.addEventListener('click', () => handleElementClick(element));
            gameBoard.appendChild(element);
            elements.push(element);
        }
    }
        
    function handleElementClick(element) {
        console.log("Icon clicked:", element); // Check if this logs on click
    
        if (!firstClick && gameActive) {
            firstClick = element;
            element.classList.add('selected');
        } else if (gameActive) {
            swapElements(firstClick, element);
            firstClick.classList.remove('selected');
            firstClick = null;
            setTimeout(checkMatches, 200);
        }
    }
    

    function swapElements(el1, el2) {
        const bgImage1 = el1.style.backgroundImage;
        el1.style.backgroundImage = el2.style.backgroundImage;
        el2.style.backgroundImage = bgImage1;
    }

    function checkMatches() {
        let matchFound = false;

        const currentDjIconUrl = currentStage === 1 ? djIconUrlStage1 :
                                 currentStage === 2 ? djIconUrlStage2 : djIconUrlStage3;

        // Check for horizontal matches
        for (let i = 0; i < elements.length; i++) {
            const isRowEnd = (i % width) > (width - 3);
            if (!isRowEnd &&
                elements[i].style.backgroundImage &&
                elements[i + 1] && elements[i + 2] &&
                elements[i].style.backgroundImage === elements[i + 1].style.backgroundImage &&
                elements[i].style.backgroundImage === elements[i + 2].style.backgroundImage) {

                if (elements[i].style.backgroundImage.includes(currentDjIconUrl)) {
                    if (currentStage === 3) {
                        stage3DjMatchSound.play(); // Play the Stage 3 DJ match sound
                    } else if (currentStage === 2) {
                        stage2DjMatchSound.play(); // Play the Stage 2 DJ match sound
                    } else {
                        scratchSound.play(); // Play the default scratch sound
                    }
                }

                addGlowEffect(elements[i], elements[i + 1], elements[i + 2]);
                displayScoreEffect(elements[i]);
                matchFound = true;
            }
        }

        // Check for vertical matches
        for (let i = 0; i < elements.length - (2 * width); i++) {
            if (elements[i].style.backgroundImage &&
                elements[i + width] && elements[i + (2 * width)] &&
                elements[i].style.backgroundImage === elements[i + width].style.backgroundImage &&
                elements[i].style.backgroundImage === elements[i + (2 * width)].style.backgroundImage) {

                if (elements[i].style.backgroundImage.includes(currentDjIconUrl)) {
                    if (currentStage === 3) {
                        stage3DjMatchSound.play(); // Play the Stage 3 DJ match sound
                    } else if (currentStage === 2) {
                        stage2DjMatchSound.play(); // Play the Stage 2 DJ match sound
                    } else {
                        scratchSound.play(); // Play the default scratch sound
                    }
                }

                addGlowEffect(elements[i], elements[i + width], elements[i + (2 * width)]);
                displayScoreEffect(elements[i]);
                matchFound = true;
            }
        }

        if (matchFound) {
            score += 10;
            scoreDisplay.textContent = score;
            setTimeout(() => {
                applyGravity();
                refillBoard();
            }, 500);
            checkAudioLevel();
            checkForWin();
        }
    }

    function addGlowEffect(...elementsToGlow) {
        elementsToGlow.forEach(element => {
            element.classList.add('glow');
            setTimeout(() => {
                element.classList.remove('glow');
                clearElement(element);
            }, 500);
        });
    }

    function clearElement(element) {
        element.style.backgroundImage = 'none';
        element.classList.add('empty');
    }

    function applyGravity() {
        for (let i = elements.length - 1; i >= width; i--) {
            if (elements[i].classList.contains('empty')) {
                for (let j = i - width; j >= 0; j -= width) {
                    if (!elements[j].classList.contains('empty')) {
                        elements[i].style.backgroundImage = elements[j].style.backgroundImage;
                        elements[i].classList.remove('empty');
                        elements[j].classList.add('empty');
                        elements[j].style.backgroundImage = 'none';
                        break;
                    }
                }
            }
        }
    }

    function refillBoard() {
        elements.forEach((element, index) => {
            if (element.classList.contains('empty')) {
                const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
                element.style.backgroundImage = `url(${randomImage})`;
                element.classList.remove('empty');
            }
        });
    }

    function displayScoreEffect(element) {
        const rect = element.getBoundingClientRect();
        const scoreEffect = document.createElement('div');
        scoreEffect.classList.add('score-effect');
        scoreEffect.textContent = "+10";
        scoreEffect.style.position = 'absolute';
        scoreEffect.style.left = `${rect.left + rect.width / 2}px`;
        scoreEffect.style.top = `${rect.top + rect.height / 2}px`;
        document.body.appendChild(scoreEffect);

        setTimeout(() => {
            scoreEffect.remove();
        }, 1000);
    }

    function checkAudioLevel() {
        if (score >= milestoneScores[currentLevel - 1] && currentLevel < milestoneScores.length) {
            currentLevel++;
            clearTimeout(timer);
    
            stopAllAudio();
    
            // Play the milestone sound specific to each stage
            if (currentStage === 3) {
                stage3MilestoneSound.play();
            } else if (currentStage === 2) {
                stage2MilestoneSound.play();
            } else {
                gunshot.play(); // Default milestone sound for other stages
            }
    
            // Continue to the next level after the sound ends
            (currentStage === 3 ? stage3MilestoneSound : 
             currentStage === 2 ? stage2MilestoneSound : gunshot).onended = () => {
                resetTimer();
                startLevel(currentLevel);
            };
        }
    }
    
    function checkForWin() {
        if (score >= 500) {  // Temporary win score set to 50 for testing
            if (currentStage < 3) {
                gameActive = false;
                clearTimeout(timer);
                stopAllAudio();
                gunshot.play();
    
                gunshot.onended = () => {
                    document.getElementById("black-overlay").style.display = "block"; 
                    cheering.play();
                    setTimeout(() => {
                        winMessage.style.display = 'block';
                        nextStageButton.style.display = 'block';
                        restartBottom.style.display = 'none';
                        if (currentStage === 2) {
                            nextStageButton.textContent = "Next Stage";
                        }
                    }, 500);
                };
    
                gameBoard.style.display = 'none';
            } else {
                gameActive = false;
                clearTimeout(timer);
                stopAllAudio();
    
                gunshot.play();
                gunshot.onended = () => {
                    document.getElementById("black-overlay").style.display = "block"; 
                    cheering.play();
                };
    
                gameBoard.style.display = 'none';
                winMessage.style.display = 'block';
                nextStageButton.style.display = 'none';
                restartBottom.style.display = 'block';
                document.body.classList.add("game-over");
            }
        }
    }
    

    function updateBackground() {
        if (currentStage === 1) {
            document.body.classList.remove('stage2', 'stage3');
            document.body.classList.add('stage1');
            document.body.style.backgroundImage = "url('https://thedailyarc.did.life/image-bin/uploads/ef1495a72127dd16edbc55d54ea9bf2f.webp')";
        } else if (currentStage === 2) {
            document.body.classList.remove('stage1', 'stage3');
            document.body.classList.add('stage2');
            document.body.style.backgroundImage = "url('https://thedailyarc.did.life/image-bin/uploads/8fdd27951cc3c04578c332fbfd5910d7.jpeg')";
        } else if (currentStage === 3) {
            document.body.classList.remove('stage1', 'stage2');
            document.body.classList.add('stage3');
            document.body.style.backgroundImage = "url('https://thedailyarc.did.life/image-bin/uploads/4084da23d2737d7918d47ede1ea8e3fd.webp')";
        }
    }

    function startStage2() {
        console.log("Starting Stage 2");
    
        currentStage = 2;
        document.getElementById("black-overlay").style.display = "none";
    
        stopAllAudio();
    
        imageUrls = [...stage2Icons];
        updateBackground();
    
        score = 0;
        scoreDisplay.textContent = score;
        currentLevel = 1;
        firstClick = null;
        gameActive = true;
    
        gameBoard.innerHTML = '';
        gameBoard.style.display = 'grid';
    
        createBoard();
        startLevel(currentLevel);
    }

    function startStage3() {
        console.log("Starting Stage 3");
    
        currentStage = 3;
        document.getElementById("black-overlay").style.display = "none";
    
        stopAllAudio();
    
        imageUrls = [...stage3Icons];
        updateBackground();
    
        score = 0;
        scoreDisplay.textContent = score;
        currentLevel = 1;
        firstClick = null;
        gameActive = true;
    
        gameBoard.innerHTML = '';
        gameBoard.style.display = 'grid';
    
        createBoard();
        startLevel(currentLevel);
    }

    startButton.addEventListener('click', startGame);
    nextStageButton.addEventListener('click', () => {
        winMessage.style.display = 'none';
        if (currentStage === 1) startStage2();
        else if (currentStage === 2) startStage3();
    });
    restartBottom.addEventListener('click', startGame);
    restartGameOver.addEventListener('click', startGame);

    gameBoard.style.display = 'none';
    restartButton.style.display = 'none';
});
