import React from 'react';
import {Text, TextStyle} from 'react-native';
import {Flex} from '../../components/Flex';

import {IActivity} from '../../types';

type TProps = IActivity;

const timeStyle: TextStyle = {
  color: 'deepskyblue',
  fontSize: 25,
  flex: 1,
};

const Activity_: React.FC<TProps> = ({student, time, color, theme}: TProps) => {
  const {name, phone} = student;
  return (
    <Flex flexDirection="row" margin="0 0 10 0">
      <Text style={timeStyle}>{time}</Text>
      <Flex flex={3} color={color} padding={10} borderRadius={3}>
        <Text style={{color: 'white', fontSize: 12, fontWeight: '600'}}>
          {name || phone}
        </Text>
        <Text style={{color: 'white', fontSize: 12}}>{theme}</Text>
      </Flex>
    </Flex>
  );
};

export const Activity = React.memo(Activity_);
