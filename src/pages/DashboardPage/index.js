import React, {useEffect, useState} from 'react';
import './styles.scss';
import {Image} from "semantic-ui-react";
import defaultImg from '../../assets/img/default-img.svg';
import {connect} from "react-redux";
import {fetchDataAction} from "../../actions/dashboardActions";
import {bindActionCreators} from "redux";
import LoaderWidget from "../../components/LoaderWidget";
import {useHistory} from "react-router-dom";
import {ORGANIZATIONS_ROUTE} from "../../routes/routesConstant";
import DefaultAvatar from "../../components/DefaultAvatar";
import {employeeRoleToString} from "../../utils/constants/employee_roles";

const DashboardPage = ({
    fetchDataAction,
    orgData,
    organizations,
    employees,
}) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDataAction().then(() => setIsLoading(false));
    }, [fetchDataAction]);

    if (isLoading) {
        return <LoaderWidget/>;
    }

    return (
        <div id="DashboardPage" className="Page">
            <div className="leftColumn">
                <MyOrganization data={orgData} employeesCount={orgData.employeesCount}/>
                <OrganizationsList organizationsList={organizations} myOrgId={orgData._id} />
            </div>
            <div className="rightColumn">
                <EmployeesList employeesList={employees} />
            </div>
        </div>
    );
};

const actions = {fetchDataAction};
const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
const mapStateToProps = ({dashboard}) => ({
    orgData: dashboard.orgData,
    organizations: dashboard.organizations,
    employees: dashboard.employees,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardPage);

const MyOrganization = ({data, employeesCount}) => {
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
                  <div className="empCount">??????????????????????: {employeesCount}</div>
              </div>
          </div>
          <div className="description">
              <h5>????????:</h5>
              <div className="text">{data.description}</div>
          </div>
      </div>
    );
}

const OrganizationsList = ({ organizationsList, myOrgId }) => {
    return (
        <div className="OrganizationsList">
            <h5>??????????????????????</h5>
            <div className="listWrapper">
                <div className="header">
                    <div className="logo"/>
                    <div className="name">??????????</div>
                    <div className="discount">???????????? (?????? ?????? / ????????????)</div>
                </div>
                {
                    organizationsList.map((el) => <OrganizationsListItem
                        key={el._id}
                        data={el}
                        discountForYou={el.discounts.filter(discount => discount.id === myOrgId)[0]}
                    />)
                }
            </div>
        </div>
    );
}

const OrganizationsListItem = ({data, discountForYou}) => {
    const history = useHistory();
    const redirectToOrgPage = () => {
        history.push(ORGANIZATIONS_ROUTE + `/${data._id}`);
    }
    return (
        <div className="OrganizationsListItem" onClick={() => redirectToOrgPage()}>
            <div className="logo">
                <Image src={data.logo
                    ? process.env.REACT_APP_API_URL + data.logo
                    : defaultImg
                } />
            </div>
            <div className="name">{data.name}</div>
            <div className="discount">
                <span>{discountForYou ? discountForYou.percent + '%' : '-'} </span>
                /
                <span> {data.discountForOrg ? data.discountForOrg + '%' : '-'}</span>
            </div>
        </div>
    );
}

const EmployeesList = ({employeesList}) => {
    return(
        <div className="EmployeesList">
            <h5>????????????????????</h5>
            <div className="listWrapper">
                <div className="header">
                    <div className="logo"/>
                    <div className="name">??.??.??.</div>
                    <div className="role">????????</div>
                </div>
                {
                    employeesList.map(el => <EmployeesListItem key={el._id} data={el} />)
                }
            </div>
        </div>
    );
}

const EmployeesListItem = ({data}) => {
    return(
        <div className="EmployeesListItem">
            <div className="logo">
                { data.photo
                    ? <Image src={ process.env.REACT_APP_API_URL + data.photo} />
                    : <DefaultAvatar name={data.fullName} />
                }
            </div>
            <div className="name">{data.fullName}</div>
            <div className="role">{employeeRoleToString(data.role)}</div>
        </div>
    );
}