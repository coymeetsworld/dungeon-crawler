import React from 'react';
import {connect} from 'react-redux';


export class HUD extends React.Component {
	
	render() {
		return(
			<div>
				<span>Name: </span>
				<span>Level: </span>
				<span>HP: 25/25</span>
				<span>Weapon: </span>					
				<span>XP: </span>
				<span>To next level:</span>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}


export default connect(mapStateToProps)(HUD);