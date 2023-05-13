export default class Card {
	constructor(data) {
		this.level = data[0];
		this.name = data[1];
		this.type = data[2];
		this.cast = data[3];
		this.range = data[4];
		this.components = data[5];
		this.duration = data[6];
		this.description = data[7];
	}
}