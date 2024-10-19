import styled from "styled-components";
import { FC, ReactElement } from "react";

interface ModalProps {
    open: boolean;
    onClose: () => void;
    children: ReactElement;
  }
  
  export default function Modal(props: ModalProps): ReturnType<FC> {
    return (
      <Container
        className={`${props.open ? "display-block" : "display-none"}`}
      >
        <div className="modal-main">
          <div className="modal-head">
            <h1>Modal</h1>
          </div>
          <div className="modal-body">{props.children}</div>
          <div className="btn-container">
            <button type="button" className="btn" onClick={props.onClose}>
              Close
            </button>
          </div>
        </div>
      </Container>
    );
  }
  
  const Container = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00000099;
    .modal-main {
        position: fixed;
        background: white;
        width: 35rem;
        height: auto;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 3rem;
    }
    &.display-block {
        display: block;
    }
    &.display-none {
        display: none;
    }
  `