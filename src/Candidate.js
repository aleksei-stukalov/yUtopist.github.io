class Candidate {
	constructor (newName, newParty) {
		// Parameters
		this.name = newName;
		this.myParty = newParty;
		// State
		this.totalVotes = 0;
		this.percentVotes = 0;
	}
	// Set
	setTotalVotes(voteCount) { this.totalVotes = voteCount; }
	setTotalPercentage(percentage) { this.percentVotes = percentage; }
}
