import { TableTeam } from '../components/TableTeam/TableTeam';
import { useState } from 'react';
import Modal from '../components/Modal/Modal';
import { Link } from 'react-router-dom';
import { getTeam } from '../api/team';
import { TeamResponse } from '../interfaces/TeamResponse';
import { Player } from '../interfaces/Player';

export const MagicalTeam: React.FC = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [players, setPlayers] = useState<Player[]>([]);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleClick = async (value: number) => {
        toggleModal();
        const players: TeamResponse = await getTeam(value);
        if (players.error) {
            console.log(players.message || 'Failed to submit the form');
        } else if (Array.isArray(players.message)) {
            setPlayers(players.message);
        }
    };

    return (
        <section className="container">
            <section>
                <h1 className="roboto-bold">Magical Team</h1>
                <div className="right">
                    <Link to="/magical-team/add" className="button">
                        Add Team
                    </Link>
                </div>
                <TableTeam handleClick={handleClick} />
            </section>
            <Modal open={showModal} onClose={toggleModal}>
                <div>
                    <ul className="listado">
                        {players.map((player) => (
                            <li key={player.id}>
                                {player.name} {player.age}
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </section>
    );
};
