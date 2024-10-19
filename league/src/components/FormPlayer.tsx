import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import {savePlayer} from "../api/player";

interface Player {
    id: number;
    name: string;
    age: number;
    position: string,
    team_id: number | null
};

const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    age: yup.number()
    .typeError("Age debe ser un numero")
    .required("Age is a required field")
    .min(1, "Age must be at least 1")
    .max(100, "Age must be at most 100"),
    position: yup.string().required("Position is a required field"),
});

const Positions = [
    { position:'Seeker', abilitie:'Enhanced Vision'},
    { position:'Seeker', abilitie:'Quick Reflexes'},
    { position:'Seeker', abilitie:'Stealth Mode'},
    { position:'Beater', abilitie:'Power Swing'},
    { position:'Beater', abilitie:'Defense Maneuver'},
    { position:'Beater', abilitie:'Tactical Awareness'},
    { position:'Keeper', abilitie:'Quick Reaction'},
    { position:'Keeper', abilitie:'	Defensive Shield'},
    { position:'Keeper', abilitie:'Game Sense'},
    { position:'Chaser', abilitie:'Speed Burst'},
    { position:'Chaser', abilitie:'Accurate Shot'},
    { position:'Chaser', abilitie:'Team Play'},
];

export const FormPlayer: React.FC = () => {
    let navigate = useNavigate();
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<Player>({ resolver: yupResolver(schema) });
    
      useEffect(() => {
        setValue("name", "Magoo");
      }, [setValue]);

  const onSubmit = (data: Player) => {
    savePlayer(data);
    return navigate("/player-management");
  };

  return (
    <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}

        <label>Age</label>
        <select {...register("age")}>
            <option value="">Select age</option>
            {[...Array(100).keys()].map(age => (
                <option key={age + 1} value={age + 1}>
                    {age + 1}
                </option>
            ))}
        </select>
        {errors.age && <p>{errors.age.message}</p>}

        <label>Position</label>
        <select {...register("position")}>
            <option value="">Select position</option>
            {Positions.map(({position, abilitie}) => (
                <option key={abilitie} value={position}>
                    {abilitie}
                </option>
            ))}
        </select>
        {errors.position && <p>{errors.position.message}</p>}
            <input type="submit" />
        </form>
    </Container>
  );
};

const Container = styled.div`
form {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

label {
  font-size: 16px;
  color: #333;
  margin-top: 15px;
  margin-bottom: 5px;
}


.input-field input {
  margin-top: 5px;
}

input {
  height: 35px;
  padding: 5px 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

input[type="submit"] {
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border: none;
}

input[type="submit"]:hover {
  background-color: #0056b3;
}

p {
  color: red;
  margin: 5px 0 0 0;
}
`