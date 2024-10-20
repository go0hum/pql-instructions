import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { savePlayer } from '../../api/player';
import { Positions } from '../../data/Positions';
import { Container } from './styles';
import { PlayerFormInput } from '../../interfaces/PlayerFormInput';
import { ValidatePlayer } from '../../validate/ValidatePlayer';

export const FormPlayer: React.FC = () => {
    let navigate = useNavigate();
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<PlayerFormInput>({ resolver: yupResolver(ValidatePlayer) });

    useEffect(() => {
        setValue('name', 'Magoo');
    }, [setValue]);

    const onSubmit = (data: PlayerFormInput) => {
        savePlayer(data);
        return navigate('/player-management');
    };

    return (
        <Container>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Name</label>
                <input {...register('name')} className="input" />
                {errors.name && <p>{errors.name.message}</p>}

                <label>Age</label>
                <select {...register('age')} className="input">
                    <option value="">Select age</option>
                    {[...Array(100).keys()].map((age) => (
                        <option key={age + 1} value={age + 1}>
                            {age + 1}
                        </option>
                    ))}
                </select>
                {errors.age && <p>{errors.age.message}</p>}

                <label>Position</label>
                <select {...register('position')} className="input">
                    <option value="">Select position</option>
                    {Positions.map(({ position, ability }) => (
                        <option key={ability} value={position}>
                            {ability}
                        </option>
                    ))}
                </select>
                {errors.position && <p>{errors.position.message}</p>}
                <input type="submit" className="input" />
            </form>
        </Container>
    );
};
