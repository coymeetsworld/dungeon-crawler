import React from 'react';
import {connect} from 'react-redux';


export class HUD extends React.Component {

	render() {

		
		let character = this.props.dungeon.character;

		return(
			<div className="character-attributes">
				<span className="character-attribute">Name: {character.name}</span>
				<span className="character-attribute">Level: {character.level}</span>
				<span className="character-attribute">HP: {character.hp}/{character.maxhp}</span>
				<span className="character-attribute">Weapon: {character.weapon ? character.weapon.name : 'none'}</span>					
				<span className="character-attribute">XP: {character.xp}</span>
				<span className="character-attribute">To next level: TBD</span>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}


export default connect(mapStateToProps)(HUD);