/* 
	Modified from
	https://eskerda.com/bsp-dungeon-generation/
*/
import {BSPTree} from 'BSPTree';

const HORZ_RATIO = 0.45;
const VERT_RATIO = 0.45;

export class Point {
	constructor(x,y) {
		this.x = x,
		this.y = y
	}
}

export const random = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export let randomSplit = (container) => {
	
	let c1, c2;

	// generates a 0 or 1 number	
	if (Math.round(Math.random())) {
		//console.log("Create vertical container");
		//Create a vertical container
		c1 = new Container( container.x, container.y, random(1, container.width), container.height);
		c2 = new Container( container.x + c1.width, container.y, container.width - c1.width, container.height);

		if (c1.width/c1.height < VERT_RATIO || c2.width/c2.height < VERT_RATIO) {
			//console.log("Removing vert container");
			return randomSplit(container); // Discards c1 and c2
		}
		
	}	else {
		//console.log("Create horizontal container");
		//Create a horizontal container
		c1 = new Container( container.x, container.y, container.width, random(1, container.height));
		c2 = new Container( container.x, container.y + c1.height, container.width, container.height - c1.height);

		if (c1.height/c1.width < HORZ_RATIO || c2.height/c2.width < HORZ_RATIO) {
			//console.log("Removing horz container");
			return randomSplit(container); // Discards c1 and c2
		}
		
	}
	
	return [c1, c2];
}


export let splitContainer = (container, iteration) => {
	let root = new BSPTree(container);
	
	if (iteration != 0) {
		let splitContainers = randomSplit(container);
		root.leftChild = splitContainer(splitContainers[0], iteration-1);
		root.rightChild = splitContainer(splitContainers[1], iteration-1);
	}
	return root;
}

export class Container {
	
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		
		this.center = new Point(
			this.x + (this.width/2),
			this.y + (this.height/2)
		);
	}

	toString() {
		return `Container:\nCoordinates: (${this.x}, ${this.y})\nCenter: (${this.center.x}, ${this.center.y})\nWidth: ${this.width}\nHeight: ${this.height}\n`;
	}
}
