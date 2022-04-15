import React from 'react';
import {Button, Modal} from "semantic-ui-react";
import './styles.scss';

const ModalWindow = ({
    isOpen,
    onClose = () => {},
    headerText = null,
    onSuccess = () => {},
    onReject = () => {},
    successLabel = null,
    rejectLabel = null,
    body = null,
    modalWidth = null,
}) => {
    // const [open, setOpen] = useState(false);

    const onSuccessHandler = () => {
        onSuccess();
    }

    const onRejectHandler = () => {
        onReject();
        onClose();
    }

    return (
        <Modal
            className="ModalWindow"
            style={{ width: modalWidth ?? 'inherit' }}
            onClose={() => onClose()}
            // onOpen={() => setOpen(true)}
            open={isOpen}
        >
            { headerText && <Modal.Header>{headerText}</Modal.Header> }
            <Modal.Content>
                <Modal.Description>
                    { body }
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => onRejectHandler()}>{ rejectLabel ?? 'Ні' }</Button>
                <Button color='green' onClick={() => onSuccessHandler()}>{ successLabel ?? 'Так' }</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default ModalWindow;