import styled from "styled-components";
import { FormPlayer } from "../components/FormPlayer";

export const PlayerAdd = () => {      
    return (
        <Container>
            <h1>Agregar Player</h1>
            <FormPlayer />
        </Container>
    );
}
const Container =styled.div`
    padding: 2rem 3rem;
`