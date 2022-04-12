import React, {useState} from 'react';
import {Button, Input} from "semantic-ui-react";
import './styles.scss';
import Logo from "../../components/Logo";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loginAction} from "../../actions/adminActions";
import {useHistory} from "react-router-dom";
import {DASHBOARD_ROUTE} from "../../routes/routesConstant";

const AuthPage = ({
    loginAction,
}) => {
    const history = useHistory();
    const [isLoginState, changeIsLoginState] = useState(true);
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

    const handleLogin = async () => {
        const result = await loginAction({email, password});
        if (result) {
            history.push(DASHBOARD_ROUTE);
        }
    }

    return (
        <div id="AuthPage" className="Page">
            <Logo />
            <div className="formWrapper">
                <h2>Вхід</h2>
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
                    <hr/>
                    <div className="alternativeForm">
                        Хочете приєднатись? <span onClick={() => changeIsLoginState(!isLoginState)}>Створіть акаунт</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const actions = { loginAction };

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    null,
    mapDispatchToProps,
)(AuthPage);