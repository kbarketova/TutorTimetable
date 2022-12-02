import React from 'react';

import {Flex} from '../../../components/Flex';
import {Txt} from '../../../components/Txt';
import {IActivity} from '../../../types';

type TProps = IActivity;

const ActivityDescription_: React.FC<TProps> = ({
  student,
  color,
  theme,
}: TProps) => {
  const {name, phone} = student;
  const header: string = name ?? phone;

  return (
    <Flex flex={3} color={color} padding={10} borderRadius={3}>
      {!!header && (
        <Txt color="white" size="md">
          {header}
        </Txt>
      )}
      {!!theme && (
        <Txt color="white" size="sm">
          {theme}
        </Txt>
      )}
    </Flex>
  );
};

export const ActivityDescription = React.memo(ActivityDescription_);
