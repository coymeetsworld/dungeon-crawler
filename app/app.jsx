import React from 'react';
import DungeonMap from 'DungeonMap';
import HUD from 'HUD';

const App = () => (
	<div className="main-app">
		<h1>Dungeon Crawler</h1>
		<DungeonMap/>
		<HUD/>
	</div>
)

export default App;