import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { GiftedChat, Bubble, InputToolbar, Send, Composer } from 'react-native-gifted-chat';
import { doc, onSnapshot, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { auth, database } from '../config/firebase';
import { colors } from '../config/constants';
import ChatHeader from '../components/ChatHeader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  messageBubble: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  inputToolbar: {
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  inputPrimary: {
    alignItems: 'center',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: colors.secondaryLight,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
  },
  composer: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
    lineHeight: 20,
    maxHeight: 100,
  },
  scrollToBottom: {
    backgroundColor: colors.secondaryLight,
    borderRadius: 25,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  listView: {
    backgroundColor: colors.background,
  },
  listContent: {
    paddingVertical: 10,
  }
});

const Chatroom = ({ route, navigation }) => {
  const { chatroomId, chatroomName } = route.params;
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <ChatHeader chatName={chatroomName} chatId={chatroomId} />,
    });

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
  }, [chatroomId, chatroomName, navigation]);

  const onSend = useCallback(
    async (newMessages = []) => {
      const chatroomRef = doc(database, 'chatrooms', chatroomId);
      const message = {
        ...newMessages[0],
        createdAt: new Date(),
      };
      await updateDoc(chatroomRef, {
        messages: arrayUnion(message),
        lastUpdated: serverTimestamp(),
      });
    },
    [chatroomId]
  );

  const renderBubble = (props) => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: colors.teal,
          borderRadius: 20,
          borderBottomRightRadius: 4,
          padding: 2,
          ...styles.messageBubble,
        },
        left: {
          backgroundColor: colors.secondary,
          borderRadius: 20,
          borderBottomLeftRadius: 4,
          padding: 2,
          ...styles.messageBubble,
        },
      }}
      textStyle={{
        right: {
          color: '#fff',
        },
        left: {
          color: theme.isDark ? '#fff' : '#000',
        },
      }}
    />
  );

  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={styles.inputToolbar}
      primaryStyle={styles.inputPrimary}
    />
  );

  const renderSend = (props) => (
    <Send {...props} containerStyle={styles.sendButton}>
      <Ionicons name="send" size={24} color={colors.teal} />
    </Send>
  );

  const renderComposer = (props) => (
    <Composer
      {...props}
      textInputStyle={styles.composer}
      placeholder="Type a message..."
      placeholderTextColor={colors.grey}
    />
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.teal} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth.currentUser.email,
          name: auth.currentUser.displayName,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderSend={renderSend}
        renderComposer={renderComposer}
        alwaysShowSend
        scrollToBottom
        scrollToBottomStyle={styles.scrollToBottom}
        listViewProps={{
          style: styles.listView,
          contentContainerStyle: styles.listContent,
        }}
      />
    </View>
  );
};

export default Chatroom;
