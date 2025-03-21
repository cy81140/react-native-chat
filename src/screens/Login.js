import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { auth } from '../config/firebase';
import { colors } from '../config/constants';
import backImage from '../assets/background.png'; // Ensure this path is correct
import Button from '../components/Button'; // Import Button component

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = () => {
    if (email !== '' && password !== '') {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log('Login success'))
        .catch((err) => Alert.alert('Login error', err.message));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.gradientBackground} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to your account</Text>
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
        <TouchableOpacity
          onPress={() => Alert.alert('Forgot Password?', 'This feature is coming soon.')}
        >
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <Button title="Log In" variant="contained" onPress={onHandleLogin} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.footerLink}>Sign Up</Text>
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
    backgroundColor: colors.primary,
  },
  whiteSheet: {
    backgroundColor: colors.secondary,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    bottom: 0,
    height: '70%',
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
    fontSize: 32,
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
    backgroundColor: colors.secondary,
    borderRadius: 12,
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
    height: 50,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: colors.teal,
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.teal,
    borderRadius: 10,
    height: 58,
    justifyContent: 'center',
    marginTop: 20,
    ...(Platform.OS === 'web' ? {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
    } : Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
    })),
  },
  buttonText: {
    color: colors.text,
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

Login.propTypes = {
  navigation: PropTypes.object.isRequired,
};
