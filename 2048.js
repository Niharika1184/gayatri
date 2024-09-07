document.addEventListener('DOMContentLoaded', () =>  {
  const gridDisplay = document.querySelector('.grid') 
  const scoreDisplay = document.getElementById('score')
  const resultDisplay = document.getElementById('result')
  const width = 4
  let squares = []
  let score = 0

  function createBoard() {
      for (let i = 0; i < width * width; i++) {
          let square = document.createElement('div')
          square.innerHTML = 0
          gridDisplay.appendChild(square)
          squares.push(square)
      }
      generate()
      generate()
  }
  createBoard()

  
  function generate() {
      let randomNumber = Math.floor(Math.random() * squares.length)
      if (squares[randomNumber].innerHTML == 0) {
          squares[randomNumber].innerHTML = 2
          checkForGameOver()
      } else {
          generate()  
      }
  }


  function moveRight() { 
      for (let i = 0; i < 16; i += 4) {
          let row = [squares[i], squares[i+1], squares[i+2], squares[i+3]].map(square => parseInt(square.innerHTML))
          let newRow = row.filter(num => num).concat(Array(4 - row.filter(num => num).length).fill(0))
          for (let j = 0; j < 4; j++) squares[i+j].innerHTML = newRow[j]
      }
  }

 
  function moveLeft() {
      for (let i = 0; i < 16; i += 4) {
          let row = [squares[i], squares[i+1], squares[i+2], squares[i+3]].map(square => parseInt(square.innerHTML))
          let newRow = Array(4 - row.filter(num => num).length).fill(0).concat(row.filter(num => num))
          for (let j = 0; j < 4; j++) squares[i+j].innerHTML = newRow[j]
      }
  }


  function moveUp() {
      for (let i = 0; i < 4; i++) {
          let column = [squares[i], squares[i+width], squares[i+width*2], squares[i+width*3]].map(square => parseInt(square.innerHTML))
          let newColumn = column.filter(num => num).concat(Array(4 - column.filter(num => num).length).fill(0))
          for (let j = 0; j < 4; j++) squares[i+width*j].innerHTML = newColumn[j]
      }
  }

 
  function moveDown() {
      for (let i = 0; i < 4; i++) {
          let column = [squares[i], squares[i+width], squares[i+width*2], squares[i+width*3]].map(square => parseInt(square.innerHTML))
          let newColumn = Array(4 - column.filter(num => num).length).fill(0).concat(column.filter(num => num))
          for (let j = 0; j < 4; j++) squares[i+width*j].innerHTML = newColumn[j]
      }
  }


  function combineRow() {
      for (let i = 0; i < 15; i++) {
          if (squares[i].innerHTML === squares[i+1].innerHTML) {
              let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML)
              squares[i].innerHTML = combinedTotal
              squares[i+1].innerHTML = 0
              score += combinedTotal
              scoreDisplay.innerHTML = score
          }
      }
      checkForWin()
  }

  function combineColumn() {
      for (let i = 0; i < 12; i++) {
          if (squares[i].innerHTML === squares[i+width].innerHTML) {
              let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML)
              squares[i].innerHTML = combinedTotal
              squares[i+width].innerHTML = 0
              score += combinedTotal
              scoreDisplay.innerHTML = score
          }
      }
      checkForWin()
  }

  
  function control(e) {
      if(e.keyCode === 37) {
          moveLeft()
          combineRow()
          moveLeft()
          generate()
      } else if (e.keyCode === 38) {
          moveUp()
          combineColumn()
          moveUp()
          generate()
      } else if (e.keyCode === 39) {
          moveRight()
          combineRow()
          moveRight()
          generate()
      } else if (e.keyCode === 40) {
          moveDown()
          combineColumn()
          moveDown()
          generate()
      }
  }
  document.addEventListener('keyup', control)

 
  function checkForWin() {
      if (squares.some(square => square.innerHTML == 2048)) {
          resultDisplay.innerHTML = 'You WIN'
          document.removeEventListener('keyup', control)
      }
  }

  
  function checkForGameOver() {
      if (!squares.some(square => square.innerHTML == 0)) {
          resultDisplay.innerHTML = 'You LOSE'
          document.removeEventListener('keyup', control)
      }
  }


  function addColours() {
      squares.forEach(square => {
          switch(square.innerHTML) {
              case '0': square.style.backgroundColor = '#afa192'; break;
              case '2': square.style.backgroundColor = '#00FFFF'; break;
              case '4': square.style.backgroundColor = '#ede0c8'; break;
              case '8': square.style.backgroundColor = '#f2b179'; break;
              case '16': square.style.backgroundColor = '#FFC0CB'; break;
              case '32': square.style.backgroundColor = '#008000'; break;
              case '64': square.style.backgroundColor = '#87CEEB'; break;
              case '128': square.style.backgroundColor = '#800080'; break;
              case '256': square.style.backgroundColor = '#ead79c'; break;
              case '512': square.style.backgroundColor = '#76daff'; break;
              case '1024': square.style.backgroundColor = '#beeaa5'; break;
              case '2048': square.style.backgroundColor = '#d7d4f0'; break;
          }
      })
  }
  setInterval(addColours, 50)
})


