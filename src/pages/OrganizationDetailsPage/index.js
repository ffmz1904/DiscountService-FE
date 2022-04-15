import React, {useEffect, useState} from 'react';
import './styles.scss';
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchDataAction, removeDiscountAction, setDiscountAction} from "../../actions/organizationDetailsActions";
import LoaderWidget from "../../components/LoaderWidget";
import {Icon, Image, Input} from "semantic-ui-react";
import defaultImg from "../../assets/img/default-img.svg";
import ModalWindow from "../../components/ModalWindow";

const OrganizationDetailsPage = ({
    fetchDataAction,
    setDiscountAction,
    removeDiscountAction,
    data = null,
}) => {
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [showDiscountMenu, setShowDiscountMenu] = useState(false);
    const [discountModal, setDiscountModal] = useState(false);
    const [discountValue, setDiscountValue] = useState('');
    const [deleteDiscountModal, setDeleteDiscountModal] = useState(false);


    const clearActionHandler = () => {
        if (showDiscountMenu) {
            setShowDiscountMenu(false);
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
                onClose={() => setDiscountModal(false)}
                onSuccess={() => handleDeleteDiscount()}
                headerText={`Відмінити знижку для ${data.orgData.name}?`}
                modalWidth='400px'
                body={`Ви впевнені що хочете відмінити знижку для ${data.orgData.name}?`}
            />
        </>);
    }

    if (isLoading || data.isEmpty) {
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
        </div>
    );
};

const actions = {fetchDataAction, setDiscountAction, removeDiscountAction};
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
                        <Image src={defaultImg} />
                    </div>
                </div>
                <div className="right">
                    <div className="info">
                        <div className="name">{data.orgData.name}</div>
                        <div className="empCount">Працівників: 12</div>
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