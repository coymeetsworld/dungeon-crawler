import React from 'react';
import Tile from 'Tile';
import {setLocation, characterMove, collectWeapon} from 'actions';
import {connect} from 'react-redux';

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
		console.log("Map mounts");
		window.addEventListener("keydown", this.onkeydown);
	}

	componentWillUnmount() {
		console.log("Map unmounts");
		window.removeEventListener("keydown", this.onkeydown);
	}

	/* If map will recieve props, check new state and see some changes (i.e. weapon gone, monster defeated?) */
	componentWillReceiveProps(nextProps) {
		//console.log("Updated map");
		//console.log(nextProps);
		//console.log(this.props);

		let charX, charY;
		let nextDungeonMap = nextProps.dungeon.map;
		for (let i = 0; i < nextDungeonMap.length; i++) {
			for (let j = 0; j < nextDungeonMap[i].length; j++) {
				if (nextDungeonMap[i][j].containsCharacter) {
					charX = j;
					charY = i;
					i = nextDungeonMap.length; // to stop iterating once found character. Any real significant boost?
					break;
				}
			}
		}

		let currDungeonMap = this.props.dungeon.map;
		let {dispatch} = this.props;
		
		if (currDungeonMap[charY][charX].containsWeapon) {
			let weapon = currDungeonMap[charY][charX].weapon;
			dispatch(collectWeapon(weapon));
		}

	}

	render() {
		
		let {dispatch, dungeon, character} = this.props;
		let dungeonMap = dungeon.map;
		
		/* Will use to put items, walls, monsters, etc. For now just character. */
		let getTileClasses = (x, y) => {
			if (dungeonMap[x][y].containsCharacter) {
				return "character-position";
			} else if (dungeonMap[x][y].isWall) {
				return "wall";
			} else if (dungeonMap[x][y].containsWeapon) {
				return "weapon";
			} else if (dungeonMap[x][y].containsMonster) {
				return "monster";
			}
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
		
		return (
			<div>
				<table>
					<tbody>
						{generateMap()}
					</tbody>					
				</table>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(DungeonMap);