/* 
	Modified from
	https://eskerda.com/bsp-dungeon-generation/
*/
export class BSPTree {
	
	
	
	constructor(leaf) {
		this.leaf = leaf;
		this.leftChild = undefined;
		this.rightChild = undefined;
	}

	// prints root node, don't want this when getting containers.
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