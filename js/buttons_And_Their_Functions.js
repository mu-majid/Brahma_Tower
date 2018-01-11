function flip(current_page, target_page) {
    for (var i = 1; i < 7; i++) {
        document.getElementById("page" + i).style.display = "none";
    }
    document.getElementById("page" + target_page).style.display = "";
}


//////////////////////////////////////////////////////////////
//////// All Clickables On All Pages As A Global Object///////

var clickables = {
    page1: {
        SubmitBtn: document.getElementById("submitBtn")
    },

    page2: {
        StartBtn: document.getElementById("startButton")
    },

    page3: {
        mainMenuBtn: document.getElementById("mainMenuBtn"),
        skipButton: document.getElementById("skipBtn")
    },

    page4: {
        easy: document.getElementById("easy"),
        average: document.getElementById("average"),
        hard: document.getElementById("hard"),
        insane: document.getElementById("insane"),
        mainMenuBtn4: document.getElementById("mainMenuButton4")

    },

    page5: {
        charmander: document.getElementById("charmander"),
        pikachu: document.getElementById("pikachu"),
        bulbasaur: document.getElementById("bulbasaur"),
        squirtle: document.getElementById("squirtle"),
        mainMenuButton: document.getElementById("mainMenuButton01")


    },

    page6: {
        movesDiv: document.getElementById("moves"),
        tower0: document.getElementById("tower-1"),
        tower1: document.getElementById("tower-2"),
        tower2: document.getElementById("tower-3"),
        restartBtn: document.getElementById("restartButton"),
        mainMenuBtn6: document.getElementById("mainMenuButton6")
    }
};
var globalElements = {
    yourcharacter: document.getElementById("yourCharacter"),
    first: document.getElementById("first"),
    nearopt: document.getElementById("nearopt"),
    optimum: document.getElementById("optimum"),
    insane: document.getElementById("insane")
};
//////////////////////////////////////////////////////////////
//////////////////// Game Instance///////////////////////////
var newGame;

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//// Buttons' Functions
function onclickAttrIntializer() {
    /*
    sets the click events to all the
    clickables in our game in the HTML file
    */
    clickables.page1.SubmitBtn.addEventListener('click', Submit_btn);
    clickables.page2.StartBtn.addEventListener('click', Start_btn);
    clickables.page3.mainMenuBtn.addEventListener('click', mainMenu_btn);
    clickables.page3.skipButton.addEventListener('click', skip_btn);
    clickables.page4.easy.addEventListener('click', difficulty);
    clickables.page4.average.addEventListener('click', difficulty);
    clickables.page4.hard.addEventListener('click', difficulty);
    clickables.page4.insane.addEventListener('click', difficulty);
    clickables.page4.mainMenuBtn4.addEventListener('click', mainMenu_btn);
    clickables.page5.pikachu.addEventListener('click', character);
    clickables.page5.charmander.addEventListener('click', character);
    clickables.page5.bulbasaur.addEventListener('click', character);
    clickables.page5.squirtle.addEventListener('click', character);
    clickables.page5.mainMenuButton.addEventListener('click', mainMenu_btn);
    clickables.page6.mainMenuBtn6.addEventListener('click', mainMenu_btn);
    clickables.page6.restartBtn.addEventListener('click', restart_btn);
    clickables.page6.tower0.addEventListener('click', handleTowers);
    clickables.page6.tower1.addEventListener('click', handleTowers);
    clickables.page6.tower2.addEventListener('click', handleTowers);
}
//page 1
function Submit_btn(e) {
    /*
    takes only one parameter, which is the calling event.
    This button will validate the username,
    store it in a global session object and
    switch to page2.
    */

    // body...
    function validateName(IdForTextInput) {
        var content = document.getElementById(IdForTextInput).value;
        var pattern = new RegExp("^[a-zA-Z]{3,15}$");
        return pattern.test(content);
    }
    e.preventDefault();
    if (!validateName("playerName")) {
        alert("too short");
    } else {
        flip(0, 2);
    }

}

///////////////////////////////////
// page 2
function Start_btn(e) {
    /*
    takes only one parameter, which is the calling event.
    Switch to page 3
    */

    // body...
    flip(0,3);
}

