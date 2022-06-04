import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Button, Icon, Image, Input} from "semantic-ui-react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    createEmployeeAction,
    fetchDataAction,
    filterEmployeeAction,
    removeEmployeeAction,
    updateEmployeeAction
} from "../../actions/employeesActions";
import LoaderWidget from "../../components/LoaderWidget";
import ModalWindow from "../../components/ModalWindow";
import DefaultAvatar from "../../components/DefaultAvatar";
import {prepareImgUpload} from "../../utils/imgUtils";
import EmployeeRolesSelector from "../../components/EmployeeRolesSelector";
import {employeeRoleToString} from "../../utils/constants/employee_roles";
import CalendarWidgetPopup from "../../components/CalendarWidgetPopup";

const EmployeesPage = ({
    fetchDataAction,
    createEmployeeAction,
    updateEmployeeAction,
    removeEmployeeAction,
    filterEmployeeAction,
    myOrgId,
    data,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [createModal, setCrateModal] = useState(false);
    const [editUserId, setEditUserId] = useState(null);
    const [removeUserId, setRemoveUserId] = useState(null);
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [role, setRole] = useState(null);
    const [file, setFile] = useState(undefined);
    const [photo, setPhoto] = useState(undefined);
    const [openCalendar, setOpenCalendar] = useState(false);

    useEffect(() => {
        fetchDataAction(myOrgId)
            .then(() => setIsLoading(false));
    }, [fetchDataAction, myOrgId]);

    const prepareData = (params) => {
        let formData = new FormData();

        for (let param in params) {
            formData.append(param, params[param]);
        }
        return formData;
    }

    const createEmployeeHandler = () => {
        const employee = {
            name: name,
            organizationId: myOrgId,
            birthday: birthday,
            role: role,
        }

        if (file) {
            employee.img = file;
        }
        const employeeData = prepareData(employee);
        createEmployeeAction(employeeData)
            .then(() => {
                clearCreatingFields();
                setCrateModal(false);
            });
    }

    const updateEmployeeHandler = (employee = null) => {
        if (employee !== null) {
            setName(employee.fullName);
            setBirthday(employee.birthday);
            setRole(employee.role);
            setPhoto(employee.photo);
            setEditUserId(employee._id);
            return true;
        }

        const updateData = {
            fullName: name,
            birthday,
            role,
        }

        if (file) {
            updateData.img = file;
        }
        const employeeData = prepareData(updateData);

        updateEmployeeAction(editUserId, employeeData)
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
        setRole(null);
        setFile(undefined);
        setPhoto(undefined);
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
                    role={role}
                    setRole={setRole}
                    img={photo}
                    setImg={setPhoto}
                    file={file}
                    setFile={setFile}
                    onCalendarOpen={() => setOpenCalendar(true)}
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
                    role={role}
                    setRole={setRole}
                    img={photo}
                    setImg={setPhoto}
                    file={file}
                    setFile={setFile}
                    onCalendarOpen={() => setOpenCalendar(true)}
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
            <CalendarWidgetPopup
                isOpen={openCalendar}
                onDateChanged={setBirthday}
                onClose={() => setOpenCalendar(false)}
                strValue={birthday}
            />
        </>
    };

    if (isLoading) {
        return <LoaderWidget />
    }

    return (
        <div id="EmployeesPage" className="Page">
            {modalBuilder()}
            <SearchBar
                onAddTap={() => setCrateModal(true)}
                searchString={data.searchString}
                onFilterChanged={filterEmployeeAction}
            />
            <EmployeesList
                data={data.employees}
                searchString={data.searchString}
                onEditTap={updateEmployeeHandler}
                onRemoveTap={setRemoveUserId}
            />
        </div>
    );
};

const actions = {
    fetchDataAction,
    createEmployeeAction,
    updateEmployeeAction,
    removeEmployeeAction,
    filterEmployeeAction,
};
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);
const mapStateToProps = ({admin, employees}) => ({
    myOrgId: admin.data.organizationId,
    data: employees,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(EmployeesPage);

const SearchBar = ({onAddTap, searchString, onFilterChanged}) => {
    return(
        <div className="SearchBar">
            <div className="searchWrapper">
                <Input
                    placeholder="Пошук..."
                    value={searchString}
                    onChange={(e) => onFilterChanged(e.target.value)}
                />
            </div>
            <Button
                onClick={onAddTap}
            >Додати</Button>
        </div>
    );
}

const EmployeesList = ({data, searchString, onEditTap, onRemoveTap}) => {
    const employees = searchString === ''
        ? data
        : data.filter(el => {
            const parts = el.fullName.split(' ');
            const exist = parts.filter(part => part.toLowerCase().includes(searchString.toLowerCase()));
            return exist.length !== 0 || el.fullName.toLowerCase().includes(searchString.toLowerCase());
        });
    return(
        <div className="EmployeesList">
            <div className="header">
                <div className="logo"/>
                <div className="name">Ф.І.О.</div>
                <diiv className="role">Роль</diiv>
                <div className="date">Дата</div>
                <div className="actions"/>
            </div>
            { employees.length
                ? employees.map(el => <EmployeesListItem
                    key={el._id}
                    data={el}
                    onEditTap={() => onEditTap(el)}
                    onRemoveTap={() => onRemoveTap(el._id)}
                />)
                : <div className="empty">Працівників не знайдено</div>
            }
        </div>
    );
}

const EmployeesListItem = ({data, onEditTap, onRemoveTap}) => {
    return(
        <div className="EmployeesListItem">
            <div className="logo">
                {data.photo
                    ? <Image src={process.env.REACT_APP_API_URL  + data.photo} />
                    : <DefaultAvatar name={data.fullName} />
                }
            </div>
            <div className="name">{data.fullName}</div>
            <div className="role">{employeeRoleToString(data.role)}</div>
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
    setBirthday,
    role,
    setRole,
    file,
    setFile,
    img,
    setImg,
    onCalendarOpen,
}) => {
    const handleUploadFile = e => {
        return prepareImgUpload(e, setImg, setFile);
    };

    return(
        <div className="CreateEmployeeModal">
            <div className="logo">
                { !file && !img && <DefaultAvatar name={name} width={150} />}
                { file && img && <Image src={img} />  }
                { !file && img && <Image src={process.env.REACT_APP_API_URL + img} />  }
            </div>
            <div className="changeLogo">
                <label htmlFor="upload-photo">
                    <Icon name="photo" />
                    Додати фото (опціонально)
                </label>
                <input type="file" name="photo" id="upload-photo"
                       onChange={e => handleUploadFile(e)}
                />
            </div>
            <Input
                label={'П.І.Б.'}
                fluid
                placeholder='Введіть П.І.Б. ...'
                value={name}
                onChange={(e) => setName(e.target.value)}
                // error={name}
            />
            <div className="dateOfBirth">
                <Input
                    label={'Дата народження'}
                    fluid
                    placeholder='Дата народження ...'
                    value={birthday}
                    // error={name}
                />
                <div className="calendarIcon" onClick={() => onCalendarOpen()}>
                    <Icon name='calendar alternate outline' />
                </div>
            </div>
            <EmployeeRolesSelector
                role={role}
                onChange={setRole}
            />
        </div>
    );
}