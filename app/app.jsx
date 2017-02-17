import React from 'react';
import DungeonMap from 'DungeonMap';
import FooterBar from 'FooterBar';
import HUD from 'HUD';

const App = () => (
	<div className="main-app">
		<h1>Dungeon Crawler</h1>
		<HUD/>
		<DungeonMap/>
		<FooterBar/>
	</div>
)

export default App;