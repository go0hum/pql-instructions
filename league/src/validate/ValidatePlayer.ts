import * as yup from "yup";

export const ValidatePlayer = yup.object().shape({
    name: yup.string().required("Name es un campo requerido"),
    age: yup.number()
    .typeError("Age debe ser un numero")
    .required("Age es un campo requerido")
    .min(1, "Age debe ser al menos 1")
    .max(100, "Age debe ser menor a 100"),
    position: yup.string().required("Position es un campo requerido"),
});