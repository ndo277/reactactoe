import React from 'react';
import Board from './board.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        moveLoc: null
      }],
      xIsNext: true,
      stepNumber: 0
    }
  }

  // where does 'step' come from?
  jumpToAndBold(e, step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
    let btns = document.getElementsByClassName("history-btn");
    Array.from(btns).map(btn => btn.style.fontWeight = 'normal')
    e.target.style.fontWeight = 'bold';
  }

  // is 'i' the event obj?
  // 'i' seems to be specifying the index from the squares array?
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const lastMoveLoc = determineMoveLocation(i);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        moveLoc: lastMoveLoc
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });

  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // 'move' parameter seems to be specifying the move number?
    // shouldn't 'move' be obj of {squares:..., moveLoc:...}?
    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move + " " + history[move].moveLoc :
        'Go to game start';
      return (
        <li key={move}>
          <button className="history-btn" onClick={(e) =>
            this.jumpToAndBold(e, move)
          }>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">

          <div className="col">
            <div> </div>
            <div>A</div>
            <div>B</div>
            <div>C</div>
          </div>

          <div className="row-squares">

            <div className="row">
              <div>D</div>
              <div>E</div>
              <div>F</div>
            </div>

            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
            />
          </div>

        </div>


        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function determineMoveLocation(index) {
  switch (index) {
    case 0:
      return "(A,D)";
    case 1:
      return "(B,D)";
    case 2:
      return "(C,D)";
    case 3:
      return "(A,E)";
    case 4:
      return "(B,E)";
    case 5:
      return "(C,E)";
    case 6:
      return "(A,F)";
    case 7:
      return "(B,F)";
    case 8:
      return "(C,F)";
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default Game;