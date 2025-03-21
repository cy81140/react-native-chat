import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { updateProfile, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Text,
  View,
  Image,
  Alert,
  TextInput,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../config/constants';
import backImage from '../assets/background.png'; // Ensure this path is correct
import { auth, database } from '../config/firebase';

export default function SignUp({ navigation }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onHandleSignup = () => {
    if (email !== '' && password !== '') {
      createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
          updateProfile(cred.user, { displayName: username }).then(() => {
            setDoc(doc(database, 'users', cred.user.email), {
              id: cred.user.uid,
              email: cred.user.email,
              name: cred.user.displayName,
              about: 'Available',
            });
          });
          console.log(`Signup success: ${cred.user.email}`);
        })
        .catch((err) => Alert.alert('Signup error', err.message));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.gradientBackground} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={20} color={colors.grey} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor={colors.grey}
            autoCapitalize="none"
            keyboardType="default"
            textContentType="name"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color={colors.grey} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            placeholderTextColor={colors.grey}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color={colors.grey} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            placeholderTextColor={colors.grey}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={onHandleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'linear-gradient(180deg, #00bcd4, #008080)',
  },
  whiteSheet: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 60,
    bottom: 0,
    height: '75%',
    position: 'absolute',
    width: '100%',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  title: {
    alignSelf: 'center',
    color: colors.text,
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    alignSelf: 'center',
    color: colors.grey,
    fontSize: 16,
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.grey,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    height: 58,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.teal,
    borderRadius: 10,
    height: 58,
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    color: colors.grey,
    fontSize: 14,
  },
  footerLink: {
    color: colors.teal,
    fontSize: 14,
    fontWeight: 'bold',
  },
});

SignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};
