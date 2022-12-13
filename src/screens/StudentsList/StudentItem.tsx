import React from 'react';

import {Flex} from '../../components/Flex';
import {Txt} from '../../components/Txt';
import {IStudentItem} from '../../types';
import {Avatar} from './Avatar';
import {getRandomColor} from '../../utils/get-random-color';
import {Button} from '../../components/Button';
import {useFlag} from '../../hooks/use-flag';

type TProps = Readonly<{
  item: IStudentItem;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
}>;

const StudentItem_: React.FC<TProps> = ({item, onRemove, onEdit}: TProps) => {
  const [isOpened, , , toggle] = useFlag();
  const {id, name, phone, commonInfo, parent} = item;

  const color = React.useMemo<string>(() => getRandomColor(), []);
  const remove = React.useCallback(() => onRemove(id), [id, onRemove]);
  const edit = React.useCallback(() => onEdit(id), [id, onEdit]);

  return (
    <Button
      color="white"
      borderRadius={3}
      margin="0 0 10 0"
      padding={15}
      onPress={toggle}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Flex>
          <Txt>{name}</Txt>
          <Txt color="grey">{phone}</Txt>
          {isOpened && (
            <Flex>
              {!!commonInfo?.summary && (
                <Txt color="grey">{commonInfo?.summary}</Txt>
              )}
              {!!commonInfo?.price && (
                <Txt color="grey">{`Цена за занятие: ${commonInfo?.price}`}</Txt>
              )}
              {parent && (
                <Flex flexDirection="row" justifyContent="space-between">
                  <Txt color="grey">Родитель:</Txt>
                  {!!parent?.name && <Txt color="grey">{parent?.name}</Txt>}
                  {!!parent?.phone && <Txt color="grey">{parent?.phone}</Txt>}
                </Flex>
              )}
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                padding="15 0 5 0">
                <Button onPress={edit} iconName="edit-2" iconColor="grey" />
                <Button onPress={remove} iconName="trash-2" iconColor="grey" />
              </Flex>
            </Flex>
          )}
        </Flex>
        <Avatar fullName={name} color={color} />
      </Flex>
    </Button>
  );
};

export const StudentItem = React.memo(StudentItem_);
