import React from 'react';

import {Txt} from '../../components/Txt';
import {IStudentItem} from '../../types';
import {Card} from '../../components/Card';

type TProps = Readonly<{
  item: IStudentItem;
  onRemove: (id: number) => void;
  onEdit: (item: IStudentItem) => void;
}>;

const StudentItem_: React.FC<TProps> = ({item, onRemove, onEdit}: TProps) => {
  const {id, name, lastName, phone, commonInfo, parent, color} = item;

  const remove = React.useCallback(() => onRemove(id), [id, onRemove]);
  const edit = React.useCallback(() => onEdit(item), [item, onEdit]);

  return (
    <Card
      name={name}
      lastName={lastName}
      phone={phone}
      color={color}
      onEdit={edit}
      onRemove={remove}>
      {!!commonInfo?.summary && <Txt color="grey">{commonInfo?.summary}</Txt>}
      {!!commonInfo?.price && (
        <Txt color="grey">{`Цена за занятие: ${commonInfo?.price}`}</Txt>
      )}
      {parent && (
        <Txt color="grey">
          Родитель:
          {!!parent?.name && <Txt color="grey">{` ${parent?.name}`}</Txt>}
          {!!parent?.phone && <Txt color="grey">{` ${parent?.phone}`}</Txt>}
        </Txt>
      )}
    </Card>
  );
};

export const StudentItem = React.memo(StudentItem_);
