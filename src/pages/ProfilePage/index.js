import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Icon, Image, Input, TextArea} from "semantic-ui-react";
import defaultImg from "../../assets/img/default-img.svg";
import {logoutAction} from "../../actions/adminActions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchDataAction, updateOrgDataAction} from "../../actions/profileActions";
import LoaderWidget from "../../components/LoaderWidget";
import ModalWindow from "../../components/ModalWindow";
import {prepareImgUpload} from "../../utils/imgUtils";

const ProfilePage = ({
    fetchDataAction,
    updateOrgDataAction,
    logoutAction,
    data,
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [logout, setLogout] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editFormData, setEditFormData] = useState(null);
    const [file, setFile] = useState(undefined);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        fetchDataAction()
            .then(() => setIsLoading(false));
    }, [fetchDataAction, updateOrgDataAction]);

    const logoutHandler = () => {
        logoutAction();
    }

    const clearError = name => {
        const errorsArr = errors.filter(el => el !== name);
        setErrors(errorsArr);
    }

    // Editing
    const startOrgEditing = () => {
        setEditFormData({
            name: data.orgData.name,
            description: data.orgData.description,
            logo: data.orgData.logo,
        });
        setIsEdit(true);
    }

    const validateEditing = () => {
        const errorsArr = [];
        if (editFormData.name.length < 3) {
            errorsArr.push('name');
        }
        return errorsArr;
    }

    const handleOrgEditing = () => {
        const errorsArr = validateEditing();
        if (errorsArr.length) {
            setErrors(errorsArr);
            return false;
        }

        const updateData = {
            name: editFormData.name,
            description: editFormData.description,
        };
        if (file) {
            updateData.img = file;
        }
        const data = prepareData(updateData);
        updateOrgDataAction(data);
        setIsEdit(false);
    }

    const prepareData = (params) => {
        let formData = new FormData();

        for (let param in params) {
            formData.append(param, params[param]);
        }
        return formData;
    }

    if (isLoading) {
        return <LoaderWidget />
    }

    const modalBuilder = () => {
        return <>
            <ModalWindow
                isOpen={logout}
                onClose={() => setLogout(false)}
                headerText='Покинути  кабінет?'
                modalWidth='500px'
                body={'Для продовження роботи вам потрібно буде авторизуватись'}
                onSuccess={() => logoutHandler()}
            />
            <ModalWindow
                isOpen={isEdit}
                onClose={() => {
                    setIsEdit(false);
                }}
                headerText='Оновити дані організації'
                modalWidth='500px'
                successLabel="Зберегти"
                rejectLabel='Назад'
                body={<EditOrgData
                    data={editFormData}
                    setEditData={setEditFormData}
                    skipError={clearError}
                    errors={errors}
                    file={file}
                    setFile={setFile}
                />}
                onSuccess={handleOrgEditing}
            />
        </>;
    }

    return (
        <div id="ProfilePage" className="Page">
            {modalBuilder()}
            <MyOrganization
                data={data.orgData}
                onLogoutTap={() => setLogout(true)}
                onEditTap={() => startOrgEditing()}
            />
        </div>
    );
};

const actions = {logoutAction, fetchDataAction, updateOrgDataAction};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = ({profile}) => ({
    data: profile,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ProfilePage);

const MyOrganization = ({
    data,
    onLogoutTap,
    onEditTap,
}) => {
    return(
        <div className="MyOrgContainer">
            <div className="columns">
                <div className="left">
                    <div className="logo">
                        <Image src={data.logo
                            ? process.env.REACT_APP_API_URL + data.logo
                            : defaultImg
                        } />
                    </div>
                </div>
                <div className="right">
                    <div className="name">{data.name}</div>
                    <div className="empCount">Працівників: {data.employeesCount}</div>
                    <div className="settings">
                        <span className="edit" onClick={onEditTap}>
                            <Icon name='edit'/>
                        </span>
                        <span className="logout" onClick={onLogoutTap}>
                            <Icon name='log out' />
                        </span>
                    </div>
                </div>
            </div>
            <div className="description">
                <h5>Опис:</h5>
                <div className="text">{data.description}</div>
            </div>
        </div>
    );
}

const EditOrgData = ({
    data,
    setEditData,
    file,
    setFile,
    skipError,
    errors
}) => {
    const setLogo = (value) => {
        onEditingChanged('logo', value);
    }

    const handleUploadFile = e => {
        return prepareImgUpload(e, setLogo, setFile);
    };

    const onEditingChanged = (key, value) => {
        const updatedData = {...data, [key]: value};
        setEditData(updatedData);
    }

    return(
        <div className="EditOrgData">
            <div className="logo">
                { !file && <Image
                    src={data.logo
                        ? process.env.REACT_APP_API_URL + data.logo
                        : defaultImg
                    } />
                }
                { file && data.logo && <Image src={data.logo} />  }
            </div>
            <div className="changeLogo">
                <label htmlFor="upload-photo">
                    <Icon name="photo" />
                    Змінити...
                </label>
                <input type="file" name="photo" id="upload-photo"
                    onChange={e => handleUploadFile(e)}
                />
            </div>
            <Input
                fluid
                placeholder='Назва організації'
                value={data.name}
                onChange={(e) => {
                    skipError('name');
                    onEditingChanged('name', e.target.value);
                }}
                error={errors.includes('name')}
            />
            <TextArea
                placeholder='Опис (Чим займається ваша організація? Які послуги надає?)'
                value={data.description}
                onChange={(e) => {
                    skipError('description');
                    onEditingChanged('description', e.target.value);
                }}
                error={errors.includes('description')}
            />
        </div>
    );
}