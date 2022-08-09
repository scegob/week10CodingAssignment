/* The class is a blueprint for creating objects. */
class Member {
    constructor(name, position) {
        this.name = name;
        this.position = position;

    }
}

/* The Team class is a class that represents a team. It has an id, a name, and a list of members. It
has methods to add and delete members. */
class Team {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.members = [];
    }

    addMember(member) {
        this.members.push(member);
    }

    deleteMember(member) {
        let index = this.members.indexOf(member);
        this.members.splice(index, 1);
    }
}

let teams = [];
let teamId = 0;

/* It's adding an event listener to the element with the id of new-team. When the element is clicked,
it will push a new team to the teams array and then call the drawDOM function. */
onClick('new-team', () => {
    teams.push(new Team(teamId++, getValue('new-team-name')))
    drawDOM();
});

/**
 * It adds an event listener to an element.
 * @param id - The id of the element you want to add the event listener to.
 * @param action - The function to be called when the element is clicked.
 * @returns The element that was clicked.
 */
function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

/**
 * It returns the value of the element with the id that is passed to it
 * @param id - The id of the element you want to get the value of.
 * @returns The value of the element with the id that is passed in.
 */
function getValue(id) {
    return document.getElementById(id).value; 
}


/**
 * It creates a table for each team, adds a title to the table, and then adds a row for each member of
 * the team.
 */
function drawDOM() {
    let teamDiv = document.getElementById('teams');
    clearElement(teamDiv);
    for (team of teams) {
        let table = createTeamTable(team);
        let title = document.createElement('h2');
        title.innerHTML = team.name;
        title.appendChild(createDeleteTeamButton(team));
        teamDiv.appendChild(title);
        teamDiv.appendChild(table);
        for (member of team.members) {
            createMemberRow(team, table, member);
        }
    }
}

/**
 * It creates a new row in the table, inserts the name and position of the member into the first two
 * cells, and then inserts a delete button into the third cell.
 * @param team - the team object
 * @param table - the table element
 * @param member - the member object
 */
function createMemberRow(team, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.position;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(team, member));
}

/**
 * It creates a button element, sets its class name, innerHTML, and onClick event handler, and then
 * returns the button element.
 * 
 * The onClick event handler is a function that removes the member from the team's members array and
 * then calls the drawDOM function.
 * 
 * The drawDOM function is called because the DOM needs to be updated to reflect the change in the
 * data.
 * @param team - The team object that the member belongs to.
 * @param member - the member object
 * @returns A button element.
 */
function createDeleteRowButton(team, member) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = team.members.indexOf(member);
        team.members.splice(index, 1);
        drawDOM();
    };
    return btn;
}

/**
 * Create a button element, give it a class name, give it some text, and when it's clicked, find the
 * team in the teams array, remove it from the array, and redraw the DOM.
 * @param team - the team object
 * @returns A button element.
 */
function createDeleteTeamButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete Team';
    btn.onclick = () => {
        let index = teams.indexOf(team);
        teams.splice(index, 1);
        drawDOM();
    }
    return btn;
}

/**
 * Create a new button element, set its class name, inner HTML, and onClick function, then return the
 * button.
 * @param team - The team object that the member is being added to.
 * @returns A button element with the class name of btn btn-primary, the innerHTML of Create, and an
 * onClick event that pushes a new member to the team's members array and then calls the drawDOM
 * function.
 */
function createNewMemberButton(team) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        team.members.push(new Member(getValue(`name-input-${team.id}`), getValue(`position-input-${team.id}`)));
        drawDOM();
    }
    return btn;
}

/**
 * It creates a table with a header row and a form row.
 * @param team - {
 * @returns A table with a header row and a form row.
 */
function createTeamTable(team) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let positionColumn = document.createElement('th')
    nameColumn.innerHTML = 'Name';
    positionColumn.innerHTML = 'Position';
    row.appendChild(nameColumn);
    row.appendChild(positionColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let positionTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${team.id}`);
    nameInput.setAttribute('type', 'type');
    nameInput.setAttribute('Class', 'form-control');
    let positionInput = document.createElement('input');
    positionInput.setAttribute('id', `position-input-${team.id}`);
    positionInput.setAttribute('type', 'type');
    positionInput.setAttribute('Class', 'form-control');
    let newMemberButton = createNewMemberButton(team);
    nameTh.appendChild(nameInput);
    positionTh.appendChild(positionInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(positionTh);
    formRow.appendChild(createTh);
    return table;
}

/**
 * While the element has a first child, remove the first child.
 * @param element - The element to clear.
 */
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild)
    }
}