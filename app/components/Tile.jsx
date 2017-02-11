import React from 'react';
import {connect} from 'react-redux';

class Tile extends React.Component {
	
	render() {
		let {dispatch, x, y, tileClasses} = this.props;	
		
		//console.log(tileClasses);
		return (
			<td key={'col' + y} className={tileClasses}></td>
		)
	}
}

const mapStateToProps = (state) => {
	return state;
}

export default connect(mapStateToProps)(Tile);