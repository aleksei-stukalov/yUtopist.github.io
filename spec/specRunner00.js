/*specRunner00*/
describe('00Spec (specRunner00)', function () {
	describe('Election', function () {
		var theElection
		beforeEach(function () {
			theElection = Controller.setup()
		})

		describe('the allMyElectorates property', function () {
			it('should have an .allMyElectorates property', function () {
				expect(theElection.hasOwnProperty('allMyElectorates')).toBeTruthy()
			})

			it('should reference an array (allMyElectorates)', function () {
				expect(Array.isArray(theElection.allMyElectorates)).toBeTruthy()
			})

			it('should have an .allMyParties property', function () {
				expect(theElection.hasOwnProperty('allMyParties')).toBeTruthy()
			})

			it('should reference an array (allMyParties)', function () {
				expect(Array.isArray(theElection.allMyParties)).toBeTruthy()
			})

			it('should have an .year property', function () {
				expect(theElection.hasOwnProperty('year')).toBeTruthy()
			})

			it('should have an .partyCount property', function () {
				expect(theElection.hasOwnProperty('partyCount')).toBeTruthy()
			})

			it('should have an .electorateCount property', function () {
				expect(theElection.hasOwnProperty('electorateCount')).toBeTruthy()
			})

			it('should have an .addParty function', function () {
				expect(typeof theElection.addParty).toBe('function')
			})

			it('should have an .addElectorate function', function () {
				expect(typeof theElection.addElectorate).toBe('function')
			})

			it('should have an .setWinningParty function', function () {
				expect(typeof theElection.setWinningParty).toBe('function')
			})

			it('should have the correct name for the first party', () => {
				expect(theElection.allMyParties[0].name).toBe('ACT New Zealand')
			})
			it('should have the correct Number of parties', () => {
				expect(theElection.allMyParties.length).toBe(17)
			})
		})
	})

	describe('Electorate', function () {
		var theElectorate
		beforeEach(function () {
			theElectorate = new Electorate()
		})

		describe('the allMyCandidates property', function () {
			it('should have an .allMyCandidates property', function () {
				expect(theElectorate.hasOwnProperty('allMyCandidates')).toBeTruthy()
			})

			it('should have an .allMyParties property', function () {
				expect(theElectorate.hasOwnProperty('allMyParties')).toBeTruthy()
			})

			it('should reference an array (allMyCandidates)', function () {
				expect(Array.isArray(theElectorate.allMyCandidates)).toBeTruthy()
			})

			it('should have an .name property', function () {
				expect(theElectorate.hasOwnProperty('name')).toBeTruthy()
			})

			it('should reference an array (allMyParties)', function () {
				expect(Array.isArray(theElectorate.allMyParties)).toBeTruthy()
			})
		})
	})

	describe('Candidate', function () {
		var theCandidate
		beforeEach(function () {
			theCandidate = new Candidate()
		})

		it('should have an .name property', function () {
			expect(theCandidate.hasOwnProperty('name')).toBeTruthy()
		})

		it('should have a .myParty property', function () {
			expect(theCandidate.hasOwnProperty('myParty')).toBeTruthy()
		})

		it('should have a .totalVotes property', function () {
			expect(theCandidate.hasOwnProperty('totalVotes')).toBeTruthy()
		})

		it('should have a .percentVotes property', function () {
			expect(theCandidate.hasOwnProperty('percentVotes')).toBeTruthy()
		})

		it('should return a string', function () {
			expect(typeof theCandidate.toString()).toBe('string')
		})
	})

	describe('Party', function () {
		var theParty
		beforeEach(function () {
			theParty = new Party()
		})

		it('should have an .name property', function () {
			expect(theParty.hasOwnProperty('name')).toBeTruthy()
		})

		it('should have a .votePercent property', function () {
			expect(theParty.hasOwnProperty('votePercent')).toBeTruthy()
		})

		it('should return a string', function () {
			expect(typeof theParty.toString()).toBe('string')
		})
	})
})
