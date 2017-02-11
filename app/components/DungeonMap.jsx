import React from 'react';
import Tile from 'Tile';
import {setLocation, characterMove} from 'actions';
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

	render() {
		
		let {dispatch, dungeon, character} = this.props;
		let dungeonMap = dungeon.map;
		console.log("Character: " + character);
		
		/* Will use to put items, walls, monsters, etc. For now just character. */
		let getTileClasses = (x, y) => {
			if (character.x === x && character.y === y) {					
				return "character-position";
			}
			

			
		}

		let generateMap = () => {				
			
			let map = dungeonMap.map((row, rIndex) => {
				let r = row.map((col, cIndex) => {						
					return (
						<Tile x={cIndex} 
									y={rIndex} 
									key={cIndex+''+rIndex}
									tileClasses={getTileClasses(cIndex,rIndex)}
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