import React, { useState, useEffect } from 'react';
import { View, Text, Platform, FlatList, StyleSheet, TouchableOpacity, Alert, TextInput, Modal, Animated } from 'react-native';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { database } from '../config/firebase';
import { colors } from '../config/constants';
import { typography } from '../config/typography';
import { createChatroom } from '../utils/chatroomUtils';
import Button from '../components/Button';
import ContactRow from '../components/ContactRow';  // Add this import

const Chatrooms = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [chatroomName, setChatroomName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, 'chatrooms'), (snapshot) => {
      const sortedRooms = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setChatrooms(sortedRooms);
      
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: Platform.OS !== 'web', // Only use native driver on mobile
      }).start();
    });

    return unsubscribe;
  }, []);

  const handleCreateChatroom = async () => {
    if (!chatroomName.trim()) {
      Alert.alert('Error', 'Chatroom name cannot be empty.');
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(database, 'chatrooms'), {
        name: chatroomName,
        createdAt: serverTimestamp(),
        messages: [],
      });
      setModalVisible(false);
      setChatroomName('');
    } catch (error) {
      Alert.alert('Error', 'Failed to create chatroom');
    } finally {
      setIsLoading(false);
    }
  };

  const showInputModal = () => setModalVisible(true);

  const navigateToChatroom = (chatroom) => {
    navigation.navigate('Chatroom', { 
      chatroomId: chatroom.id, 
      chatroomName: chatroom.groupName || chatroom.name || `Chatroom ${chatroom.id.slice(0, 4)}`
    });
  };

  const renderChatroomItem = ({ item }) => (
    <View style={styles.chatroomItem}>
      <View style={styles.chatroomIcon}>
        <Text style={styles.chatroomInitial}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.chatroomInfo}
        onPress={() => navigateToChatroom(item)}
      >
        <Text style={styles.chatroomName}>{item.name}</Text>
        <Text style={styles.chatroomSubtitle}>
          {`${item.messages?.length || 0} messages`}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <FlatList
          data={chatrooms}
          keyExtractor={(item) => item.id}
          renderItem={renderChatroomItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="chatbubbles-outline" size={64} color={colors.grey} />
              <Text style={styles.emptyStateText}>No chatrooms yet</Text>
              <Text style={styles.emptyStateSubtext}>Create one to get started!</Text>
            </View>
          }
        />
      </Animated.View>

      <TouchableOpacity 
        style={styles.createButton} 
        onPress={() => createChatroom(showInputModal)}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Chatroom</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter chatroom name"
              value={chatroomName}
              onChangeText={setChatroomName}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <Button 
                title="Cancel"
                onPress={() => setModalVisible(false)}
                variant="outlined"
              />
              <Button
                title="Create"
                onPress={handleCreateChatroom}
                disabled={isLoading}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  chatroomItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    margin: 8,
    borderWidth: 1,
    borderColor: colors.border,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    } : Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    })),
  },
  chatroomIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatroomInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  chatroomInfo: {
    flex: 1,
    marginLeft: 16,
  },
  chatroomName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  chatroomSubtitle: {
    fontSize: 14,
    color: '#666666',
  },
  separator: {
    height: 8,
  },
  createButton: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.teal,
    justifyContent: 'center',
    alignItems: 'center',
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
    } : Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    })),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 24,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
    } : Platform.select({
      ios: {
        shadowColor: colors.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    })),
  },
  modalTitle: {
    ...typography.h2,
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    ...typography.h2,
    color: colors.text,
    marginTop: 16,
  },
  emptyStateSubtext: {
    ...typography.body1,
    color: colors.textSecondary,
    marginTop: 8,
  },
});

export default Chatrooms;
