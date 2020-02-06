import React from 'react';
import './player.styles.css';
import Swing from 'react-reveal/Swing';

class Player extends React.Component {


    render() {
        const style = this.props.game.winner ? {} : {display:'none'};
        return (
                <div className={(this.props.game.winner ? 'winner' : '')+" player-1-panel " +(this.props.game.activePlayer ? 'active ' : '')}>
                    <div className="player-name">{this.props.game.name}</div>
                    <div className="player-score">{this.props.game.totalScore}
                    <div className="wintext" style={style}>
                        <Swing duration={10000}>Congratulations You Won !!!!</Swing>
                    </div>
                    </div>
                    <div className="player-current-box">
                        <div className="player-current-label">Current</div>
                        <div className="player-current-score">{this.props.game.currentScore}</div>
                    </div>
                </div>
        );
    }

}

export default Player;