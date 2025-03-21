import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { doc, onSnapshot, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';

import { auth, database } from '../config/firebase';
import { colors } from '../config/constants';

const Chatroom = ({ route }) => {
  const { chatroomId } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(doc(database, 'chatrooms', chatroomId), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const chatroomData = docSnapshot.data();
        setMessages(
          chatroomData.messages.map((msg) => ({
            ...msg,
            createdAt: msg.createdAt.toDate(),
          }))
        );
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [chatroomId]);

  const onSend = useCallback(
    async (newMessages = []) => {
      const chatroomRef = doc(database, 'chatrooms', chatroomId);
      await updateDoc(chatroomRef, {
        messages: arrayUnion({
          ...newMessages[0],
          createdAt: serverTimestamp(),
        }),
      });
    },
    [chatroomId]
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.teal} />
      </View>
    );
  }

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth.currentUser.email,
        name: auth.currentUser.displayName,
      }}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Chatroom;
