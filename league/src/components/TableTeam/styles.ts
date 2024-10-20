import styled from 'styled-components';

export const Container = styled.div`
    .table {
        table-layout: fixed;
        width: 100%;
        border-collapse: collapse;
        background: #fff;
        .table-cell {
            border: 1px solid #d7b972;
            text-align: left;
            padding: 0.3rem 0.5rem;
            background: #1e2328;
            .linkTeam {
                cursor: pointer;
                color: #d7b972;
                text-decoration: underline;
            }
        }
    }
`;
