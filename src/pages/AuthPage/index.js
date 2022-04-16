import React, {useState} from 'react';
import {Button, Input, TextArea} from "semantic-ui-react";
import './styles.scss';
import Logo from "../../components/Logo";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loginAction, registrationAction} from "../../actions/adminActions";
import {useHistory} from "react-router-dom";
import {DASHBOARD_ROUTE} from "../../routes/routesConstant";

const AuthPage = ({
    loginAction,
    registrationAction,
}) => {
    const history = useHistory();
    const [isLoginState, changeIsLoginState] = useState(true);
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');
    const [confirmPassword, changeConfirmPassword] = useState('');
    const [orgName, changeOrgName] = useState('');
    const [orgDescription, changeOrgDescription] = useState('');

    const handleLogin = async () => {
        const result = await loginAction({email, password});
        if (result) {
            history.push(DASHBOARD_ROUTE);
        }
    }

    const handleRegistration = async () => {
        const registerData = {
            user: {
                email,
                password,
            },
            organization: {
                name: orgName,
                description: orgDescription,
            }
        };
        const result = await registrationAction(registerData);
        if (result) {
            history.push(DASHBOARD_ROUTE);
        }
    }

    return (
        <div id="AuthPage" className="Page">
            <Logo />
            <div className="formWrapper">
                <h2>{ isLoginState ? 'Вхід' : 'Реєстрація' }</h2>
                <div className="form">
                    { isLoginState
                        ? <LoginForm
                            email={email}
                            changeEmail={changeEmail}
                            password={password}
                            changePassword={changePassword}
                            handleLogin={handleLogin}
                        />
                        : <RegistrationForm
                            email={email}
                            changeEmail={changeEmail}
                            password={password}
                            changePassword={changePassword}
                            confirmPassword={confirmPassword}
                            changeConfirmPassword={changeConfirmPassword}
                            orgName={orgName}
                            changeOrgName={changeOrgName}
                            orgDescription={orgDescription}
                            changeOrgDescription={changeOrgDescription}
                            handleRegistration={handleRegistration}
                        />
                    }
                    <hr/>
                    <div className="alternativeForm">
                        { isLoginState ? 'Хочете приєднатись? ' : 'Вже маєте акаунт? ' }
                        <span onClick={() => changeIsLoginState(!isLoginState)}>
                            {isLoginState ? 'Створіть акаунт' : 'Повернутись до входу'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const actions = { loginAction, registrationAction };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    null,
    mapDispatchToProps,
)(AuthPage);

const LoginForm = ({
    email,
    changeEmail,
    password,
    changePassword,
    handleLogin,
}) => {
    return(
        <div className="LoginForm">
            <div className="form">
                <Input
                    fluid
                    placeholder='Ел. пошта'
                    value={email}
                    onChange={(e) => changeEmail(e.target.value)}
                    // error
                />
                <Input
                    fluid
                    placeholder='Пароль'
                    value={password}
                    onChange={(e) => changePassword(e.target.value)}
                />
                <div className="btnWrapper">
                    <Button onClick={() => handleLogin()}>Увійти</Button>
                </div>
            </div>
        </div>
    );
}

const RegistrationForm = ({
    email,
    changeEmail,
    password,
    changePassword,
    confirmPassword,
    changeConfirmPassword,
    orgName,
    changeOrgName,
    orgDescription,
    changeOrgDescription,
    handleRegistration,
})  => {
    return(
        <div className="RegistrationForm">
            <div className="form">
                <Input
                    fluid
                    placeholder='Назва організації'
                    value={orgName}
                    onChange={(e) => changeOrgName(e.target.value)}
                />
                <TextArea
                    placeholder='Опис (Чим займається ваша організація? Які послуги надає?)'
                    value={orgDescription}
                    onChange={(e) => changeOrgDescription(e.target.value)}
                />
                <Input
                    fluid
                    placeholder='Ел. пошта'
                    value={email}
                    onChange={(e) => changeEmail(e.target.value)}
                    // error
                />
                <Input
                    fluid
                    placeholder='Пароль'
                    value={password}
                    onChange={(e) => changePassword(e.target.value)}
                />
                <Input
                    fluid
                    placeholder='Підтвердіть пароль'
                    value={confirmPassword}
                    onChange={(e) => changeConfirmPassword(e.target.value)}
                />
                <div className="btnWrapper">
                    <Button onClick={() => handleRegistration()}>Реєстрація</Button>
                </div>
            </div>
        </div>
    );
}