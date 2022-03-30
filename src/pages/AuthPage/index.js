import React, {useState} from 'react';
import {Button, Input} from "semantic-ui-react";
import './styles.scss';
import Logo from "../../components/Logo";

const AuthPage = () => {
    const [isLoginState, changeIsLoginState] = useState(true);
    const [email, changeEmail] = useState('');
    const [password, changePassword] = useState('');

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
                        <Button>Увійти</Button>
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

export default AuthPage;