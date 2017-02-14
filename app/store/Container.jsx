/* 
	Modified from
	https://eskerda.com/bsp-dungeon-generation/
*/
import BSPTree from 'BSPTree';

export class Point {

	constructor(x,y) {
		this.x = x,
		this.y = y
	}
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