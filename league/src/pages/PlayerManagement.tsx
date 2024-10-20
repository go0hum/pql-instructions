import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TablePlayers } from '../components/TablePlayers/TablePlayers';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { deletePlayer } from '../api/player';
import { ValidatePlayers } from '../validate/ValidatePlayers';
import { Player } from '../interfaces/Player';
import { createColumnHelper } from '@tanstack/react-table';
import { PlayersFormInput } from '../interfaces/PlayersFormInput';

export const PlayerManagement: React.FC = () => {
    let navigate = useNavigate();
    let childRef = useRef<any>(null);
    const [searchValue, setSearchValue] = useState('');
    const [inputSearchValue, setInputSearchValue] = useState('');

    const submitSearchForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchValue(inputSearchValue);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset,
    } = useForm<PlayersFormInput>({ resolver: yupResolver(ValidatePlayers) });

    const columnHelper = createColumnHelper<Player>();

    const PlayersColumns = [
        columnHelper.accessor('id', {
            header: () => 'ID',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('name', {
            header: () => 'Name',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('age', {
            header: () => 'Age',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('position', {
            header: () => 'Position',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('id', {
            header: () => '',
            cell: (info) => (
                <input
                    type="checkbox"
                    value={parseInt(info.getValue(), 10)}
                    {...register('players')}
                />
            ),
        }),
    ];

    const onSubmit = async (data: PlayersFormInput) => {
        const response = await deletePlayer(data);
        if (response.error) {
            setError('fetchError', {
                type: 'manual',
                message: response.message || 'Failed to submit the form',
            });
        } else {
            if (childRef.current) {
                childRef.current.reloadData();
            }
        }
        reset();
    };

    return (
        <section className="container">
            <h1 className="roboto-bold">Players sin asignar</h1>
            <div className="search-bar">
                <form onSubmit={submitSearchForm}>
                    <input
                        className="input"
                        type="text"
                        placeholder="Search..."
                        value={inputSearchValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputSearchValue(e.target.value)}
                    />
                </form>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <section className="right">
                    <Link to="/player-management/add" className="button">
                        Agregar Player
                    </Link>
                    <input type="submit" value="Eliminar" className="input" />
                </section>
                {errors.players && <p>{errors.players.message}</p>}
                {errors.fetchError && <p>{errors.fetchError.message}</p>}
                <TablePlayers
                    columns={PlayersColumns}
                    searchValue={searchValue}
                    ref={childRef}
                />
            </form>
        </section>
    );
};
