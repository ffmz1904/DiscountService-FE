import React, {useEffect, useState} from 'react';
import './styles.scss';
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {
    fetchDataAction,
    filterEmployeeAction,
    removeDiscountAction,
    setDiscountAction,
    setPersonalDiscount,
    removePersonalDiscount
} from "../../actions/organizationDetailsActions";
import {updateDiscount} from '../../actions/employeesActions';
import LoaderWidget from "../../components/LoaderWidget";
import {Icon, Image, Input} from "semantic-ui-react";
import defaultImg from "../../assets/img/default-img.svg";
import ModalWindow from "../../components/ModalWindow";
import DefaultAvatar from "../../components/DefaultAvatar";
import {employeeRoleToString} from "../../utils/constants/employee_roles";

const OrganizationDetailsPage = ({
    fetchDataAction,
    setDiscountAction,
    removeDiscountAction,
    filterEmployeeAction,
    setPersonalDiscount,
    removePersonalDiscount,
    data = null,
    myOrgId,
}) => {
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [showDiscountMenu, setShowDiscountMenu] = useState(false);
    const [showUserDiscountMenu, setShowUserDiscountMenu] = useState(null);
    const [discountModal, setDiscountModal] = useState(false);
    const [userDiscountModal, setUserDiscountModal] = useState(null);
    const [discountValue, setDiscountValue] = useState('');
    const [deleteDiscountModal, setDeleteDiscountModal] = useState(false);
    const [deleteUserDiscountModal, setDeleteUserDiscountModal] = useState(null);

    const clearActionHandler = () => {
        if (showDiscountMenu) {
            setShowDiscountMenu(false);
        }
        if (showUserDiscountMenu) {
            setShowUserDiscountMenu(false);
        }
    }

    const handleSetDiscount = () => {
        if (discountValue < 1 || discountValue > 99) {
            return false;
        }
        setDiscountAction(params.id, { percent: Number(discountValue) })
            .then(() => {
                setDiscountModal(false);
                setDiscountValue('');
            });
    }

    const handleDeleteDiscount = () => {
        removeDiscountAction(params.id)
            .then(() => setDeleteDiscountModal(false));
    }

    const handleSetUserDiscountTap = (userId) => {
        if (discountValue < 1 || discountValue > 99) {
            return false;
        }
        setPersonalDiscount(userId, Number(discountValue))
            .then(() => {
                setUserDiscountModal(null);
                setDiscountValue('');
            });
    }

    const handleRemoveUserDiscountTap = (userId) => {
        removePersonalDiscount(userId)
            .then(() => setDeleteUserDiscountModal(null));
    }

    const getUserName = (userId) => {
        const user = data.employees.filter(user => user._id === userId);
        if (user.length) {
            return user[0].fullName;
        }
        return '';
    }

    useEffect(() => {
        fetchDataAction(params.id).then(() => setIsLoading(false));
    }, [fetchDataAction, params.id]);

    const modalBuilder = () => {
        return (<>
            <ModalWindow
                isOpen={discountModal}
                onClose={() => setDiscountModal(false)}
                onSuccess={() => handleSetDiscount()}
                headerText={`Знижка для ${data.orgData.name}:`}
                modalWidth='400px'
                successLabel='Надати'
                rejectLabel='Назад'
                body={<SetDiscountModal discount={discountValue} setDiscount={setDiscountValue} />}
            />
            <ModalWindow
                isOpen={deleteDiscountModal}
                onClose={() => setDeleteDiscountModal(false)}
                onSuccess={() => handleDeleteDiscount()}
                headerText={`Відмінити знижку для ${data.orgData.name}?`}
                modalWidth='400px'
                body={`Ви впевнені що хочете відмінити знижку для ${data.orgData.name}?`}
            />
            <ModalWindow
                isOpen={userDiscountModal != null}
                onClose={() => setUserDiscountModal(null)}
                onSuccess={() => handleSetUserDiscountTap(userDiscountModal)}
                headerText={`Знижка для ${getUserName(userDiscountModal)}`}
                modalWidth='400px'
                body={<SetDiscountModal discount={discountValue} setDiscount={setDiscountValue} />}
            />
            <ModalWindow
                isOpen={deleteUserDiscountModal !== null}
                onClose={() => setDeleteUserDiscountModal(null)}
                onSuccess={() => handleRemoveUserDiscountTap(deleteUserDiscountModal)}
                headerText={`Відмінити знижку для ${getUserName(deleteUserDiscountModal)}?`}
                modalWidth='400px'
                body={`Ви впевнені що хочете відмінити знижку для ${getUserName(deleteUserDiscountModal)}?`}
            />
        </>);
    }

    if (isLoading) {
        return <LoaderWidget />
    }

    return (
        <div
            id='OrganizationDetailsPage'
            className='Page'
            onClick={() => clearActionHandler()}
        >
            { modalBuilder() }
            <OrganizationData
                currentOrgId={params.id}
                data={data}
                showMenu={showDiscountMenu}
                setShowMenu={setShowDiscountMenu}
                onSetDiscountTap={() => setDiscountModal(true)}
                onRemoveDiscountTap={() => setDeleteDiscountModal(true)}
            />
            <EmployeesTable
                data={data.employees}
                searchString={data.searchString}
                onFilterChanged={filterEmployeeAction}
                showMenu={showUserDiscountMenu}
                setShowMenu={setShowUserDiscountMenu}
                currentOrgId={myOrgId}
                onSetDiscountTap={() => setUserDiscountModal(showUserDiscountMenu)}
                onRemoveDiscountTap={setDeleteUserDiscountModal}
            />
        </div>
    );
};

