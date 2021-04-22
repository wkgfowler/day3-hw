const getData = async (season, round) => {
    let response = await axios.get(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
    console.log(response)
    return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
}

const DOM_ELEMENTS = {
    racer_table: '.racer-table'
}


const load_data = async () => {
    clear_data()
    let season_year = document.getElementById('season').value
    let round_num = document.getElementById('round').value
    console.log(season_year, round_num)

    const racers = await getData(season_year, round_num);
    console.log(racers)

    racers.forEach( element => create_table(element.position, element.Driver.givenName, element.Driver.familyName, element.Driver.nationality, element.Constructors[0].name , element.points, element.Driver.url))
}


const create_table = (position, first_name, last_name, nationality, sponsor, points, moreinfo) => {
    const html = `<tr><td>${position}</td><td>${first_name} ${last_name}</td><td>${nationality}</td><td>${sponsor}</td><td>${points}</td><td><a href="${moreinfo}">Wikipedia</a></td></tr>`;
    document.querySelector(DOM_ELEMENTS.racer_table).insertAdjacentHTML('beforeend', html)
}

const clear_data = () => {
    document.querySelector(DOM_ELEMENTS.racer_table).innerHTML = ''
}




//const submit_button = document.getElementById('submit-Button')
//submit_button.addEventListener('click', load_data)