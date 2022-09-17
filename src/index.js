const playerTurn = document.getElementById("playerTurn");
const gameContainer = document.getElementById("gameContainer")
const gameReset = document.getElementById("gameReset")

gameState = ["", "", "", "", "", "", "", "", ""],
rightMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ],

  winner = () => `El jugador ${currentPlayer} ha ganado!`,
  finished = () => `El juego ha terminado en empate!`,
  turnGame = () => `Turno del jugador ${currentPlayer}`

let gameActive = true,
  currentPlayer = "O"

function main() {
  handleStatusDisplay(turnGame())
  listeners()
}
function listeners() {
    gameContainer.addEventListener('click',positionClick);
    gameReset.addEventListener('click',resetPositionClick);
}
function positionClick(clickedCellEvent ) {
    const clickedCell = clickedCellEvent.target
    if (clickedCell.classList.contains('game-cell')) {
      const clickedCellIndex = Array.from(clickedCell.parentNode.children).indexOf(clickedCell)
      if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return false
      }
      handleCellPlayed(clickedCell, clickedCellIndex)
      handleResultValidation()
    }
  }
function handleStatusDisplay(message) {
    playerTurn.innerHTML = message
}
function resetPositionClick() {
  gameActive = true
  currentPlayer = "X"
  restartGameState()
  handleStatusDisplay(turnGame())
  document.querySelectorAll('.game-cell').forEach(cell => cell.innerHTML = "")
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer 
  clickedCell.innerHTML = currentPlayer 
}

function handleResultValidation() {
  let roundWon = false
  for (let i = 0; i < rightMoves.length; i++) { 
    const winCondition = rightMoves[i]
    let position1 = gameState[winCondition[0]],
      position2 = gameState[winCondition[1]],
      position3 = gameState[winCondition[2]] 

    if (position1 === '' || position2 === '' || position3 === '') {
      continue; 
    }
    if (position1 === position2 && position2 === position3) {
      roundWon = true 
      break
    }
  }

  if (roundWon) {
    handleStatusDisplay(winner())
    gameActive = false
    return
  }

  let roundDraw = !gameState.includes("") 
  if (roundDraw) {
    handleStatusDisplay(finished())
    gameActive = false
    return
  }
  handlePlayerChange()
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X"
  handleStatusDisplay(turnGame())
}

function restartGameState() {
  let i = gameState.length
  while (i--) {
    gameState[i] = ''
  }
}
main()