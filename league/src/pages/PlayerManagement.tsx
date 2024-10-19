import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { TablePlayers } from "../components/TablePlayers";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createColumnHelper } from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";

interface IFormInput {
    players: Player[];
}

interface Player {
    id: number;
};

const schema = yup.object().shape({
    players: yup.array()
    .of(yup.string()) 
    .required("Players is required")
    .min(1, "Al menos debe tener un Jugador")
    .typeError("Debes seleccionar un Jugador"),
});

export const PlayerManagement: React.FC = () => {
    let navigate = useNavigate();
    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IFormInput>({ resolver: yupResolver(schema) });

    const columnHelper = createColumnHelper<Player>();

    const columns = [
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
        }),
        columnHelper.accessor("position", {
            header: () => "Position",
            cell: (info) => info.getValue(),
          }),
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
    ];
  

  const onSubmit = async (data: FormData) => {
    const deleteRequests = data.players.map(id => 
        fetch(`http://localhost:3001/api/players/${parseInt(id, 10)}`, {
            method: 'DELETE'
        })
    );

    try {
        await Promise.all(deleteRequests);
        console.log("Registros eliminados con éxito");
    } catch (error) {
        console.error("Error al eliminar registros:", error);
    }
    return navigate("/player-management");
  };

  return (
    <Container>
        <h1>Players</h1>
        <Link to="/player-management/add">Agregar Player</Link>
        <form onSubmit={handleSubmit(onSubmit)}>
        <TablePlayers columns={columns} />
        {errors.players && <p>{errors.players.message}</p>}
        <input type="submit" value="Eliminar" />
        </form>
    </Container>
  );
};

const Container = styled.div`
padding: 2rem 3rem;
form {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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
}

a:hover {
  background-color: #0056b3;
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