import React, { Component } from 'react';

import Square from './square';
import SelectButton from './selectbutton';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myTurn: '',
      selected: '',
      step: 0,
      squares: Array(9).fill(null)
    };
    this.selectTurn = this.selectTurn.bind(this);
    this.compTurn = this.compTurn.bind(this);
    this.reset = this.reset.bind(this);
    this.checkForWin = this.checkForWin.bind(this);
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />
  }

  selectTurn(turn) {
    if (!this.state.step) {
      this.setState({ selected: turn }, () => {
        if (this.state.selected == 'O') {
          this.compTurn();
        } else {
          this.setState({ myTurn: true });
        }
      });
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    const { step, myTurn, selected } = this.state;

    if (myTurn && !squares[i] && step <= 9) {
      squares[i] = selected;
      this.setState({
        squares: squares,
        myTurn: false,
        step: step + 1
      }, this.compTurn);
    }
  }

  compTurn() {
    const randNum = Math.floor(Math.random() * 9);
    const squares = this.state.squares.slice();
    const { selected, step } = this.state;

    if (!squares[randNum] && step <= 9) {
      squares[randNum] = selected == 'X' ? 'O' : 'X';
      this.setState({
        squares: squares,
        myTurn: true,
        step: step + 1
      });
    }
    else if (squares[randNum] && step < 9) {
      this.compTurn();
    }

  }

  reset() {
    this.setState({
      myTurn: '',
      selected: '',
      step: 0,
      squares: Array(9).fill(null)
    });
  }

  checkForWin(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  render() {
    // console.log("My turn:", this.state.selected);
    // console.log('Squares:', this.state.squares);
    console.log('step:', this.state.step);
    const { step } = this.state;
    const winner = this.checkForWin(this.state.squares);
    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    }
    else if (!winner & step === 9) {
      status = 'Draw!';
    }
    return(
      <div className='container'>
        <h1>Tic Tac Toe</h1>
        <div>
          {status}
        </div>
        <div className='board'>
          <div className='board-row'>
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>

          <div className='board-row'>
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>

          <div className='board-row'>
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        <h4>Select:</h4>
        <div className='select-group'>
          <SelectButton
            value='X'
            onClick={() => this.selectTurn('X')}
            selectedTurn={this.state.selected}
          />
          <SelectButton
            value='O'
            onClick={() => this.selectTurn('O')}
            selectedTurn={this.state.selected}
          />
        </div>
        <button className='reset-button btn btn-default'
          onClick={this.reset}>Reset</button>
      </div>
    )
  }
}
