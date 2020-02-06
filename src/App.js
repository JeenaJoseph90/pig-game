import React from 'react';
import './App.css';
import { FiRefreshCw,FiArrowDownCircle,FiPlusCircle } from 'react-icons/fi';
import Player from './components/player.component';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      winCount: 100,
      diceCount1 : 1,
      diceCount2 : 1,
      players:[{
        name : 'Player 1',
        totalScore : 0,
        currentScore : 0,
        activePlayer : true,
        winner : false
      },
      {
        name : 'Player 2',
        totalScore : 0,
        currentScore : 0,
        activePlayer : false
      }],
      gameDisabled : false,
      winner : false
    }
  }

  newGame = ()=>{
    this.setState({
      winCount: 100,
      diceCount1 : 1,
      diceCount2 : 1,
      players:[{
        name : 'Player 1',
        totalScore : 0,
        currentScore : 0,
        activePlayer : true
      },
      {
        name : 'Player 2',
        totalScore : 0,
        currentScore : 0,
        activePlayer : false
      }],
      gameDisabled : false,
      winner : false
    });
  }

  rollDice = ()=>{

    let dc1 = Math.floor(((Math.random()*6)+1));
    let dc2 = Math.floor(((Math.random()*6)+1));
    var activeIndex = this.state.players.findIndex((player)=>player.activePlayer);
    var tempState = this.state;
    tempState.diceCount1 = dc1;
    tempState.diceCount2 = dc2;
      if(dc1 !== 1 && dc2 !== 1) {
        tempState.players[activeIndex].currentScore = tempState.players[activeIndex].currentScore + dc1+dc2;
        this.checkWinStatus(tempState,activeIndex);
      } else {
        tempState.players[activeIndex].currentScore = 0;
        tempState.players[activeIndex].activePlayer = false;
        tempState.players[activeIndex === 1 ? 0 : 1].activePlayer = true;
      }
    this.setState({tempState});
  }

  checkWinStatus(tempState,activeIndex) {
    let diceCountTotal = tempState.diceCount1 + tempState.diceCount2;
    if(tempState.players[activeIndex].totalScore >= tempState.winCount 
        || (tempState.players[activeIndex].currentScore >= tempState.winCount)
        || ((tempState.players[activeIndex].totalScore + diceCountTotal) >= tempState.winCount)
        || ((tempState.players[activeIndex].totalScore + tempState.players[activeIndex].currentScore) >= tempState.winCount)) {
      tempState.players[activeIndex].totalScore = tempState.players[activeIndex].totalScore 
            + tempState.players[activeIndex].currentScore;
       tempState.gameDisabled = true;
       tempState.players[activeIndex].winner = true;
       this.setState({tempState});
    }
  }


  holdNpass = () => {
    var tempState = this.state;
    var activeIndex = this.state.players.findIndex((player)=>player.activePlayer);
    tempState.players[activeIndex].totalScore = tempState.players[activeIndex].totalScore 
            + tempState.players[activeIndex].currentScore;
    tempState.players[activeIndex].currentScore = 0;
    tempState.players[activeIndex].activePlayer = false;
    tempState.players[activeIndex === 1 ? 0 : 1].activePlayer = true;
    this.setState({tempState});
  }


  render() {
    const style = this.state.gameDisabled ? {display : 'none'} : {};
    const style1 = this.state.gameDisabled ? {fontSize : 25} : {};
    return (
      <div className="wrapper clearfix">
        <p className="para"><center>Game Limit - {this.state.winCount}</center></p>
        <Player game = {this.state.players[0]}></Player>
        <img className="dice dice-1" alt="Dice" src={this.state.gameDisabled ? require('./images/flag.gif') : require('./images/dice-'+this.state.diceCount1+'.png')}></img>
        <img className="dice dice-2" alt="Dice" src={this.state.gameDisabled ? require('./images/flag.gif') : require('./images/dice-'+this.state.diceCount2+'.png')}></img>
        <button className="btn-new" style={style1} onClick={this.newGame}><FiPlusCircle/>New game</button>
        <button className="btn-roll" style={style} onClick={this.rollDice}><FiRefreshCw/>Roll dice</button>
        <button className="btn-hold" style={style} onClick={this.holdNpass}><FiArrowDownCircle/>Hold</button>
        <Player game = {this.state.players[1]}></Player>
      </div>
    );
  }
}

export default App;
