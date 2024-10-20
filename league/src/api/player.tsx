const API_URL = "http://localhost:3001/api";

export const getAllPlayers = async (searchValue: string, order: string, sort: string): Promise<any> => {
    try {
        if (!API_URL) {
            throw new Error('API_URL is not defined');
        }

        const url = `${API_URL}/teams?name_like=${searchValue}&_sort=${sort}&_order=${order}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error fetching players: ${response.statusText}`);
        }

        const players = await response.json();
        return { error: false, message: players };
    } catch (error) {
        return { error: true, message: 'Error: ' + error };
    }
};

export const getAllPlayersAvailable  = async (): Promise<any> => {
    try {
        if (!API_URL) {
            throw new Error('API_URL is not defined');
        }

        const url = `${API_URL}/players/available`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error fetching players: ${response.statusText}`);
        }

        const players = await response.json();
        return { error: false, message: players };
    } catch (error) {
        return { error: true, message: 'Error: ' + error };
    }
};


export const savePlayer = (data) => {
    try {
        data.team_id = null;
        fetch(`${API_URL}/players`, {
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

export const deletePlayer = async (data) => {
    try {
        const deleteRequests = data.players.map(id => 
            fetch(`${API_URL}/players/${parseInt(id, 10)}`, {
                method: 'DELETE'
            })
        );

        await Promise.all(deleteRequests);
        return { error: false, message: "Registros eliminados con éxito" };
    } catch (error) {
        return { error: true, message: 'Error: ' + error.message };
    }
};