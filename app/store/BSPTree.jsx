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

	getLeaves() {
		if (this.leftChild === undefined && this.rightChild === undefined) {
			return [this.leaf];
		}
		return [].concat(this.leftChild.getLeaves(), this.rightChild.getLeaves());
	}
}