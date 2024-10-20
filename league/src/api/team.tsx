const API_URL = "http://localhost:3001/api";

export const getAllTeams = async (searchValue: string, order: string, sort: string): Promise<any> => {
    try {
        if (!API_URL) {
            throw new Error('API_URL is not defined');
        }

        const url = `${API_URL}/teams?name_like=${encodeURIComponent(searchValue)}&_sort=${sort}&_order=${order}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error fetching teams: ${response.statusText}`);
        }

        const teams = await response.json();
        return { error: false, message: teams };
    } catch (error) {
        return { error: true, message: 'Error: ' + error };
    }
};

export const saveTeam = async (data) => {
    try {
        data.players = data.players.map(player => parseInt(player, 10));

        const response = await fetch(`${API_URL}/teams`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const showError = !response.ok;

        const result = await response.json();

        if (result.message && result.message !== "" && showError) {
            throw new Error(`${result.message}`);
        } 
        
        return { error: false, message: 'Success: ' + result };
    } catch (error) {
        return { error: true, message: 'Error: ' + error.message };
    }
};

export const getTeam = async (value) => {
    try {
        if (!API_URL) {
            throw new Error('API_URL is not defined');
        }

        const url = `${API_URL}/players?team_id=${value}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Error fetching players: ${response.statusText}`);
        }

        const showError = !response.ok;

        const players = await response.json();

        if (players.message && players.message !== "" && showError) {
            throw new Error(`${players.message}`);
        } 

        return { error: false, message: players };
    } catch (error) {
        return { error: true, message: 'Error: ' + error };
    }
};
