import React from 'react';
import Tile from 'Tile';
import {characterMove} from 'actions';
import {connect} from 'react-redux';
import throttle from 'lodash/throttle';

export class DungeonMap extends React.Component {

	onkeydown = (e) => {
		let {dispatch, character} = this.props;
		switch(e.key) {
			case "ArrowLeft": 
				dispatch(characterMove('LEFT'));
				break;
			case "ArrowRight": 
				dispatch(characterMove('RIGHT'));
				break;
			case "ArrowUp": 
				dispatch(characterMove('UP'));
				break;
			case "ArrowDown": 
				dispatch(characterMove('DOWN'));
				break;
		}
	}

	componentDidMount() {
		window.addEventListener("keydown", throttle(this.onkeydown, 95));
	}

	componentWillUnmount() {
		window.removeEventListener("keydown", this.onkeydown);
	}
	

	render() {
		
		let {dispatch, dungeon, character} = this.props;
		let dungeonMap = dungeon.map;
		let endCondition = dungeon.endCondition;
		let charLocation = dungeon.charLoc;
		let godView = dungeon.godView;
		
		// LOS within 3 tiles left-right or up-down of character
		let withinLOS = (x,y) => {
			return ( (x <= charLocation.x+3 && x >= charLocation.x-3) && (y <= charLocation.y+3 && y >= charLocation.y-3));
		}
		
		
		/* Will use to put items, walls, monsters, etc. For now just character. */
		let getTileClasses = (x, y) => {
			
			if (!godView && !withinLOS(y,x)) { return "outside-los"; }
			
			if (dungeonMap[x][y].containsCharacter) {
				return "character-position";
				//Make tiles around visible
			} else if (dungeonMap[x][y].isWall) {
				return "wall";
			} else if (dungeonMap[x][y].containsWeapon) {
				return "weapon";
			} else if (dungeonMap[x][y].containsMonster) {
				return "monster";
			} else if (dungeonMap[x][y].containsPotion) {
				return "potion";
			} else if (dungeonMap[x][y].isExit) {
				return "exit";
			}
		}


		let generateTable = () => {
			return (
				<table>
					<tbody>
						{generateMap()}
					</tbody>
				</table>
			)
		}

		let generateMap = () => {				
			
			let map = dungeonMap.map((row, rIndex) => {
				let r = row.map((col, cIndex) => {						
					return (
						<Tile x={cIndex} 
									y={rIndex} 
									key={cIndex+''+rIndex}
									tileClasses={getTileClasses(rIndex,cIndex)}
						/>
					);
				});
				return <tr key={'row'+rIndex}>{r}</tr>	
			});
			
			return map;	
		}
		
		if (endCondition) {
			return (
				<div className="end-screen">
					Press any key to start back to Level 1
				</div>
			)			
		}
		return (
			<div>
				{generateTable()}	
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(DungeonMap);