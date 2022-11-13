class Party {
	constructor(newName) {
		this.name = newName;
		this.votePercent = 0;

		this.allMyElectorates = []; // list of electorates where this party won
	}

	addElectorate(theElectorate) {
		this.allMyElectorates.push(theElectorate);
	}

	countElectorates(theElectorate) {
		// We want to know how many electorates this party won in.
		let counter = 0;
		this.allMyElectorates.forEach((electorate) => {
			if (electorate.name === theElectorate) counter++;
		});
		return counter;
	}

	setVotePercent(newVotePercent) {
		this.votePercent = newVotePercent;
	}
}
