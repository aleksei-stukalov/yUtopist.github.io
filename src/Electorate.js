import { Candidate } from "./Candidate.js";
import { Party } from './Party.js'

export class Electorate {
	constructor (newName) {
		// Parameters
		this.name = newName;
		// Inherence
		this.allMyParties = []; // [ { party: Class, votes: Number, candidates: Class[] } ]
	}
	// Add
	addParty(party) { this.allMyParties.push({ party: party, votes: 0, candidates: [] }) }
	addCandidate(target, name) {
		const party = this.getParty(target);
		party.candidates.push(new Candidate(name, party.party))
	}
	// Get
	getParty(target) { return this.allMyParties.find((entry => entry.party.name === target)) }
	getCandidate(target) {
		return this.allMyParties.flatMap(party => party.candidates).find(candidate => candidate.name === target)
	}
	// Set
	setPartyVotes(target, value) { this.getParty(target).votes = value }
	setCandidateVotes(target, value) { this.getCandidate(target).setTotalVotes(value) }
	setCandidatePercent(target, value) { this.getCandidate(target).setTotalPercentage(value) }
}
