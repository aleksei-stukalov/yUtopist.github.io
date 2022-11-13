import { Party } from './Party.js';
import { Electorate } from './Electorate.js';

export class Election {
	constructor (newYear, newName) {
		// Parameters
		this.year = newYear;
		this.name = newName;
		// Inherence
		this.allMyParties = [];
		this.allMyElectorates = [];
	}
	// Add
	addParty(name) { this.allMyParties.push(new Party(name)); }
	addElectorate(name) { this.allMyElectorates.push(new Electorate(name)); }
	// Get
	getParty(target) { return this.allMyParties.find(party => party.name === target); }
	getElectorate(target) { return this.allMyElectorates.find(electorate => electorate.name === target); }
	getPartyCount() { return this.allMyParties.length }
	getElectorateCount() { return this.allMyElectorates.length }
	// Set
	setPartyVoteCount(target, value) { this.getParty(target).setVoteCount(value); }
	setPartyVotePercent(target, value) { this.getParty(target).setVotePercent(value); }
	setPartyElectorateSeats(target, value) { this.getParty(target).setElectorateSeats(value); }
	setPartyListSeats(target, value) { this.getParty(target).setListSeats(value); }
	// Push
	pushPartiesToElectorates() {
		this.allMyElectorates.forEach(electorate => {
			this.allMyParties.forEach(party => electorate.addParty(party));
		});
	}
}
