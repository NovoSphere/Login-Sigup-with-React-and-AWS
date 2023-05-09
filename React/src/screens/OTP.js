import React, { useState, useContext } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { AuthContext } from '../../context/AuthContext'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { otpValidator } from '../helpers/OTPValidator'
import { nameValidator } from '../helpers/nameValidator'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [otp, setOtp] = useState({ value: '', error: '' })
  const { register2 } = useContext(AuthContext)

  const onSignUpPressed = () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const otpError = otpValidator(otp.value)
    if (emailError || passwordError || nameError || otpError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setOtp({ ...otp, error: otpError })
      return
    } 
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>OTP</Header>
      <TextInput
        label="otp"
        returnKeyType="done"
        value={otp.value}
        onChangeText={(text) => setOtp({ value: text, error: '' })}
        error={!!otp.error}
        errorText={otp.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={async () => {
          onSignUpPressed();
          const result = await register2(otp);
          if (result) {
            console.log(result);
            navigation.reset({
              index: 0,
              routes: [{ name: 'Dashboard' }],
            });
          }
        }}
        
        
        
        style={{ marginTop: 24 }}
      >
        VERIFY
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  
})
