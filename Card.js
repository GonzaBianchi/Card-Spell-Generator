export default class Card {
	constructor(data) {
		this.level = data.level;
		this.name = data.nombre;
		this.type = data.school;
		this.cast = data.castingTime;
		this.range = data.range;
		this.components = data.components;
		this.duration = data.duration;
		this.description = data.details;
	}
}