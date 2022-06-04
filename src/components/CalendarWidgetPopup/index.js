import React from 'react';
import Calendar from "react-calendar";
import './styles.scss';
import {Modal} from "semantic-ui-react";

const CalendarWidgetPopup = ({
    isOpen,
    onClose = () => {},
    onDateChanged = (date) => {},
    strValue = null,
 }) => {
    const strValueConvert = (str) => {
        if (strValue == null) return null;

        const parts = strValue.split('.');
        if (parts.length !== 3) return null;

        const year = parts[2];
        const month = Number(parts[1]) - 1;
        const day = parts[0];

        return new Date(year, month, day);
    }

    const value = strValueConvert(strValue);

    const chooseDateHandler = (value) => {
        const day = value.getDate();
        const month = value.getMonth() + 1;
        const year = value.getFullYear();

        const dateStr = `${day < 10 ? `0${day}` : day}.${month < 10 ? `0${month}` : month}.${year}`;
        onDateChanged(dateStr)
        onClose();
    }

    return (
        <Modal
            className="ModalWindow Calendar"
            onClose={() => onClose()}
            open={isOpen}
        >
            <Modal.Header>Оберіть дату</Modal.Header>
            <Modal.Content>
                <div className="CalendarWidgetPopup">
                    <Calendar
                        onChange={(value) => chooseDateHandler(value)}
                        value={value}
                        locale='uk-UA'
                    />
                </div>
            </Modal.Content>
        </Modal>
    );
};

export default CalendarWidgetPopup;