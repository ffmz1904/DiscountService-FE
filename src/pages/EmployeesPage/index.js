import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Button, Icon, Image, Input} from "semantic-ui-react";
import defaultImage from '../../assets/img/default-img.svg';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    createEmployeeAction,
    fetchDataAction,
    removeEmployeeAction,
    updateEmployeeAction
} from "../../actions/employeesActions";
import LoaderWidget from "../../components/LoaderWidget";
import ModalWindow from "../../components/ModalWindow";

const EmployeesPage = ({
    fetchDataAction,
    createEmployeeAction,
    updateEmployeeAction,
    removeEmployeeAction,
    myOrgId,
    data,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [createModal, setCrateModal] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [removeUserId, setRemoveUserId] = useState(null);
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');

    useEffect(() => {
        fetchDataAction(myOrgId)
            .then(() => setIsLoading(false));
    }, [fetchDataAction, myOrgId]);

    const createEmployeeHandler = () => {
        const employee = {
            name: name,
            organizationId: myOrgId,
            birthday: birthday
        }
        createEmployeeAction(employee)
            .then(() => setCrateModal(false));
    }

    const updateEmployeeHandler = (employee = null) => {
        if (employee !== null) {
            setName(employee.fullName);
            setBirthday(employee.birthday)
            setEditUserId(employee._id);
            return true;
        }

        const updateData = {
            fullName: name,
            birthday,
        }
        updateEmployeeAction(editUserId, updateData)
            .then(() => {
                clearCreatingFields();
                setEditUserId(null);
            });
    }

    const removeEmployeeHandler = () => {
        removeEmployeeAction(removeUserId)
            .then(() => setRemoveUserId(null));
    }

    const clearCreatingFields = () => {
        setName('');
        setBirthday('');
    }

    const modalBuilder = () => {
        return <>
            <ModalWindow
                isOpen={createModal}
                onClose={() => {
                    clearCreatingFields();
                    setCrateModal(false);
                }}
                headerText='Додати працівника'
                modalWidth='500px'
                successLabel="Створити"
                rejectLabel='Назад'
                body={<CreateEmployeeModal
                    name={name}
                    setName={setName}
                    birthday={birthday}
                    setBirthday={setBirthday}
                />}
                onSuccess={() => createEmployeeHandler()}
                onReject={() => clearCreatingFields()}
            />
            <ModalWindow
                isOpen={editUserId != null}
                onClose={() => {
                    clearCreatingFields();
                    setEditUserId(null);
                }}
                headerText='Оновити дані працівника'
                modalWidth='500px'
                successLabel="Зберегти"
                rejectLabel='Назад'
                body={<CreateEmployeeModal
                    name={name}
                    setName={setName}
                    birthday={birthday}
                    setBirthday={setBirthday}
                />}
                onSuccess={() => updateEmployeeHandler()}
                onReject={() => clearCreatingFields()}
            />
            <ModalWindow
                isOpen={removeUserId != null}
                onClose={() => setRemoveUserId(null)}
                headerText='Видалити працівника?'
                modalWidth='500px'
                body={'Дані неможливо буде відновити. \n Ви впевнені що хочете видалити працівника?'}
                onSuccess={() => removeEmployeeHandler()}
            />
        </>
    };

    if (isLoading) {
        return <LoaderWidget />
    }

    return (
        <div id="EmployeesPage" className="Page">
            {modalBuilder()}
            <SearchBar onAddTap={() => setCrateModal(true)} />
            <EmployeesList
                data={data.employees}
                onEditTap={updateEmployeeHandler}
                onRemoveTap={setRemoveUserId}
            />
        </div>
    );
};

const actions = {fetchDataAction, createEmployeeAction, updateEmployeeAction, removeEmployeeAction};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
const mapStateToProps = ({admin, employees}) => ({
    myOrgId: admin.data.organizationId,
    data: employees,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EmployeesPage);

const SearchBar = ({onAddTap}) => {
    return(
        <div className="SearchBar">
           <span>Search Bar</span>
            <Button
                onClick={onAddTap}
            >Додати</Button>
        </div>
    );
}

const EmployeesList = ({data, onEditTap, onRemoveTap}) => {
    return(
        <div className="EmployeesList">
            <div className="header">
                <div className="logo"/>
                <div className="name">Ф.І.О.</div>
                <div className="date">Дата</div>
                <div className="actions"/>
            </div>
            {
                data.map(el => <EmployeesListItem
                    key={el._id}
                    data={el}
                    onEditTap={() => onEditTap(el)}
                    onRemoveTap={() => onRemoveTap(el._id)}
                />)
            }
        </div>
    );
}

const EmployeesListItem = ({data, onEditTap, onRemoveTap}) => {
    return(
        <div className="EmployeesListItem">
            <div className="logo">
                <Image src={defaultImage} />
            </div>
            <div className="name">{data.fullName}</div>
            <div className="date">{data.birthday}</div>
            <div className="actions">
                <span className="edit" onClick={onEditTap}>
                    <Icon name='edit'/>
                </span>
                <span className="remove" onClick={onRemoveTap}>
                    <Icon name='remove user' />
                </span>
            </div>
        </div>
    );
}

const CreateEmployeeModal = ({
    name,
    setName,
    birthday,
    setBirthday
}) => {
    return(
        <div className="CreateEmployeeModal">
            <Input
                label={'П.І.Б.'}
                fluid
                placeholder='Введіть П.І.Б. ...'
                value={name}
                onChange={(e) => setName(e.target.value)}
                // error={name}
            />
            <Input
                label={'Дата народження'}
                fluid
                placeholder='Дата народження ...'
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                // error={name}
            />
        </div>
    );
}