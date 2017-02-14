/* 
	Modified from
	https://eskerda.com/bsp-dungeon-generation/
*/
import {BSPTree} from 'BSPTree';

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
		//Create a vertical container
		c1 = new Container( container.x, container.y, random(1, container.width), container.height);
		c2 = new Container( container.x + c1.width, container.y, container.width - c1.width, container.height);
		
	}	else {
		//Create a horizontal container
		c1 = new Container( container.x, container.y, container.width, random(1, container.height));
		c2 = new Container( container.x, container.y + c1.height, container.width, container.height - c1.height);
		
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
		return `Container:\nCoordinates: (${this.x}, ${this.y})\nCenter: (${this.center.x}, ${this.center.y})\nWidth: ${this.width}\nHeight: ${this.height}`;
	}
}

	/*let tree = new BSPTree('x');
	let ltree = new BSPTree('a');
	let rtree = new BSPTree('b');
	tree.leftChild = ltree;
	tree.rightChild = rtree;
	
	let ltree2 = new BSPTree('c');
	ltree.leftChild = ltree2;
	let rtree2 = new BSPTree('d');
	ltree.rightChild = rtree2;
	tree.leftChild = ltree;
	console.log(tree.getTree());
	console.log(tree.getLeaves());*/