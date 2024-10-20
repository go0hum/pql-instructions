import * as yup from 'yup';

export const ValidatePlayers = yup.object().shape({
    players: yup
        .array()
        .of(yup.string())
        .required('Players is required')
        .min(1, 'Al menos debe tener un Jugador')
        .typeError('Debes seleccionar un Jugador'),
});