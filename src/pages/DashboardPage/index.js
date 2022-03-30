import React from 'react';
import './styles.scss';
import {Image} from "semantic-ui-react";
import defaultImg from '../../assets/img/default-img.svg';

const DashboardPage = () => {
    return (
        <div id="DashboardPage" className="Page">
            <div className="leftColumn">
                <MyOrganization/>
                <OrganizationsList />
            </div>
            <div className="rightColumn">
                <EmployeesList />
            </div>
        </div>
    );
};

const MyOrganization = () => {
    return(
      <div className="MyOrgContainer">
          <div className="columns">
              <div className="left">
                 <div className="logo">
                     <Image src={defaultImg} />
                 </div>
              </div>
              <div className="right">
                  <div className="name">Organization name</div>
                  <div className="empCount">Працівників: 12</div>
              </div>
          </div>
          <div className="description">
              <h5>Опис:</h5>
              <div className="text">
                  Lorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla bla
                  Lorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla bla
                  Lorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla bla
                  Lorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla bla
                  Lorem ipsum bla  bla blaLorem ipsum bla  bla blaLorem ipsum bla  bla bla
              </div>
          </div>
      </div>
    );
}

const OrganizationsList = () => {
    return (
        <div className="OrganizationsList">
            <h5>Організації</h5>
            <div className="listWrapper">
                <div className="header">
                    <div className="logo"/>
                    <div className="name">Назва</div>
                    <div className="discount">Знижка</div>
                </div>
                <OrganizationsListItem />
                <OrganizationsListItem />
                <OrganizationsListItem />
                <OrganizationsListItem />
            </div>
        </div>
    );
}

const OrganizationsListItem = () => {
    return (
        <div className="OrganizationsListItem">
            <div className="logo">
                <Image src={defaultImg} />
            </div>
            <div className="name">Придумав шось довге і чучуть</div>
            <div className="discount">Знижка</div>
        </div>
    );
}

const EmployeesList = () => {
    return(
        <div className="EmployeesList">
            <h5>Працівники</h5>
            <div className="listWrapper">
                <div className="header">
                    <div className="logo"/>
                    <div className="name">Ф.І.О.</div>
                    <div className="date">Дата</div>
                </div>

                <EmployeesListItem />
                <EmployeesListItem />
                <EmployeesListItem />
                <EmployeesListItem />
            </div>
        </div>
    );
}

const EmployeesListItem = () => {
    return(
        <div className="EmployeesListItem">
            <div className="logo">
                <Image src={defaultImg} />
            </div>
            <div className="name">Pidar Pidar Piiiiidar</div>
            <div className="date">22.10.1999</div>
        </div>
    );
}

export default DashboardPage;