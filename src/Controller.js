// Change this to extract data from a different URL
const apiURL = '../api/data.json';

class Controller {
	static setup() {
		const data = dataJSON;

		// TODO - rewrite it so we can have multiple election classes in the application
		const theElection = new Election(2020, 'New Zealand Election')
		// Populating the application
		data['parties'].forEach(party => theElection.addParty(party));
		data['electorates'].forEach(electorate => theElection.addElectorate(electorate));
		// This is a work around to push all of the parties to all of the electorates.
		theElection.pushPartiesToElectorates();

		data['summary'].forEach((entry, index) => {
			const partyName = data['parties'][index];
			const voteCount = entry[0];
			const votePercent = entry[1];
			const electorateSeats = entry[2];
			const listSeats = entry[3];
			// Tidy
			theElection.setPartyVoteCount(partyName, voteCount);
			theElection.setPartyVotePercent(partyName, votePercent);
			theElection.setPartyElectorateSeats(partyName, electorateSeats);
			theElection.setPartyListSeats(partyName, listSeats);
		})

		data['electorate-votes'].forEach((electorateVotes, electorateIndex) => {
			const electorateName = data['electorates'][electorateIndex];
			const electorate = theElection.getElectorate(electorateName);
			// Instead of creating methods on Electaion, we can simply loop here.
			electorateVotes.forEach((partyVote, partyIndex) => {
				const partyName = data['parties'][partyIndex]
				electorate.setPartyVotes(partyName, partyVote)
			})
		})

		data['electorate-candidates'].forEach((candidatesList, electorateIndex) => {
			const electorateName = data['electorates'][electorateIndex];
			const electorate = theElection.getElectorate(electorateName);
			candidatesList.forEach(candidateEntry => {
				// Here we adding candidates and votes numbers with votes percentages,
				// we doing it in 3 methods, since this is how the application is designed.
				const candidateName = candidateEntry[0];
				const partyName = candidateEntry[1];
				const votes = candidateEntry[2];
				const percentage = candidateEntry[3];
				// Tidy and nice
				electorate.addCandidate(partyName, candidateName)
				electorate.setCandidateVotes(candidateName, votes)
				electorate.setCandidatePercent(candidateName, percentage)
			})
		})

		return theElection
	}
}
