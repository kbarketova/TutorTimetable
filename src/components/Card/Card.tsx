import React from 'react';
import Animated, {FadeInUp} from 'react-native-reanimated';

import {useFlag} from '../../hooks/use-flag';
import {Avatar} from '../Avatar';
import {Button} from '../Button';
import {Flex} from '../Flex';
import {Txt} from '../Txt';

type TProps = Readonly<{
  name: string;
  color: string;
  children: React.ReactNode;
  onEdit: () => void;
  onRemove: () => void;
  lastName?: string | null;
  phone?: string | null;
  flex?: number | null;
}>;

const Card_: React.FC<TProps> = ({
  name,
  children,
  color,
  onEdit,
  onRemove,
  lastName = null,
  phone = null,
  flex = null,
}: TProps) => {
  const [isOpened, , , toggle] = useFlag();
  return (
    <Button
      color="white"
      borderRadius={3}
      margin="0 0 10 0"
      padding={15}
      flex={flex}
      onPress={toggle}>
      <Flex flexDirection="row" justifyContent="space-between">
        <Flex>
          <Txt>{`${name} ${lastName}`}</Txt>
          {!!phone && <Txt color="grey">{phone}</Txt>}
          {isOpened && (
            <Animated.View entering={FadeInUp.duration(100)}>
              {children}
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                padding="15 0 5 0">
                <Button onPress={onEdit} iconName="edit-2" iconColor="grey" />
                <Button
                  onPress={onRemove}
                  iconName="trash-2"
                  iconColor="grey"
                />
              </Flex>
            </Animated.View>
          )}
        </Flex>
        <Avatar name={name} color={color} lastName={lastName ?? undefined} />
      </Flex>
    </Button>
  );
};

export const Card = React.memo(Card_);
