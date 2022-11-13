class Electorate {
	constructor(newName) {
		this.name = newName;
		this.myParty = null;

		this.allMyCandidates = [];
		this.allMyParties = []; // I dont understand the point of this.
	}

	addCandidate(candidateName, partyName) {
		this.allMyCandidates.push(new Candidate(candidateName, partyName));
	}

	findCandidate(candidateName) {
		return this.allMyCandidates.find((candidate) => candidate.name === candidateName);
	}

	setCandidateVote(candidateName, voteNumber) {
		this.findCandidate(candidateName).setTotalVotes(voteNumber);
	}

	setParty(theParty) {
		this.allMyParties.push(theParty);
		this.myParty = theParty;
	}
}
