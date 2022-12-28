import React from 'react';

import {computed} from 'mobx';
import {observer} from 'mobx-react';
import students from '../../../store/students';
import {
  AddressOptions,
  AddressOptionsDesc,
  IActivity,
  IStudentItem,
} from '../../../types';
import {TOnManageActivity} from '../types';
import {Card} from '../../../components/Card';
import {Txt} from '../../../components/Txt';
import {Flex} from '../../../components/Flex';

type TProps = Readonly<{
  item: IActivity;
  onEdit: TOnManageActivity;
  onRemove: TOnManageActivity;
}>;

const Activity_: React.FC<TProps> = observer(
  ({item, onEdit, onRemove}: TProps) => {
    const {time, activityId, studentId, color, theme, addressId} = item;

    const student: IStudentItem | undefined = computed(() =>
      students.getStudent(studentId),
    ).get();

    const activityPlace = React.useMemo<string>(() => {
      const place =
        addressId === AddressOptions.StudentPlace
          ? student?.address
          : AddressOptionsDesc[addressId];

      return place ?? '';
    }, [addressId, student?.address]);

    const edit = React.useCallback(() => {
      onEdit(activityId);
    }, [activityId, onEdit]);

    const remove = React.useCallback(() => {
      onRemove(activityId);
    }, [activityId, onRemove]);

    if (!student) {
      return null;
    }

    return (
      <Flex flexDirection="row">
        <Txt flex={1} size="lg" color="gray" fontWeight="300">
          {time}
        </Txt>
        <Card
          flex={3}
          name={student.name}
          lastName={student.lastName}
          phone={student.phone}
          color={color}
          onEdit={edit}
          onRemove={remove}>
          {!!theme && (
            <Txt color="grey" size="sm">
              {theme}
            </Txt>
          )}
          {!!activityPlace && (
            <Txt color="grey" size="sm">
              {`Место проведения: ${activityPlace}`}
            </Txt>
          )}
        </Card>
      </Flex>
    );
  },
);

export const Activity = React.memo(Activity_);
