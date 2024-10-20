import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000099;
    .modal-main {
        position: fixed;
        background: #1e2328;
        min-width: 15rem;
        height: auto;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        .modal-body {
            margin: 1.5rem;
        }
    }
    &.display-block {
        display: block;
    }
    &.display-none {
        display: none;
    }
`;