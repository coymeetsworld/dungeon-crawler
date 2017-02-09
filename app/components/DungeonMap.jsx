import React from 'react';
import Tile from 'Tile';

import {connect} from 'react-redux';

export class DungeonMap extends React.Component {

	render() {
		
		let {dispatch, dungeonMap} = this.props;
		
		let generateMap = () => {				
			
			let x = dungeonMap.map((row, rIndex) => {
				let r = row.map((col, cIndex) => {						
					return <Tile x={cIndex} y={rIndex} key={cIndex+''+rIndex}/>
				});
				return <tr key={'row'+rIndex}>{r}</tr>	
			});
			return x;	
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