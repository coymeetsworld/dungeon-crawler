import React from 'react';
import {connect} from 'react-redux';

class Tile extends React.Component {
	
	render() {
		let {dispatch, x, y} = this.props;	
		return (
			<td key={'col' + y}></td>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(Tile);