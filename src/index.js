import "./styles.css";

document.getElementById("board").innerHTML = `
<h3>Welcome to the Oldie Goldie</h3>
<h1>Tic Tac Toe Game</h1>
<h6><em>GAME RULES: </em> First player is <em>Player A</em>. Second Player is <em>Player B</em>. Player A gets the mark <em>"X"</em> and Player B gets the mark <em>"O"</em>.</h6>
<h4 id="game_state"> To start the Game Click on a box in the game board</h4>
<h4 id="game_timer"> Game Timer: </h4>
<div id="progress-bar-container">
  <div id="progress-bar"></div>
</div>
<h5 id="game_result"></h5>
<div>
  <table>
    <tr>
      <td id="1"></td>
      <td id="2"></td>
      <td id="3"></td>
      <td id="4"></td>
      <td id="5"></td>
    </tr>
    <tr>
      <td id="6"></td>
      <td id="7"></td>
      <td id="8"></td>
      <td id="9"></td>
      <td id="10"></td>
    </tr>
    <tr>
      <td id="11"></td>
      <td id="12"></td>
      <td id="13"></td>
      <td id="14"></td>
      <td id="15"></td>
    </tr>
    <tr>
      <td id="16"></td>
      <td id="17"></td>
      <td id="18"></td>
      <td id="19"></td>
      <td id="20"></td>
    </tr>
    <tr>
      <td id="21"></td>
      <td id="22"></td>
      <td id="23"></td>
      <td id="24"></td>
      <td id="25"></td>
    </tr>
  </table>
</div>
`;

var i;
var bol = false;
var gameStarted = false;
var gameEnded = false;
var gameTimer;

setInterval(function () {}, 5000);

/*
function automaticGameStateChange(b) {
	var intervalCount = 0;
	var intervalChange = setInterval(function(){
		console.log("boolean passed to interval " + b);
		intervalCount++;
		if(intervalCount === 1) clearInterval(intervalChange);
	}, 10000);
}
*/

for (i = 1; i < 26; i++) {
  document.getElementById(i).addEventListener("click", function () {
    clickHandler.bind(this)();
  });
}

function setGameState(player) {
  var status = "GAME CONTINUES: Player " + player + " takes the next turn!";
  document.getElementById("game_state").innerHTML = status;
}

function checkSmallArrayForX(arr) {
  var i;
  var result = false;
  var count = 0;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === "X") count++;
  }
  if (count === 5) result = true;
  return result;
}
function checkSmallArrayForO(arr) {
  var i;
  var result = false;
  var count = 0;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === "O") count++;
  }
  if (count === 5) result = true;
  return result;
}

function checkResult() {
  var finalResult = "";

  var i;
  var valsArr = [];
  var rowArrs = [];
  var col1, col2, col3, col4, col5;
  var col1Arr = [],
    col2Arr = [],
    col3Arr = [],
    col4Arr = [],
    col5Arr = [];
  var colArrs;
  var leftDia, rightDia;
  var leftDiaArr = [],
    rightDiaArr = [];
  var diaArrs;
  var gameProgressCount = 1;
  var gameProgressPercentage = 0;

  for (i = 1; i < 26; i++) {
    valsArr.push(document.getElementById(i).innerHTML);
  }

  for (i = 0; i < 25; i++) {
    if (valsArr[i] === "X" || valsArr[i] === "O") {
      gameProgressCount++;
    }
  }

  if (gameProgressCount > 25) {
    gameProgressCount--;
  }

  gameProgressPercentage = (gameProgressCount / 25) * 100;

  document.getElementById("progress-bar").style.width =
    gameProgressPercentage.toString() + "%";

  rowArrs.push(valsArr.slice(0, 5));
  rowArrs.push(valsArr.slice(5, 10));
  rowArrs.push(valsArr.slice(10, 15));
  rowArrs.push(valsArr.slice(15, 20));
  rowArrs.push(valsArr.slice(20, 25));

  col1 = [0, 5, 10, 15, 20];
  col2 = [1, 6, 11, 16, 21];
  col3 = [2, 7, 12, 17, 22];
  col4 = [3, 8, 13, 18, 23];
  col5 = [4, 9, 14, 19, 24];

  for (i = 0; i < 5; i++) {
    col1Arr.push(valsArr[col1[i]]);
    col2Arr.push(valsArr[col2[i]]);
    col3Arr.push(valsArr[col3[i]]);
    col4Arr.push(valsArr[col4[i]]);
    col5Arr.push(valsArr[col5[i]]);
  }

  colArrs = [col1Arr, col2Arr, col3Arr, col4Arr, col5Arr];

  leftDia = [0, 6, 12, 18, 24];
  rightDia = [4, 8, 12, 16, 20];

  for (i = 0; i < 5; i++) {
    leftDiaArr.push(valsArr[leftDia[i]]);
    rightDiaArr.push(valsArr[rightDia[i]]);
  }

  diaArrs = [leftDiaArr, rightDiaArr];

  for (i = 0; i < 5; i++) {
    if (checkSmallArrayForX(rowArrs[i])) {
      finalResult = "Player A won the game!";
      gameEnded = true;
    }
    if (checkSmallArrayForO(rowArrs[i])) {
      finalResult = "Player B won the game!";
      gameEnded = true;
    }
    if (checkSmallArrayForX(colArrs[i])) {
      finalResult = "Player A won the game!";
      gameEnded = true;
    }
    if (checkSmallArrayForO(colArrs[i])) {
      finalResult = "Player B won the game!";
      gameEnded = true;
    }
  }

  for (i = 0; i < 2; i++) {
    if (checkSmallArrayForX(diaArrs[i])) {
      finalResult = "Player A won the game!";
      gameEnded = true;
    }
    if (checkSmallArrayForO(diaArrs[i])) {
      finalResult = "Player B won the game!";
      gameEnded = true;
    }
  }

  document.getElementById("game_result").innerHTML = finalResult;
}

function switchPlayer() {
  if (!bol) {
    bol = true;
    return;
  }
  if (bol) {
    bol = false;
    return;
  }
}

function startTheTimer() {
  document.getElementById(
    "game_timer"
  ).innerHTML = ` Game Timer: Next player has 10 seconds to make a move!`;
  gameTimer = setInterval(function () {
    if (gameTimer) {
      switchPlayer();
      clearInterval(gameTimer);
      document.getElementById(
        "game_timer"
      ).innerHTML = `Game Timer: Player Switched because of not making a move!`;
    }
  }, 10000);
}

function clickHandler() {
  if (!bol) {
    if (gameTimer) clearInterval(gameTimer);
    gameStarted = true;
    checkResult();
    setGameState("B");
    this.innerHTML = `X`;
    this.style.backgroundColor = "rgb(124, 252, 0)";
    switchPlayer();
    startTheTimer();
    return;
  } else {
    if (gameTimer) clearInterval(gameTimer);
    checkResult();
    setGameState("A");
    this.innerHTML = `O`;
    this.style.backgroundColor = "rgb(250, 128, 114)";
    switchPlayer();
    startTheTimer();
    return;
  }
}
