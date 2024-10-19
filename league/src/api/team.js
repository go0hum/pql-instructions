const API_URL = "http://localhost:3001/api";

export const saveTeam = (data) => {
    try {
        data.players = data.players.map(player => parseInt(player, 10));
        fetch(`${API_URL}/teams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) 
        })
        .then((response) => response.json())
        .then((result) => {
            console.log('Success:', result);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

export const getTeam = (value) => {
    const url = `${API_URL}/players?team_id=${value}`;
    fetch(url)
    .then((res) => res.json())
    .then((players) => {
        setPlayers(players);
    }).catch((error) => {
        console.error("Error fetching teams:", error);
    });
};
