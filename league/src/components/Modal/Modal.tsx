import { Container } from "./styles";
import { ModalProps } from "../../interfaces/ModalProps";

export default function Modal({
    open,
    onClose,
    children,
}: ModalProps): JSX.Element {
    return (
        <Container className={`${open ? 'display-block' : 'display-none'}`}>
            <div className="modal-main">
                <div className="modal-head">
                    <h1>Modal</h1>
                </div>
                <div className="modal-body">{children}</div>
                <div className="btn-container">
                    <button type="button" className="button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </Container>
    );
}
