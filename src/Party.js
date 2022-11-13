export class Party {
	constructor (newName) {
		// Parameters
		this.name = newName;
		// State
		this.voteCount = 0;
		this.votePercent = 0;
		this.electorateSeats = 0;
		this.listSeats = 0;
	}
	// Set
	setVoteCount(newCount) { this.voteCount = newCount }
	setVotePercent(newPercent) { this.votePercent = newPercent }
	setElectorateSeats(newSeatsCount) { this.electorateSeats = newSeatsCount }
	setListSeats(newSeatsCount) { this.listSeats = newSeatsCount }
}
