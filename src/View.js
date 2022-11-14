const theElection = Controller.setup()

// TODO rewrite it so we can have mutiple elections in an array.
const d = document;
const main = d.querySelector('#page-content')
const nav = d.querySelector('#header-navigation')
const navDropMenu = d.querySelector('#navigation-dropmenu');

// Page interractions
const closeMenuElections = () => { navDropMenu.classList.add('dropmenu-hidden') }
const toggleMenuElections = () => { navDropMenu.classList.toggle('dropmenu-hidden') }
window.toggleMenuElections = toggleMenuElections

d.body.addEventListener('click', (event) => {
	if (!nav.contains(event.target)) closeMenuElections()
})

// User interractions
const showHome = () => {
	closeMenuElections()
	main.innerHTML = `
	<div id="content-hero">
		<h1>Welcome to Electoral Commision non-oficial portal!</h1>
		<h2>Please select Election year in the menu to display results.</h2>
	</div>
	`
}
window.showHome = showHome
showHome()

const showElection = (election) => {
	const electionTitle = 'New Zealand Election 2020'
	const electionTabTitle = 'General Election'
	const electionTabDescription = 'Nationalwide Party Votes Results'

	// Reseting the page's HTML
	main.innerHTML = '';
	closeMenuElections()

	// TODO a checker for the election name, to fetch proper data

	// We want to create aside menu
	const aside = d.createElement('aside')
	aside.id = 'content-menu'

	const asideTitle = d.createElement('h2')
	asideTitle.id = 'menu-title'
	asideTitle.innerText = electionTitle

	const asideList = d.createElement('ul')
	asideList.id = 'menu-list'
	asideList.innerHTML = `
	<li>
		<button onclick="showElectionTab('partyVotes')">
			<span><img src="static/svg/arrow.svg" width="14px"></span>
			Nationalwide Party Votes Results
		</button>
	</li>
	<li>
		<button>
			<span><img src="static/svg/arrow.svg" width="14px"></span>
			Electorate Winning Party Results
		</button>
	</li>
	`

	// Filters need to be separated to the own function
	const asideFilters = d.createElement('ul')
	asideFilters.id = 'menu-filters'
	asideFilters.innerHTML = `
	<li>
		<button>
			Party votes
			<span><img src="static/svg/check-ticked.svg" width="22px"></span>
		</button>
	</li>
	<li>
		<button>
			Percentage of votes
			<span><img src="static/svg/check-ticked.svg" width="22px"></span>
		</button>
	</li>
	<li>
		<button>
			Electorate seats
			<span><img src="static/svg/check-ticked.svg" width="22px"></span>
		</button>
	</li>
	<li>
		<button>
			List seats
			<span><img src="static/svg/check-ticked.svg" width="22px"></span>
		</button>
	</li>
	<li>
		<button>
			Total seats
			<span><img src="static/svg/check-ticked.svg" width="22px"></span>
		</button>
	</li>
	`

	// We want to create a section element for data
	const section = d.createElement('section')
	section.id = 'content-main'

	const sectionTitle = d.createElement('h1')
	sectionTitle.id = 'main-title'
	sectionTitle.innerText = electionTabTitle

	const sectionDescription = d.createElement('h2')
	sectionDescription.id = 'main-description'
	sectionDescription.innerText = electionTabDescription

	const sectionGraph = createGraph()
	const sectionTable = createTable()

	aside.append(asideTitle, asideList, asideFilters)
	section.append(sectionTitle, sectionDescription, sectionGraph, sectionTable)
	main.append(aside, section)

	// Little styling
	d.querySelector('#menu-filters').style.top = (d.querySelector('#main-table').offsetTop + 32) + 'px'
}
window.showElection = showElection

