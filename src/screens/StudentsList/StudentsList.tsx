import React from 'react';
import {FlatList} from 'react-native';

import {observer} from 'mobx-react';
import {ButtonAdd} from '../../components/ButtonAdd';
import {Flex} from '../../components/Flex';
import {Txt} from '../../components/Txt';
import {Colors} from '../../constants';
import {useFlag} from '../../hooks/use-flag';
import students from '../../store/students';
import {StudentDetails} from './StudentDetails';
import {StudentItem} from './StudentItem';
import {IStudentItem} from '../../types';

const StudentsList_: React.FC<{}> = observer(() => {
  const [isManageOpened, openManageModal, closeManageModal] = useFlag();
  const [selectedStudent, setSelectedStudent] =
    React.useState<IStudentItem | null>(null);

  const hasStudents: boolean = students.list.length > 0;

  const removeStudent = React.useCallback(id => students.removeStudent(id), []);

  const edit = React.useCallback<(item: IStudentItem) => void>(
    item => {
      setSelectedStudent(item);
      openManageModal();
    },
    [openManageModal],
  );

  const closeModal = React.useCallback(() => {
    closeManageModal();
    setSelectedStudent(null);
  }, [closeManageModal]);

  return (
    <Flex
      padding={15}
      justifyContent={hasStudents ? undefined : 'center'}
      alignItems={hasStudents ? undefined : 'center'}>
      {hasStudents ? (
        <FlatList
          data={students.list}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => (
            <StudentItem item={item} onEdit={edit} onRemove={removeStudent} />
          )}
        />
      ) : (
        <Txt color={Colors.grayDark}>Нет учеников</Txt>
      )}
      <ButtonAdd onPress={openManageModal} iconName="user-plus" />
      {isManageOpened && (
        <StudentDetails student={selectedStudent} onClose={closeModal} />
      )}
    </Flex>
  );
});

export const StudentsList = React.memo(StudentsList_);
