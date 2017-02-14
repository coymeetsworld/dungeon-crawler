import {random, Container} from 'Container';


const PADDING_MIN_MULTIPLIER = 0;
const PADDING_MAX_MULTIPLIER = 3;

// Room is inside a container. Size of the room grows to a random padding from 0->1/3rd of the room size (for each side).
// Note: allowing padding to be 0 means that rooms in different containers can touch. 

export class Room {

	constructor(container) {			
		this.x = container.x + random(PADDING_MIN_MULTIPLIER, Math.floor(container.width/PADDING_MAX_MULTIPLIER));
		this.y = container.y + random(PADDING_MIN_MULTIPLIER, Math.floor(container.height/PADDING_MAX_MULTIPLIER));
		this.width = container.width - (this.x - container.x);
		this.height = container.height - (this.y - container.y);
		this.width -= random(PADDING_MIN_MULTIPLIER, this.width/PADDING_MAX_MULTIPLIER);
		// this was in example, typo?
		//this.h -= random(PADDING_MIN_MULTIPLIER, this.width/PADDING_MAX_MULTIPLIER);
		this.height -= random(PADDING_MIN_MULTIPLIER, this.width/PADDING_MAX_MULTIPLIER);
	}
	
}