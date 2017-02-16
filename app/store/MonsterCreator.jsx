
//Lvl 1 and 2 monsters
export let createSlime = () => {
	return { name: 'slime', hp: 15, str: 5, xp: 5 }
}

export let createGnome = () => {
	return { name: 'gnome', hp: 25, str: 10, xp: 10 }	
}

//Lvl 2 monsters
export let createSkeleton = () => {
	return { name: 'skeleton', hp: 45, str: 25, xp: 25 }	
}

//Lvl 3 monsters
export let createImp = () => {
	return { name: 'imp', hp: 90, str: 20, xp: 35 }	
}
export let createOrc = () => {
	return { name: 'orc', hp: 125, str: 75, xp: 50 }	
}

// Mini bosses found on Lvl 4
export let createFireSkull = () => {
	return { name: 'fireskull', hp: 200, str: 90, xp: 80 }	
}

// Final boss
export let createDragon = () => {
	return { name: 'dragon', hp: 750, str: 125, xp: 300 }	
}