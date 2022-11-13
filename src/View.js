const createLayout = () => {
	const main = document.querySelector('#page-main');
	// Reseting the code inside of the main tag
	main.innerHTML = '';
	main.append(
		drawTable(
			['Party', 'Seats', 'Votes'],
			theElection.allMyParties.map((party) => [party.name, 0, party.votePercent]),
			(tableID = 'table-party'),
			true
		),
		drawTable(
			['Electorate', 'Party'],
			theElection.allMyElectorates.map((electorate) => [electorate.name, electorate.myParty.name]),
			(tableID = 'table-electorate'),
			true
		)
	);
};

const drawTable = (tableColumns, tableRows, tableID = null, addGraph = false) => {
	const newElement = document.createElement('section');
	newElement.className = 'main-section flexed';

	const newTable = document.createElement('table');
	newTable.id = tableID;
	newTable.className = 'table-body';

	// Creating table headers
	const tableHeaderRow = document.createElement('tr');
	tableHeaderRow.className = 'table-header';
	tableColumns.forEach((entry) => {
		const tableColumn = document.createElement('th');
		tableColumn.innerText = entry;
		tableHeaderRow.appendChild(tableColumn);
	});
	// Adding table headers
	newTable.appendChild(tableHeaderRow);

	// Creating table rows
	tableRows.forEach((entry, index) => {
		const newTableRow = document.createElement('tr');

		entry.forEach((_entry) => {
			const newTableCell = document.createElement('td');
			newTableCell.innerText = _entry;
			newTableRow.appendChild(newTableCell);
		});
		// Adding table rows
		newTable.appendChild(newTableRow);
	});

	// Creating Graph Placeholder
	const newGraph = document.createElement('div');
	newGraph.className = 'graph-body flexed';
	newGraph.innerText = 'Graph Placeholder';

	newElement.append(newTable, newGraph);

	return newElement;
};

const refreshTable = () => {};
