import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Card, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import { AuthService, LoginRequest } from 'backend/services/backend';
import Loading from 'components/loading';
import { loginStarted } from 'store/reducers/auth';
import { AuthData, IUserData, ServerError } from 'utils/types';
import { showError } from 'utils/notifications';
import { getUserData } from './helpers';
import './styles.scss';

function Login() {
  const dispatch = useDispatch();
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [credentials, setCredentials] = useState<LoginRequest>({
    email: '',
    password: ''
  });

  const isValidForm = useMemo(() => !!(credentials.email && credentials.password), [credentials.email, credentials.password]);

  const doLogin = useCallback((inputCredentials: LoginRequest, onFinish: any) => {
    // @ts-ignore
    dispatch(loginStarted());
    AuthService.token({ body: inputCredentials })
      .then((userProfile) => {
        onFinish(true, userProfile);
      })
      .catch((error) => {
        onFinish(false, error);
      });
  }, []);

  const loginCallback = useCallback(() => {
    setIsLoggingIn(true);
    // const mailIndex = credentials.email.indexOf('@');
    doLogin(credentials, (isSuccess: boolean, loginData: AuthData | ServerError) => {
      setIsLoggingIn(false);
      if (isSuccess) {
        getUserData(loginData as IUserData, dispatch);
      } else {
        const serverError = loginData as ServerError;
        // В случае ошибки в data будет объект ошибки от бэка
        const { response: { data: error = '' } = { data: '' } } = serverError;
        showError('Не удалось авторизоваться', error as ServerError);
      }
    });
  }, [credentials.password, credentials.email]);

  return (
    <div className="view login">
      <Card
        title="Вход"
        onKeyDown={(ev) => {
          const isEnterKeyPressed = ev.keyCode === 13 || String(ev.key)
            .toLowerCase() === 'enter';
          if (credentials.email && credentials.password && isEnterKeyPressed) {
            loginCallback();
          }
        }}
      >
        <div className="card-content">
          {
            isLoggingIn && <Loading text="Выполняем вход..." />
          }
          <Input
            style={{ marginBottom: 16 }}
            className={!credentials.email ? 'invalid' : ''}
            value={credentials.email}
            placeholder="Email"
            prefix={(
              <UserOutlined
                style={{ color: 'rgba(0,0,0,.25)' }}
              />
            )}
            onChange={({ target: { value: newLogin } }) => {
              setCredentials((prevCredentials) => ({
                ...prevCredentials,
                email: newLogin
              }));
            }}
          />
          <Input
            style={{ marginBottom: 16 }}
            placeholder="Пароль"
            className={!credentials.password ? 'invalid' : ''}
            type="password"
            value={credentials.password}
            prefix={(
              <LockOutlined
                style={{ color: 'rgba(0,0,0,.25)' }}
              />
            )}
            onChange={({ target: { value: newPassword } }) => {
              setCredentials((prevCredentials) => ({
                ...prevCredentials,
                password: newPassword
              }));
            }}
          />
          <div className="login-button-container">
            <Button
              disabled={!isValidForm}
              type="primary"
              onClick={loginCallback}
            >
              Войти
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Login;
