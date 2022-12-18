import React from 'react';

import {Flex} from '../../components/Flex';
import {Txt} from '../../components/Txt';
import {IStudentItem} from '../../types';
import {Avatar} from './Avatar';
import {Button} from '../../components/Button';
import {useFlag} from '../../hooks/use-flag';
import Animated, {FadeInUp} from 'react-native-reanimated';

type TProps = Readonly<{
  item: IStudentItem;
  onRemove: (id: number) => void;
  onEdit: (item: IStudentItem) => void;
}>;

const StudentItem_: React.FC<TProps> = ({item, onRemove, onEdit}: TProps) => {
  const [isOpened, , , toggle] = useFlag();
  const {id, name, lastName, phone, commonInfo, parent, color} = item;

  const remove = React.useCallback(() => onRemove(id), [id, onRemove]);
  const edit = React.useCallback(() => onEdit(item), [item, onEdit]);

  return (
    <Button
      color="white"
      borderRadius={3}
      margin="0 0 10 0"
      padding={15}
      onPress={toggle}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Flex>
          <Txt>{`${name} ${lastName}`}</Txt>
          <Txt color="grey">{phone}</Txt>
          {isOpened && (
            <Animated.View entering={FadeInUp.duration(100)}>
              {!!commonInfo?.summary && (
                <Txt color="grey">{commonInfo?.summary}</Txt>
              )}
              {!!commonInfo?.price && (
                <Txt color="grey">{`Цена за занятие: ${commonInfo?.price}`}</Txt>
              )}
              {parent && (
                <Txt color="grey">
                  Родитель:
                  {!!parent?.name && (
                    <Txt color="grey">{` ${parent?.name}`}</Txt>
                  )}
                  {!!parent?.phone && (
                    <Txt color="grey">{` ${parent?.phone}`}</Txt>
                  )}
                </Txt>
              )}
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                padding="15 0 5 0">
                <Button onPress={edit} iconName="edit-2" iconColor="grey" />
                <Button onPress={remove} iconName="trash-2" iconColor="grey" />
              </Flex>
            </Animated.View>
          )}
        </Flex>
        <Avatar name={name} color={color} lastName={lastName} />
      </Flex>
    </Button>
  );
};

export const StudentItem = React.memo(StudentItem_);
