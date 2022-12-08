import React from 'react';
import {ViewStyle} from 'react-native';

import {Button} from '../../components/Button';
import {useNavigation} from '@react-navigation/native';
import {ModalInput} from '../../components/ModalInput';
import {Screen} from '../../components/Screen';
import {Flex} from '../../components/Flex';
import {Colors} from '../../constants';
import {DrawerParamList} from '../../types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/Feather';
import {useFlag} from '../../hooks/use-flag';

const style: ViewStyle = {
  alignItems: 'center',
  alignSelf: 'center',
  marginBottom: 10,
  paddingHorizontal: 10,
};

type TNavProps = NativeStackScreenProps<DrawerParamList, 'Login'>;

const Login_: React.FC = () => {
  const navigation = useNavigation<TNavProps['navigation']>();

  const [isPasswordVisible, , , togglePassword] = useFlag();
  const [login, setLogin] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const onLogin = React.useCallback(
    () => navigation.navigate('Timetable'),
    [navigation],
  );

  return (
    <Screen padding={0} color="blue">
      <Flex alignContent="center" justifyContent="center" padding="0 15">
        <ModalInput onChangeText={setLogin} value={login} placeholder="Логин" />
        <Flex flex={0} flexDirection="row">
          <ModalInput
            onChangeText={setPassword}
            value={password}
            placeholder="Пароль"
            flex={1}
            secureTextEntry={!isPasswordVisible}
          />
          <Icon
            name={isPasswordVisible ? 'eye' : 'eye-off'}
            size={15}
            onPress={togglePassword}
            style={style}
          />
        </Flex>
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
