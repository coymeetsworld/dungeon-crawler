/* 
	Modified from
	https://eskerda.com/bsp-dungeon-generation/
*/
export class BSPTree {
	
	
	random(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	constructor(leaf) {
		this.leaf = leaf;
		this.leftChild = undefined;
		this.rightChild = undefined;
	}

	// prints root node	
	getTree() {
		if (this.leftChild === undefined && this.rightChild === undefined) {
			return [this.leaf];
		}
		return [this.leaf].concat(this.leftChild.getTree(), this.rightChild.getTree());
	}
	
	// doesn't print root node	
	getLeaves() {
		if (this.leftChild === undefined && this.rightChild === undefined) {
			return [this.leaf];
		}
		return [].concat(this.leftChild.getTree(), this.rightChild.getTree());
	}
}