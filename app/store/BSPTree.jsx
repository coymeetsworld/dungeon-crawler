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
	
	toString(lvl) {
		
		if (!lvl) { lvl = 1; }
		let str = `Level: ${lvl}\n Leaf: ${this.leaf.toString()}\n`;

		if (this.leftChild) {
			str += "Left Child:\n";
			str += this.leftChild.toString(lvl+1);	
		} 	
		
		if (this.rightChild) {
			str += "Right Child:\n";
			str += this.rightChild.toString(lvl+1);	
		}
								
		return str + "\n";
	}

}