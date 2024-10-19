import styled from "styled-components";
import { FormTeam } from "../components/FormTeam";

export const PlayerManagementAdd = () => {      
    return (
        <Container>
            <h1>Agregar Team</h1>
            <FormTeam />
        </Container>
    );
}
const Container =styled.div`
    padding: 2rem 3rem;
`