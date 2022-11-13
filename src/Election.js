class Election {
	constructor(electionYear) {
		this.year = electionYear;
		this.partyCount = 0;
		this.electorateCount = 0;

		this.allMyParties = [];
		this.allMyElectorates = [];
	}

	addParty(partyName) {
		this.allMyParties.push(new Party(partyName));
	}

	addElectorate(electorateName) {
		this.allMyElectorates.push(new Electorate(electorateName));
	}

	findParty(targetPartyName) {
		return this.allMyParties.find((party) => party.name === targetPartyName);
	}

	findElectorate(targetElectorateName) {
		return this.allMyElectorates.find((electorate) => electorate.name === targetElectorateName);
	}

	setWinningParty(targetElectorateName, partyName) {
		const electorate = this.findElectorate(targetElectorateName);
		const party = this.findParty(partyName);

		electorate.setParty(party);
		party.addElectorate(electorate);
	}

	setVotePercent(partyName, percentValue) {
		this.findParty(partyName).votePercent = percentValue;
	}
}
