import React from 'react';

import {Flex} from '../../components/Flex';
import {Txt} from '../../components/Txt';
import {IActivity} from '../../types';

type TProps = IActivity;

const Activity_: React.FC<TProps> = ({student, time, color, theme}: TProps) => {
  const {name, phone, secondaryPhone, secondaryPhoneOwner} = student;

  const header: string = name ?? phone;
  const headerSecondary: string =
    secondaryPhone && secondaryPhoneOwner
      ? `${secondaryPhone} (${secondaryPhoneOwner})`
      : secondaryPhone ?? secondaryPhoneOwner ?? '';

  return (
    <Flex flexDirection="row" margin="0 0 10 0">
      <Txt flex={1} size="xlg" color="deepskyblue">
        {time}
      </Txt>
      <Flex flex={3} color={color} padding={10} borderRadius={3}>
        {(header || headerSecondary) && (
          <Txt color="white" size="md">
            {header || headerSecondary}
          </Txt>
        )}
        {!!theme && (
          <Txt color="white" size="sm">
            {theme}
          </Txt>
        )}
      </Flex>
    </Flex>
  );
};

export const Activity = React.memo(Activity_);
