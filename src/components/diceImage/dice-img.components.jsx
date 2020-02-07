import React from 'react';
import './dice.styles.css';

const Image = (props)=> (
    <img className={`dice dice-${props.id}`} alt="Dice" src={props.gameState ? require('../../images/flag.gif') : require('../../images/dice-'+props.diceCount+'.png')}></img>
);

export default Image;