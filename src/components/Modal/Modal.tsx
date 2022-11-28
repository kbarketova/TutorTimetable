import React from 'react';
import {useWindowDimensions, View, ViewStyle} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Flex} from '../Flex';
import {ModalButtons} from '../ModalButtons';

type TProps = Readonly<{
  children: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
  confirmLabel?: string | null;
  isConfirmDisabled?: boolean | null;
  cancelLabel?: string | null;
  isCancelDisabled?: boolean | null;
}>;

const mainStyle: ViewStyle = {
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  top: 0,
  backgroundColor: 'white',
  borderColor: 'rgba(180,180,180,0.5)',
  borderWidth: 0.5,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 10,
};

const decoratorLineStyle: ViewStyle = {
  width: 75,
  height: 4,
  backgroundColor: 'gray',
  alignSelf: 'center',
  marginVertical: 15,
  borderRadius: 2,
};

const Modal_: React.FC<TProps> = ({
  children,
  onConfirm,
  onClose,
  confirmLabel = null,
  isConfirmDisabled = null,
  cancelLabel = null,
  isCancelDisabled = null,
}: TProps) => {
  const {height} = useWindowDimensions();
  const translateY = useSharedValue(height);
  const context = useSharedValue({y: height});

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const gestureHandler = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      const deltaY = context.value.y + event.translationY;
      translateY.value = deltaY;
    })
    .onEnd(() => {
      if (translateY.value < height / 2) {
        translateY.value = withSpring(0, {damping: 50});
      } else {
        translateY.value = withSpring(height, {damping: 50}, isSucceed => {
          if (isSucceed) {
            runOnJS(onClose)();
          }
        });
      }
    });

  React.useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 20,
      stiffness: 50,
    });
  }, [height, translateY]);

  return (
    <GestureDetector gesture={gestureHandler}>
      <Animated.View style={[mainStyle, animatedStyle]}>
        <View style={decoratorLineStyle} />
        <Flex>{children}</Flex>
        <ModalButtons
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
          onConfirm={onConfirm}
          onCancel={onClose}
          isConfirmDisabled={isConfirmDisabled}
          isCancelDisabled={isCancelDisabled}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export const Modal = React.memo(Modal_);
