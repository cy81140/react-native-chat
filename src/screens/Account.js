import React from 'react';
import { View, Alert } from 'react-native';
import { signOut, deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import Cell from '../components/Cell';
import { colors } from '../config/constants';
import { auth, database } from '../config/firebase';

const Account = () => {
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      })
      .catch((error) => console.log('Error logging out: ', error));
  };

  const deleteAccount = () => {
    Alert.alert(
      'Delete account?',
      'Deleting your account will erase your message history. This action cannot be undone.',
      [
        {
          text: 'Delete my account',
          onPress: async () => {
            try {
              await deleteUser(auth?.currentUser);
              await deleteDoc(doc(database, 'users', auth?.currentUser.email));
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.log('Error deleting account: ', error);
            }
          },
        },
        { text: 'Cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View>
      <Cell
        title="Blocked Users"
        icon="close-circle-outline"
        tintColor={colors.primary}
        onPress={() => {
          alert('Blocked users touched');
        }}
        style={{ marginTop: 20 }}
      />
      <Cell
        title="Logout"
        icon="log-out-outline"
        tintColor={colors.grey}
        onPress={onSignOut}
        showForwardIcon={false}
      />
      <Cell
        title="Delete my account"
        icon="trash-outline"
        tintColor={colors.red}
        onPress={deleteAccount}
        showForwardIcon={false}
        style={{ marginTop: 20 }}
      />
    </View>
  );
};

export default Account;
