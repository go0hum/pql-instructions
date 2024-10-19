import styled from "styled-components";
import { TablePlayers } from "./TablePlayers";

export const ChoosePlayer = () => {
    return (
        <Container>
            <h1>Players</h1>
            <TablePlayers />
        </Container>
    );
}
const Container =styled.div`
  
`