const API_URL = "http://localhost:3001/api";

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

export const deletePlayer = async(data) => {
    const deleteRequests = data.players.map(id => 
        fetch(`${API_URL}/players/${parseInt(id, 10)}`, {
            method: 'DELETE'
        })
    );

    try {
        await Promise.all(deleteRequests);
        console.log("Registros eliminados con éxito");
    } catch (error) {
        console.error("Error al eliminar registros:", error);
    }
};