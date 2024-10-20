import styled from 'styled-components';

export const Container = styled.div`
    form {
        display: flex;
        flex-direction: column;
        max-width: 800px;
        padding: 1rem;
    }

    label {
        font-size: 1.5rem;
        margin-top: 15px;
        margin-bottom: 5px;
    }

    .input-field input {
        margin-top: 5px;
    }

    input[type='submit'] {
        margin-top: 20px;
        background-color: #1e2328;
        color: #d7b972;
        cursor: pointer;
        border: none;
    }

    input[type='submit']:hover {
        background-color: #5c656d;
    }

    p {
        color: red;
        margin: 5px 0 0 0;
    }
`;