// page 3
function mainMenu_btn() {
    /*
    takes only one parameter, which is the calling event.
    takes only one parameter, which is the calling event.
    switch to page2
    */
    flip(0, 2);
}

function skip_btn() {
    /*
    switch to page4
    */
    flip(0, 4);
}

////////////////////////////////
// page 4

function difficulty(e) {
    /*
    takes only one parameter, which is the calling event.
    it will set the difficulty variable depending on the id of the object calling the event.
    1=easy, 2=average, 3=hard, 4=instane.
    after this it will switch to page5
    */

    // body...
    var levelOfDifficulty = e.currentTarget.getAttribute("id");
        switch (levelOfDifficulty) {
        case "easy":
            level = EASY;
            break;
        case "average":
            level = AVERAGE;
            break;
        case "hard":
            level = HARD;
            break;
        case "insane":
            level = INSANE;
            break;
    }
    flip(0,5);


}

//////////////////////////////////
// page 5
function character(e) {
    /*
    takes only one parameter, which is the calling event.
    it will the the global character of the game depending on the id of the calling object. the is should be one of the following charmander, pikachu, bulbasaur, squirtle.
    after this it switches to page6, the actual game.
    */

    // body...
    var target = e.target.id;
    var targetsrc = e.target.src;
    // globalElements.yourcharacter
    switch (target) {
        case "charmander":
            globalElements.yourcharacter.src = targetsrc;
            break;
        case "pikachu":
            globalElements.yourcharacter.src = targetsrc;
            break;
        case "bulbasaur":
            globalElements.yourcharacter.src = targetsrc;
            break;
        case "squirtle":
            globalElements.yourcharacter.src = targetsrc;
            break;

    }
    init();
    flip(0, 6);
}

// function mainMenuButtonjj() {
//     flip(0, 2);
// }

//////////////////////////////////
// page 6
function movesDiv_func(argument) {
    // body...
}

function restart_btn() {
    init();
}



///////////////////Game Functions////////////
function handleTowers(e) {
    // handle the frontend of the towers and disc movements && check for isSolved() function
    var tower = e.currentTarget;
    var towerClickedValue = Number(tower.getAttribute("value"));
    var whichTowerClicked = newGame.whichTowerClicked;
    if (whichTowerClicked == null) {
        if (!newGame.isTowerEmpty(towerClickedValue)) {
            newGame.whichTowerClicked = towerClickedValue;
            whichTowerClicked = towerClickedValue;
            tower.lastChild.style.backgroundColor = "black";
        }
    } else {
        var firstClickedTower = clickables.page6["tower" + whichTowerClicked];
        var moves = Number(newGame.numberOfMoves) + 1;
        firstClickedTower.lastChild.style.backgroundColor = "#e4b326";
        var moveStatus = newGame.moveDisk(Number(whichTowerClicked), Number(towerClickedValue));
        clickables.page6.movesDiv.innerHTML = moves + " move(s)";
        if (moveStatus) {
            emptyTowers();
            drawDiscs();
        }
        //  else {
        //     $("ul").effect("shake");
        // }
        newGame.whichTowerClicked = null;
        if (newGame.isSolved()) {
            clickables.page6.movesDiv.innerHTML = "You won with " + moves + " moves!";
        }
    }
}

function init(argument) {
    // intialize towers in backend and call the drawDiscs function
    emptyTowers();
    clickables.page6.movesDiv.innerHTML = "0 move(s)";
    newGame = new Game(level);
    drawDiscs();
}

function emptyTowers() {
    // delete the html content of <ul> towers tags
    for (var i = 0; i < 3; i++) {
        clickables.page6["tower" + i].innerHTML = "";
    }
}

function drawDiscs() {
    // draw the discs according to handled backend
    emptyTowers();
    for (var i = 0; i < 3; i++) {
        if (!newGame.isTowerEmpty(i)) {
            for (var j = 0; j < newGame.towers[i].numberOfDisks; j++) {
                clickables.page6["tower" + i].innerHTML += "<li id='disc-" + newGame.towers[i].disks[j].width + "' value='" + newGame.towers[i].disks[j].width + "'></li>";
            }
        }
    }
}