const actions = {
    fetchDataAction,
    setDiscountAction,
    removeDiscountAction,
    filterEmployeeAction,
    setPersonalDiscount,
    removePersonalDiscount,
};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = ({organizationDetails, admin}) => ({
    data: organizationDetails,
    myOrgId: admin.data.organizationId,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrganizationDetailsPage);

const OrganizationData = ({
    data,
    showMenu,
    setShowMenu,
    onSetDiscountTap,
    onRemoveDiscountTap,
}) => {
    const discountFromYouExist = data.myOrgData.discounts !== null
        ? data.myOrgData.discounts.filter(el => el.id === data.orgData._id)[0]
        : null;

    return(
        <div className="OrganizationData">
            <div className="columns">
                <div className="left">
                    <div className="logo">
                        <Image src={data.orgData.logo
                            ? process.env.REACT_APP_API_URL + data.orgData.logo
                            : defaultImg
                        } />
                    </div>
                </div>
                <div className="right">
                    <div className="info">
                        <div className="name">{data.orgData.name}</div>
                        <div className="empCount">Працівників: {data.orgData.employeesCount}</div>
                    </div>
                    <div className="actions">
                        <Icon name='ellipsis vertical' onClick={() => setShowMenu(true)} />
                        { showMenu &&
                        <div className="menu">
                            <div className="set" onClick={onSetDiscountTap}>
                                { !discountFromYouExist ? 'Надати знижку' : 'Оновити знижку'}
                            </div>
                            { discountFromYouExist &&
                                <div className="remove" onClick={onRemoveDiscountTap}>
                                    Відмінити знижку
                                </div>
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
            <div className="description">
                <h5>Опис:</h5>
                <div className="text">{data.orgData.description}</div>
            </div>
            <DiscountInfo
                myOrgId={data.myOrgData._id}
                currentOrgId={data.orgData._id}
                discountsFromOrg={data.orgData.discounts}
                discountsForOrg={data.myOrgData.discounts}
            />
        </div>
    );
}

const DiscountInfo = ({myOrgId, currentOrgId, discountsFromOrg, discountsForOrg}) => {
    const discountForYou = discountsFromOrg !== null && discountsFromOrg.length > 0
        ? discountsFromOrg.filter(el => el.id === myOrgId).shift()
        : null;
    const discountFromYou = discountsForOrg !== null && discountsForOrg.length > 0
        ? discountsForOrg.filter(el => el.id === currentOrgId).shift()
        : null;

    return(
        <div className="discountInfo">
            { discountForYou &&
            <div className="forYou">
                <span className="text">Знижка для вас</span>
                <span className="separator">-</span>
                <span className="discountPercent">{discountForYou.percent}%</span>
            </div>
            }
            { discountFromYou && discountForYou &&
                <span className="separator">|</span>
            }
            {
                discountFromYou &&
                <div className="fromYou">
                    <span className="text">Надана знижка</span>
                    <span className="separator">-</span>
                    <span className="discountPercent">{discountFromYou.percent}%</span>
                </div>
            }
        </div>
    );
}

const SetDiscountModal = ({ discount, setDiscount }) => {
    return (
        <div className="SetDiscountModal">
            <Input
                fluid
                type="number"
                min={1}
                max={99}
                placeholder='Знижка (%)'
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                error={discount !== '' && (discount < 1 || discount > 99)}
            />
        </div>
    );
}

const EmployeesTable = ({
    data,
    searchString,
    onFilterChanged,
    showMenu,
    setShowMenu,
    currentOrgId,
    onSetDiscountTap,
    onRemoveDiscountTap
}) => {
    const employees = searchString === ''
        ? data
        : data.filter(el => {
           const parts = el.fullName.split(' ');
           const exist = parts.filter(part => part.toLowerCase().includes(searchString.toLowerCase()));
           return exist.length !== 0 || el.fullName.toLowerCase().includes(searchString.toLowerCase());
        });
    return(
        <div className="EmployeesTable">
            <div className="header">
                <div className="title">
                    <Icon name="users"/>
                    <span>Працівники</span>
                </div>
                <div className="searchWrapper">
                    <Input
                        placeholder="Пошук..."
                        value={searchString}
                        onChange={(e) => onFilterChanged(e.target.value)}
                    />
                </div>
            </div>
            <div className="elWrapper">
                { employees.length >  0
                    ? employees.map(el => <EmployeesTableItem
                        key={el._id}
                        data={el}
                        showMenu={showMenu}
                        setShowMenu={setShowMenu}
                        currentOrgId={currentOrgId}
                        onSetDiscountTap={onSetDiscountTap}
                        onRemoveDiscountTap={onRemoveDiscountTap}
                    />)
                    : <div className="empty">Працівників не знайдено</div>
                }
            </div>
        </div>
    );
}

const EmployeesTableItem = ({
    data,
    showMenu,
    setShowMenu,
    currentOrgId,
    onSetDiscountTap,
    onRemoveDiscountTap,
}) => {
    const hasPersonalDiscount = data.personalDiscounts.filter(discount => discount.id === currentOrgId).length !== 0
        ? data.personalDiscounts.filter(discount => discount.id === currentOrgId)[0]
        : null;

    return(
        <div className="EmployeesTableItem">
            <div className="actions">
                <Icon name='ellipsis vertical' onClick={() => setShowMenu(data._id)} />
                { showMenu === data._id &&
                    <div className="menu">
                        <div className="set"
                             onClick={onSetDiscountTap}
                        >
                            { !hasPersonalDiscount ?
                                'Надати знижку' :
                                'Оновити знижку'
                            }
                        </div>
                        { hasPersonalDiscount &&
                            <div className="remove" onClick={() => onRemoveDiscountTap(data._id)}>
                                Відмінити знижку
                            </div>
                        }
                    </div>
                }
            </div>
            <div className="logo">
                { data.photo
                    ? <Image src={ process.env.REACT_APP_API_URL + data.photo} />
                    : <DefaultAvatar name={data.fullName} width={90}/>
                }
            </div>
            <div className="name">{data.fullName}</div>
            <div className="role">{employeeRoleToString(data.role)}</div>
            <div className="personalDiscount">
                {hasPersonalDiscount ? `Персональна знижка - ${hasPersonalDiscount.percent}%` : ''}
            </div>
            <div className="date">{data.birthday}</div>
        </div>
    );
}