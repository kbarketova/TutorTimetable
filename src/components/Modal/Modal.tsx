import React from 'react';
import {
  TouchableWithoutFeedback,
  useWindowDimensions,
  ViewStyle,
} from 'react-native';

import {Modal as ModalInner} from 'react-native';

import {
  Gesture,
  GestureDetector,
  ScrollView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Colors} from '../../constants';
import {Flex} from '../Flex';
import {ModalButtons} from '../ModalButtons';
import {Txt} from '../Txt';

type TProps = Readonly<{
  children: React.ReactNode;
  onConfirm: () => void;
  onClose: () => void;
  header?: string | null;
  isConfirmDisabled?: boolean | null;
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
  padding: 10,
};

const backdropStyle: ViewStyle = {
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
  isConfirmDisabled = null,
  isCancelDisabled = null,
}: TProps) => {
  const {height} = useWindowDimensions();
  const translateY = useSharedValue(height);
  const context = useSharedValue({y: height});

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      borderTopLeftRadius: translateY.value === 0 ? 0 : 20,
      borderTopRightRadius: translateY.value === 0 ? 0 : 20,
    };
  });

  const backdropAnimatedOpacity = useAnimatedStyle(() => {
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
    });

  React.useEffect(() => {
    translateY.value = withSpring(0, {
      damping: 100,
      stiffness: 100,
    });
  }, [height, translateY]);

  return (
    <ModalInner transparent={true}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[backdropStyle, backdropAnimatedOpacity]} />
      </TouchableWithoutFeedback>
      <GestureDetector gesture={gestureHandler}>
        <Animated.View style={[mainStyle, animatedStyle]}>
          <ScrollView>
            <ModalButtons
              onConfirm={onConfirm}
              onCancel={onClose}
              isConfirmDisabled={isConfirmDisabled}
              isCancelDisabled={isCancelDisabled}
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
            </Flex>
          </ScrollView>
        </Animated.View>
      </GestureDetector>
    </ModalInner>
  );
};

export const Modal = React.memo(Modal_);
