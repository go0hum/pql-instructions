import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TablePlayers } from "./TablePlayers";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import {saveTeam} from "../api/team";

interface IFormInput {
    name: string;
    slogan: string;
}

interface Player {
    id: number;
    name: string;
    age: number;
    position: string,
};

interface Team {
  name: string;
  slogan: string;
  players: number[]
}

const schema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    players: yup.array()
    .of(yup.string()) 
    .required("Players is required")
    .min(1, "Al menos debe tener un Jugador")
    .typeError("Debes seleccionar un Jugador"),
});

export const FormTeam: React.FC = () => {
    let navigate = useNavigate();
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IFormInput>({ resolver: yupResolver(schema) });
    
      useEffect(() => {
        setValue("name", "Harrys");
      }, [setValue]);

    const columnHelper = createColumnHelper<Player>();

    const columns = [
        columnHelper.accessor("id", {
            header: () => "",
            cell: (info) => (
                <input
                    type="checkbox"
                    value={parseInt(info.getValue(), 10)}
                    {...register("players")}
                />
            ),
        }),
        columnHelper.accessor("id", {
          header: () => "ID",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("name", {
          header: () => "Name",
          cell: (info) => info.getValue(),
        }),
        columnHelper.accessor("age", {
          header: () => "Age",
          cell: (info) => info.getValue(),
        })
    ];
  

  const onSubmit = (data: Team) => {
    saveTeam(data);
    return navigate("/magical-team");
  };

  return (
    <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register("name")} />
        {errors.name && <p>{errors.name.message}</p>}

        <label>Description</label>
        <input {...register("slogan")} />

        <TablePlayers columns={columns} />
        {errors.players && <p>{errors.players.message}</p>}

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