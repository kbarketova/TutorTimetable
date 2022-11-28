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
  const {name, phone, secondaryPhone, secondaryPhoneOwner} = student;

  const header: string = name ?? phone;
  const headerSecondary: string =
    secondaryPhone && secondaryPhoneOwner
      ? `${secondaryPhone} (${secondaryPhoneOwner})`
      : secondaryPhone ?? secondaryPhoneOwner ?? '';

  return (
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
  );
};

export const ActivityDescription = React.memo(ActivityDescription_);
