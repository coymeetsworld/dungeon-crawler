import React from 'react';
import {toggleGodView} from 'actions';
import {connect} from 'react-redux';


export class HUD extends React.Component {

	render() {
		let {dispatch, dungeon} = this.props;
		let godView = dungeon.godView;
			
		let printWeapon = () => {
			if (!character.weapon) {
				return <span className="character-attribute">Weapon: none</span>	
			}
			
			return (
				<span className="character-attribute">
					Weapon: {character.weapon.name} (<span className="weapon-atk">+{character.weapon.attack} atk</span>)
				</span>		
			)
		}
		
		let printHP = () => {
			if (character.hp/character.maxhp < 0.25) {
			  return <span className="low-hp">{character.hp}/{character.maxhp}</span>
			}
			return <span>{character.hp}/{character.maxhp}</span>
		}
		
		let printXPForNextLvlUp = () => {
			switch(character.level) {
				case 1:
					return 40 - character.xp
				case 2:
					return 80 - character.xp
				case 3:
					return 320 - character.xp	
				case 4: 
					return 550 - character.xp
				case 5:
					return "MAX"
				default:
					console.log("Error, should not have gotten here: ");
					console.log(character);
			}	
		}
		
		let gameMode = () => {
			if (godView) {
				return "Normal Mode";
			}	
			return "God Mode";	
		}
		
		let character = this.props.dungeon.character;

		if (this.props.dungeon.endCondition === 'WIN') {
			return (
				<div className="win-banner">						
					YOU DEFEATED THE DRAGON!!!
				</div>
			)	
		} else if (this.props.dungeon.endCondition === 'LOSE') {
			return (
				<div className="lose-banner">
					GAME OVER
				</div>
			)
		} 
		else {
			return(
				<div className="character-attributes">
					<span className="character-attribute">Name: {character.name}</span>
					<span className="character-attribute">HP: {printHP()}</span>
					<span className="character-attribute">Level: {character.level}</span>
					<span className="character-attribute">XP for next level: {printXPForNextLvlUp()}</span>
					<span className="character-attribute">XP: {character.xp}</span>
					{printWeapon()}
					<span className="character-attribute">Dungeon Level: {this.props.dungeon.level}</span>
					<button className="toggle-god-view" onClick={() => {dispatch(toggleGodView())}}>{gameMode()}</button>
				</div>
			)
		}
	}
}

const mapStateToProps = (state) => {
	return state;
}


export default connect(mapStateToProps)(HUD);