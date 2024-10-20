import React from 'react';
import { useForm } from 'react-hook-form';
import { TablePlayers } from '../TablePlayers/TablePlayers';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { createColumnHelper } from '@tanstack/react-table';
import { useNavigate } from 'react-router-dom';
import { saveTeam } from '../../api/team';
import { TeamFormInput } from "../../interfaces/TeamFormInput";
import { Player } from "../../interfaces/Player";
import { Container } from "./styles";
import { ValidateTeam } from "../../validate/ValidateTeam";

export const FormTeam: React.FC = () => {
    let navigate = useNavigate();
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<TeamFormInput>({ resolver: yupResolver(ValidateTeam) });

    useEffect(() => {
        setValue('name', 'Harrys');
    }, [setValue]);

    const columnHelper = createColumnHelper<Player>();

    const columns = [
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
    ];

    const onSubmit = async (data: TeamFormInput) => {
        const response = await saveTeam(data);
        if (response.error) {
            setError('fetchError', {
                type: 'manual',
                message: response.message || 'Failed to submit the form',
            });
        } else {
            return navigate('/magical-team');
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <label>Name</label>
                <input {...register('name')} className="input" />
                {errors.name && <p>{errors.name.message}</p>}

                <label>Description</label>
                <input {...register('slogan')} className="input" />

                <TablePlayers columns={columns} onlyAvailable={true}/>
                {errors.players && <p>{errors.players.message}</p>}

                {errors.fetchError && <p>{errors.fetchError.message}</p>}

                <input type="submit" className="input" />
            </form>
        </Container>
    );
};
