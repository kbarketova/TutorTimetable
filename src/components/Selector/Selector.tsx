import React from 'react';
import {
  FlatList,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
  ViewStyle,
  View,
} from 'react-native';

import {useFlag} from '../../hooks/use-flag';
import {TSelectItemList} from '../../types';
import {PressableField} from '../PressableField';
import {ListItem} from './ListItem';
import {TOnSelectId} from './types';

type TProps = Readonly<{
  label: string;
  value: string;
  data: TSelectItemList;
  selectedId: number;
  onSelect: TOnSelectId;
  isReadonly?: boolean;
}>;

const overlayStyle: ViewStyle = {
  backgroundColor: '#080808',
  opacity: 0.5,
  flex: 1,
};

const Selector_: React.FC<TProps> = ({
  label,
  value,
  data,
  selectedId,
  onSelect,
  isReadonly = false,
}: TProps) => {
  const {width, height} = useWindowDimensions();
  const [isSelectVisible, , closeSelect, toggleSelect] = useFlag();

  const containerStyle = React.useMemo<ViewStyle>(
    () => ({
      backgroundColor: 'white',
      position: 'absolute',
      alignSelf: 'center',
      top: height / 8,
      width: width - 40,
      borderRadius: 5,
      padding: 7,
    }),
    [height, width],
  );

  const select = React.useCallback<TOnSelectId>(
    id => {
      onSelect(id);
      closeSelect();
    },
    [closeSelect, onSelect],
  );

  return (
    <>
      <PressableField
        isReadonly={isReadonly}
        label={label}
        value={value}
        onPress={toggleSelect}
      />
      {isSelectVisible && (
        <Modal transparent onRequestClose={closeSelect}>
          <TouchableOpacity style={overlayStyle} onPress={closeSelect} />
          <View style={containerStyle}>
            <FlatList
              data={data}
              keyExtractor={item => `${item.id}`}
              renderItem={({item, index}) => (
                <ListItem
                  {...item}
                  isSelected={item.id === selectedId}
                  onPress={select}
                  useDivider={data.length > 1 && index !== data.length - 1}
                />
              )}
            />
          </View>
        </Modal>
      )}
    </>
  );
};

export const Selector = React.memo(Selector_);
