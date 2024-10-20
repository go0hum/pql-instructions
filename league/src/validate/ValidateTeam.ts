
import * as yup from "yup";

export const ValidateTeam = yup.object().shape({
    name: yup.string().required('Name es requerido'),
    players: yup
        .array()
        .of(yup.string())
        .required('Players es requerido')
        .min(1, 'Al menos debe tener un Jugador')
        .typeError('Debes seleccionar un Jugador'),
});