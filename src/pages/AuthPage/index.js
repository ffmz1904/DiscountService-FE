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
    const [errors, setErrors] = useState([]);

    const clearError = name => {
        const errorsArr = errors.filter(el => el !== name);
        setErrors(errorsArr);
    }

    const changeAuthForms = () => {
        changeIsLoginState(!isLoginState);
        changeEmail('');
        changePassword('');
        changeConfirmPassword('');
        changeOrgName('');
        changeOrgDescription('');
        setErrors([]);
    }

    const validateRegisterData = () => {
        const errorsArr = [];
        if (orgName.length < 3) {
            errorsArr.push('orgName');
        }
        // if (orgDescription === '') {
        //     errorsArr.push('orgDescription');
        // }
        if (email === '') {
            errorsArr.push('email');
        }
        const comparePass = password === confirmPassword;
        if (password.length < 4  || !comparePass) {
            errorsArr.push('password');
        }
        if (!comparePass) {
            errorsArr.push('confirmPassword');
        }
        return errorsArr;
    }

    const validateLoginData = () => {
        const errorsArr = [];
        if (email === '') {
            errorsArr.push('email');
        }
        if (password.length < 4) {
            errorsArr.push('password');
        }
        return errorsArr;
    }

    const handleLogin = async () => {
        const errors = validateLoginData();
        if (errors.length) {
            setErrors(errors);
            return false;
        }
        const result = await loginAction({email, password});
        if (result) {
            history.push(DASHBOARD_ROUTE);
        }
    }

    const handleRegistration = async () => {
        const errors = validateRegisterData();
        if (errors.length) {
            setErrors(errors);
            return false;
        }

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
                            errors={errors}
                            skipError={clearError}
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
                            errors={errors}
                            skipError={clearError}
                        />
                    }
                    <hr/>
                    <div className="alternativeForm">
                        { isLoginState ? 'Хочете приєднатись? ' : 'Вже маєте акаунт? ' }
                        <span onClick={() => changeAuthForms()}>
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
    errors,
    skipError,
}) => {
    return(
        <div className="LoginForm">
            <div className="form">
                <Input
                    fluid
                    placeholder='Ел. пошта'
                    value={email}
                    onChange={(e) => {
                        skipError('email');
                        changeEmail(e.target.value);
                    }}
                    error={errors.includes('email')}
                />
                <Input
                    fluid
                    placeholder='Пароль'
                    type="password"
                    value={password}
                    onChange={(e) => {
                        skipError('password');
                        changePassword(e.target.value);
                    }}
                    error={errors.includes('password')}
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
    errors,
    skipError,
})  => {
    return(
        <div className="RegistrationForm">
            <div className="form">
                <Input
                    fluid
                    placeholder='Назва організації'
                    value={orgName}
                    onChange={(e) => {
                        skipError('orgName');
                        changeOrgName(e.target.value);
                    }}
                    error={errors.includes('orgName')}
                />
                <TextArea
                    placeholder='Опис (Чим займається ваша організація? Які послуги надає?)'
                    value={orgDescription}
                    onChange={(e) => {
                        skipError('orgDescription');
                        changeOrgDescription(e.target.value);
                    }}
                    error={errors.includes('orgDescription')}
                />
                <Input
                    fluid
                    placeholder='Ел. пошта'
                    value={email}
                    onChange={(e) => {
                        skipError('email');
                        changeEmail(e.target.value);
                    }}
                    error={errors.includes('email')}
                />
                <Input
                    fluid
                    placeholder='Пароль'
                    value={password}
                    type="password"
                    onChange={(e) => {
                        skipError('password');
                        changePassword(e.target.value);
                    }}
                    error={errors.includes('password')}
                />
                <Input
                    fluid
                    placeholder='Підтвердіть пароль'
                    value={confirmPassword}
                    type="password"
                    onChange={(e) => {
                        skipError('confirmPassword');
                        skipError('password');
                        changeConfirmPassword(e.target.value);
                    }}
                    error={errors.includes('confirmPassword')}
                />
                <div className="btnWrapper">
                    <Button onClick={() => handleRegistration()}>Реєстрація</Button>
                </div>
            </div>
        </div>
    );
}