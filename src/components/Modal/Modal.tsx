import React from 'react';
import {useWindowDimensions, ViewStyle} from 'react-native';

import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Flex} from '../Flex';
import {ModalButtons} from '../ModalButtons';

type TProps = Readonly<{
  children: React.ReactNode;
  onPress: () => void;
  onCancel: () => void;
  label?: string | null;
  cancelLabel?: string | null;
}>;

const mainStyle: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'white',
  borderColor: 'rgba(180,180,180,0.5)',
  borderWidth: 1,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
  padding: 10,
};

const Modal_: React.FC<TProps> = ({
  children,
  onPress,
  onCancel,
  label = null,
  cancelLabel = null,
}: TProps) => {
  const {height} = useWindowDimensions();
  const offsetY = useSharedValue(height);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: offsetY.value,
    };
  });

  const gestureHandler = useAnimatedGestureHandler({
    onStart(_, context) {
      context.startTop = offsetY.value;
    },
    onActive(event) {
      offsetY.value = event.translationY;
    },
  });

  React.useEffect(() => {
    offsetY.value = withSpring(height / 2, {
      damping: 80,
      overshootClamping: false,
      stiffness: 500,
    });
  }, [height, offsetY]);

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[mainStyle, animatedStyle]}>
        <Flex>{children}</Flex>
        <ModalButtons
          label={label}
          cancelLabel={cancelLabel}
          onPress={onPress}
          onCancel={onCancel}
        />
      </Animated.View>
    </PanGestureHandler>
  );
};

export const Modal = React.memo(Modal_);