const createGraph = () => {
	// TODO make acronyms added to all parties on data fetch
	// Temprory solution.
	const partyAcronym = {
		"Labour Party": "LAB",
		"National Party": "NAT",
		"Green Party": "GP",
		"ACT New Zealand": "ACT",
		"Māori Party": "MAOR"
	}
	// Creating an array for the graph with a brief info for parties
	const shortParties = theElection.allMyParties.filter(party => party.electorateSeats + party.listSeats > 0)
		.map(filteredParty => ({
			name: partyAcronym[filteredParty.name],
			seats: filteredParty.electorateSeats + filteredParty.listSeats,
			percentage: filteredParty.votePercent.toFixed(1)
		}))
		.sort((a, b) => b.seats - a.seats || b.percentage - a.percentage)
		.concat({
			name: 'OTHER',
			seats: 0,
			percentage: theElection.allMyParties.filter(party => party.electorateSeats + party.listSeats === 0)
				.reduce((accumulator, current) => accumulator + current.votePercent, 0).toFixed(1)
		})

	const graph = d.createElement('div')
	graph.id = 'main-graph'

	const graphTitle = d.createElement('h3')
	graphTitle.id = 'graph-title'
	graphTitle.innerText = 'Percentage of Votes'

	const graphContent = d.createElement('div')
	graphContent.id = 'graph-content'

	shortParties.forEach(party => {
		const partyElement = d.createElement('div')
		partyElement.className = 'content-party'

		const partyPercent = d.createElement('h4')
		partyPercent.className = 'party-percent'
		partyPercent.innerText = party.percentage + '%'

		const partyBar = d.createElement('span')
		partyBar.className = party.name === 'OTHER' ? 'party-bar-other' : 'party-bar'
		partyBar.style.flex = ((100 / shortParties[0].percentage) * party.percentage) / 100

		const partyName = d.createElement('h4')
		partyName.className = 'party-name'
		partyName.innerText = party.name

		const partySeats = d.createElement('h4')
		partySeats.className = 'party-seats'
		partySeats.innerText = party.seats

		partyElement.append(partyPercent, partyBar, partyName, partySeats)
		graphContent.appendChild(partyElement)
	})

	graph.append(graphTitle, graphContent)
	return graph
}

const createTable = () => {
	const headers = [
		'',
		'Party Votes',
		'Percentage of Votes',
		'Electorate seats',
		'List seats',
		'Total seats'
	]

	const table = d.createElement('table')
	table.id = 'main-table'

	const tableHeader = d.createElement('tr')
	tableHeader.className = 'table-header'

	headers.forEach(header => {
		const tableColumn = d.createElement('th')
		tableColumn.innerText = header

		tableHeader.append(tableColumn)
	})
	table.appendChild(tableHeader)

	theElection.allMyParties
		.sort((a, b) => b.listSeats - a.listSeats || b.voteCount - a.voteCount)
		.forEach(party => {
			const tableRow = d.createElement('tr')

			const partyName = d.createElement('td')
			partyName.innerText = party.name

			const votesCount = d.createElement('td')
			partyVoteCount = party.voteCount === 0 ? '-' : party.voteCount
			votesCount.innerText = partyVoteCount

			const percentage = d.createElement('td')
			partyVotePercent = party.votePercent === 0 ? '-' : party.votePercent
			percentage.innerText = partyVotePercent

			const electorateSeats = d.createElement('td')
			partyElectorateSeats = party.electorateSeats === 0 ? '-' : party.electorateSeats
			electorateSeats.innerText = partyElectorateSeats

			const listSeats = d.createElement('td')
			partyListSeats = party.listSeats === 0 ? '-' : party.listSeats
			listSeats.innerText = partyListSeats

			const totalSeats = d.createElement('td')
			partyTotalSeats = party.electorateSeats + party.listSeats
			partyTotalSeats = partyTotalSeats === 0 ? '-' : partyTotalSeats
			totalSeats.innerText = partyTotalSeats

			tableRow.append(partyName, votesCount, percentage, electorateSeats, listSeats, totalSeats)
			table.appendChild(tableRow)
		})

	return table
}
