import { theme } from '../src/core/theme'
import { emailValidator } from '../src/helpers/emailValidator'
import { passwordValidator } from '../src/helpers/passwordValidator'
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoginAuth = (props) => {
  const { email, password, setEmail, setPassword, navigation } = props;
  const emailError = emailValidator(email.value)
  const passwordError = passwordValidator(password.value)
  if (emailError || passwordError) {
    setEmail({ ...email, error: emailError })
    setPassword({ ...password, error: passwordError })
    return
  }
  navigation.reset({
    index: 0,
    routes: [{ name: 'Dashboard' }],
  })
}
export default LoginAuth;
