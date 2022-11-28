import React from 'react';
import {Button} from '../../../components/Button';

import {Txt} from '../../../components/Txt';
import {IActivity} from '../../../types';
import {TOnOpenActivity} from '../types';
import {ActivityDescription} from './ActivityDescription';

type TProps = Readonly<{
  item: IActivity;
  onPress: TOnOpenActivity;
}>;

const Activity_: React.FC<TProps> = ({item, onPress}: TProps) => {
  const {time, activityId} = item;

  const press = React.useCallback(() => {
    onPress(activityId);
  }, [activityId, onPress]);

  return (
    <Button flexDirection="row" margin="0 0 10 0" onPress={press}>
      <Txt flex={1} size="lg" color="deepskyblue">
        {time}
      </Txt>
      <ActivityDescription {...item} />
    </Button>
  );
};

export const Activity = React.memo(Activity_);
