import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

import { database } from '../config/firebase';
import { colors } from '../config/constants';

const Chatrooms = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'chatrooms'), (snapshot) => {
      setChatrooms(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, []);

  const createChatroom = () => {
    Alert.prompt(
      'Create Chatroom',
      'Enter a name for the chatroom:',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Create',
          onPress: async (name) => {
            if (name.trim()) {
              await addDoc(collection(database, 'chatrooms'), {
                name,
                createdAt: serverTimestamp(),
                messages: [],
              });
            }
          },
        },
      ],
      'plain-text'
    );
  };

  const navigateToChatroom = (chatroom) => {
    navigation.navigate('Chatroom', { chatroomId: chatroom.id, chatroomName: chatroom.name });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={chatrooms}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatroomItem}
            onPress={() => navigateToChatroom(item)}
          >
            <Text style={styles.chatroomName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.createButton} onPress={createChatroom}>
        <Text style={styles.createButtonText}>+ Create Chatroom</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chatroomItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  chatroomName: {
    fontSize: 18,
    color: colors.text,
  },
  createButton: {
    backgroundColor: colors.teal,
    padding: 16,
    alignItems: 'center',
  },
  createButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Chatrooms;
