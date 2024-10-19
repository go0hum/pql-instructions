import styled from "styled-components";
import { TableTeam } from "../components/TableTeam";
import { useState } from "react";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

export const MagicalTeam = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [players, setPlayers] = useState([]);

    const toggleModal = () => {
        setShowModal(!showModal);
    }
    
    const handleClick = (value: number) => {
        toggleModal();
        const url = `http://localhost:3001/api/players?team_id=${value}`;
        fetch(url)
        .then((res) => res.json())
        .then((players) => {
            setPlayers(players);
        }).catch((error) => {
            console.error("Error fetching teams:", error);
        });
    };
    
  return (<Container>
        <section>
            <h1>Magical Team</h1>
            <div><Link to="/magical-team/add">Add Team</Link></div>
            <TableTeam handleClick={handleClick} />
        </section>
        <Modal open={showModal} onClose={toggleModal}>
            <div>
                <ul>
                    {players.map((player) => (
                        <li key={player.id}>{player.name}</li>
                    ))}
                </ul>
            </div>
        </Modal>
  </Container>);
}
const Container =styled.div`
    padding: 2rem 3rem;
`