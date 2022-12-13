import React from 'react';
import {FlatList} from 'react-native';

import {Flex} from '../../components/Flex';
import students from '../../store/students';
import {StudentItem} from './StudentItem';

const StudentsList_: React.FC<{}> = () => {
  return (
    <Flex padding={15}>
      <FlatList
        data={students.list}
        keyExtractor={item => `${item.id}`}
        renderItem={({item}) => (
          <StudentItem item={item} onEdit={() => console.log('onEdit')} onRemove={() => console.log('remove')} />
        )}
      />
    </Flex>
  );
};

export const StudentsList = React.memo(StudentsList_);
