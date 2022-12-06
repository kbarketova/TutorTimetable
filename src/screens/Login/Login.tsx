import React from 'react';

import {Button} from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {ModalInput} from '../../components/ModalInput';
import {Screen} from '../../components/Screen';
import {Flex} from '../../components/Flex';
import {Colors} from '../../constants';

const Login_: React.FC = () => {
  const navigation = useNavigation();

  const [login, setLogin] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const onLogin = React.useCallback(
    () => navigation.navigate('Timetable', {}),
    [navigation],
  );

  return (
    <Screen padding={0} color="blue">
      <Flex alignContent="center" justifyContent="center" padding="0 15">
        <ModalInput onChangeText={setLogin} value={login} placeholder="Логин" />
        <ModalInput
          onChangeText={setPassword}
          value={password}
          placeholder="Пароль"
        />
        <Button
          color={Colors.sky}
          borderRadius={25}
          label="Войти"
          onPress={onLogin}
          size="sm"
          flex={0}
        />
      </Flex>
    </Screen>
  );
};

export const Login = React.memo(Login_);
