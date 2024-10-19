import styled from "styled-components";
import { TableTeam } from "../components/TableTeam";
import { useState } from "react";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";
import {getTeam} from "../api/team";

export const MagicalTeam = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [players, setPlayers] = useState([]);

    const toggleModal = () => {
        setShowModal(!showModal);
    }
    
    const handleClick = (value: number) => {
        toggleModal();
        getTeam(value);
    };
    
  return (<Container>
        <section>
            <h1>Magical Team</h1>
            <div className="right">
                <Link to="/magical-team/add">Add Team</Link>
            </div>
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
    .right {
        display: flex;
        justify-content: flex-end;
        padding: 1rem;
    }
    a {
        height: 35px;
        padding: 5px 10px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-top: 20px;
        background-color: #007bff;
        color: white;
        cursor: pointer;
        border: none;
        text-decoration: none;
    }
`