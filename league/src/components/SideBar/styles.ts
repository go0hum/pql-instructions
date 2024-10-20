import styled from "styled-components";

export const Container = styled.div`
  color: #202020;
  position:sticky;
  background: #5F3A02;
  padding-top: 20px;
  height: 100%;
  min-height: 100vh;
  .close {
    position: absolute;
    top: 100px;
    right: -18px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 0 4px #000, 0 0 7px #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s;
    transform: ${({isOpen}) => 
        (isOpen?`initial`: `rotate(180deg)`)
    };
    svg {
        fill: #1E2328;
    }
  }
  .Logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 2rem;
    padding: 1rem;
    .imgOut {
        display: flex;
        img {
            border-radius: 50%; 
            max-width: 100%;
            height: auto;
        }
        cursor: pointer;
        transition: all 0.3s;
        transform: display: ${({isOpen}) => 
            (isOpen?`scale(0.7)`: `scale(1.5)`)
        };
    }
    h2 {
        display: ${({isOpen}) => 
            (isOpen?`block`: `none`)
        };
    }
  }
  .LinkContainer {
    padding-left: 1rem;
    :hover {
        background: #FEE9A6;
    }
    .Links {
        text-decoration: none;
        align-items: center;
        display: flex;
        .linkicon {
            padding: .2rem 1rem;
            display: flex;
            svg {
                font-size: 22px;
            }
        }
        &.active {
            .linkicon {
                svg {
                    fill: #1E2328;
                }
            }
            span {
                color: #06120E;
            }
        }
    }
  }
`;

export const Divider = styled.div`
    height: 1px;
    width: 100%;
    background: #E6E8EB;
    margin: 10px 0;
`;