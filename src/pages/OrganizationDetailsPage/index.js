import React, {useEffect, useState} from 'react';
import './styles.scss';
import {useParams} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchDataAction} from "../../actions/organizationDetailsActions";
import LoaderWidget from "../../components/LoaderWidget";
import {Icon, Image} from "semantic-ui-react";
import defaultImg from "../../assets/img/default-img.svg";

const OrganizationDetailsPage = ({fetchDataAction, data}) => {
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [showDiscountMenu, setShowDiscountMenu] = useState(false);

    const clearActionHandler = () => {
        if (showDiscountMenu) {
            setShowDiscountMenu(false);
        }
    }

    useEffect(() => {
        fetchDataAction(params.id).then(() => setIsLoading(false));
    }, [fetchDataAction]);

    if (isLoading) {
        return <LoaderWidget />
    }

    return (
        <div id='OrganizationDetailsPage' className='Page' onClick={() => clearActionHandler()}>
            <OrganizationData
                currentOrgId={params.id}
                data={data}
                showMenu={showDiscountMenu}
                setShowMenu={setShowDiscountMenu}
            />
        </div>
    );
};

const actions = {fetchDataAction};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = ({organizationDetails, admin}) => ({
    data: organizationDetails,
    myOrgId: admin.data.organizationId,
});
export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(OrganizationDetailsPage);

const OrganizationData = ({currentOrgId, myOrgId, data, showMenu, setShowMenu}) => {
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
                        <div className="name">{data.name}</div>
                        <div className="empCount">Працівників: 12</div>
                    </div>
                    <div className="actions">
                        <Icon name='ellipsis vertical' onClick={() => setShowMenu(true)} />
                        { showMenu &&
                        <div className="menu">
                            <div className="set">Надати знижку</div>
                            <div className="remove">Відмінити знижку</div>
                        </div>
                        }
                    </div>
                </div>
            </div>
            <div className="description">
                <h5>Опис:</h5>
                <div className="text">{data.description}</div>
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
    const discountForYou = discountsFromOrg !== null && !discountsFromOrg.length
        ? discountsFromOrg.filter(el => el.id === myOrgId)[0]
        : null
    const discountFromYou = discountsForOrg !== null && !discountsForOrg.length
        ? discountsForOrg.filter(el => el.id === currentOrgId)[0]
        : null;

    return(
        <div className="discountInfo">
            { discountForYou !== null &&
            <div className="forYou">
                <span className="text">Знижка для вас</span>
                <span className="separator">-</span>
                <span className="discountPercent">5%</span>
            </div>
            }
            { discountFromYou && discountForYou &&
                <span className="separator">|</span>
            }
            {
                discountFromYou !== null &&
                <div className="fromYou">
                    <span className="text">Надана знижка</span>
                    <span className="separator">-</span>
                    <span className="discountPercent">7%</span>
                </div>
            }
        </div>
    );
}