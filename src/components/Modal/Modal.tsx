import React from 'react';
import {
  TouchableWithoutFeedback,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';

import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';
import {Colors} from '../../constants';
import {Flex} from '../Flex';
import {ModalButtons} from '../ModalButtons';
import {Txt} from '../Txt';

type TProps = Readonly<{
  children: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
  header?: string | null;
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
  borderWidth: 1,
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 10,
};

const decoratorLineStyle: ViewStyle = {
  alignSelf: 'center',
};

const overlayStyle: ViewStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#080808',
};

const Modal_: React.FC<TProps> = ({
  children,
  onConfirm,
  onClose,
  header = null,
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

  const overlayAnimatedOpacity = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [height, 0],
      [0, 0.5],
      Extrapolate.IDENTITY,
    );
    return {
      opacity,
    };
  });

  const gestureHandler = Gesture.Pan()
    .onStart(() => {
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      const deltaY = context.value.y + event.translationY;
      if (deltaY < 0) {
        return;
      }
      translateY.value = deltaY;
    })
    .onEnd(() => {
      if (translateY.value < height / 4) {
        translateY.value = withSpring(0, {damping: 100, stiffness: 400});
      } else {
        translateY.value = withSpring(
          height,
          {damping: 100, stiffness: 500},
          isSucceed => {
            if (isSucceed) {
              runOnJS(onClose)();
            }
          },
        );
      }
    });

  React.useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 100,
      stiffness: 100,
    });
  }, [height, translateY]);

  return (
    <>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[overlayStyle, overlayAnimatedOpacity]} />
      </TouchableWithoutFeedback>
      <GestureDetector gesture={gestureHandler}>
        <Animated.View style={[mainStyle, animatedStyle]}>
          <Icon
            name="chevron-up"
            size={25}
            color={Colors.grayDark}
            style={decoratorLineStyle}
          />
          <Flex>
            {!!header && (
              <Txt
                size="lg"
                alignSelf="center"
                fontWeight="bold"
                color={Colors.grayDark}>
                {header}
              </Txt>
            )}
            {children}
            <ModalButtons
              confirmLabel={confirmLabel}
              cancelLabel={cancelLabel}
              onConfirm={onConfirm}
              onCancel={onClose}
              isConfirmDisabled={isConfirmDisabled}
              isCancelDisabled={isCancelDisabled}
            />
          </Flex>
        </Animated.View>
      </GestureDetector>
    </>
  );
};

export const Modal = React.memo(Modal_);
