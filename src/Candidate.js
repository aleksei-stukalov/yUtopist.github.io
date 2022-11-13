class Candidate {
	constructor(newName, newParty) {
		this.name = newName;
		this.myParty = newParty;
		this.totalVotes = 0;
		this.percentVotes = 0;
	}

	setTotalVotes(voteNumber) {
		this.totalVotes = voteNumber;
	}
}
