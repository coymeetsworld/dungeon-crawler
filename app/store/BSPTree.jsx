
export class BSPTree {
	
	constructor(leaf) {
		this.leaf = leaf;
		this.leftChild = undefined;
		this.rightChild = undefined;
	}
	
	getTree() {
		if (this.leftChild === undefined && this.rightChild === undefined) {
			return [this.leaf];
		}
		return [this.leaf].concat(this.leftChild.getTree(), this.rightChild.getTree());
	}
}
