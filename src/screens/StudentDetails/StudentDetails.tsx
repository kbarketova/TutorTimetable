import React from 'react';
import {Image, Text, View} from 'react-native';
import {StudentInfo} from './StudentInfo';

const StudentDetails_: React.FC<{}> = () => {
  const [studentName, setStudentName] = React.useState<string>('Иван Иванов');
  const [studentPhone, setStudentPhone] = React.useState<string>('');
  const [studentEmail, setStudentEmail] =
    React.useState<string>('test@gmail.com');

  const isEditMode: boolean = false;

  return (
    <View>
      <Image
        source={require('../../assets/avatar.png')}
        style={{width: 40, height: 40, borderRadius: 44 / 2}}
      />
      <View>
        <Text style={{fontWeight: 'bold', fontSize: 20, color: 'green'}}>
          Контакты ученика
        </Text>
        <StudentInfo
          name={studentName}
          onChangeName={setStudentName}
          phone={studentPhone}
          onChangePhone={setStudentPhone}
          isEditable={isEditMode}
        />
        {/* <Text>Номер телефона:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setStudentPhone}
          value={studentPhone}
          editable={isEditMode}
        /> */}
      </View>

      {/* <Text>Имейл:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setStudentEmail}
        value={studentEmail}
        editable={isEditMode}
      /> */}
    </View>
  );
};

export const StudentDetails = React.memo(StudentDetails_);
