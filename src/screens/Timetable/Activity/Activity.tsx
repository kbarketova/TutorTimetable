import React from 'react';
import {ViewStyle} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Button} from '../../../components/Button';
import {Flex} from '../../../components/Flex';
import {Txt} from '../../../components/Txt';
import {useFlag} from '../../../hooks/use-flag';
import {IActivity} from '../../../types';
import {TOnManageActivity} from '../types';

type TProps = Readonly<{
  item: IActivity;
  onEdit: TOnManageActivity;
  onRemove: TOnManageActivity;
}>;

const mainStyle: ViewStyle = {
  flexDirection: 'row',
};

const Activity_: React.FC<TProps> = ({item, onEdit, onRemove}: TProps) => {
  const [isOpened, , , onToggle] = useFlag();
  const height = useSharedValue(0);

  const {time, activityId, student, color} = item;
  const {name, phone} = student;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  });

  const edit = React.useCallback(() => {
    onEdit(activityId);
  }, [activityId, onEdit]);

  const remove = React.useCallback(() => {
    onRemove(activityId);
  }, [activityId, onRemove]);

  const toggle = React.useCallback(() => {
    onToggle();
    height.value = withSpring(isOpened ? 0 : 25, {
      damping: 100,
      stiffness: 500,
    });
  }, [height, isOpened, onToggle]);

  return (
    <Button flexDirection="row" margin="0 0 10 0" onPress={toggle}>
      <Txt flex={1} size="lg" color="deepskyblue">
        {time}
      </Txt>
      <Flex flex={3} color={color} padding={10} borderRadius={3}>
        <Txt color="white" size="md">
          {name}
        </Txt>
        {!!phone && <Txt color="white" size="sm">{`Тел: ${phone}`}</Txt>}
        <Animated.View style={[mainStyle, animatedStyle]}>
          <Button onPress={edit} iconName="edit-2" iconColor="white" />
          <Button onPress={remove} iconName="trash-2" iconColor="white" />
        </Animated.View>
      </Flex>
    </Button>
  );
};

export const Activity = React.memo(Activity_);
