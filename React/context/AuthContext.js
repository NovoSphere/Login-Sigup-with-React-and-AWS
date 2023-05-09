import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext();

export const AuthProvider = ({ children, navigation }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  //SignUp Validation(If In SignUp OTP is Verified Then the Data Will Be sent To Data Base)
  const Validation = () => {
    console.log('Validation Entered');
    fetch('data base api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
    .then((res) => res.json())
    .then((data) => {
      setCurrentUser(data);
      console.log(data);
    })
    .catch((e) => {
      console.log(`register error ${e}`);
    });

    
  };
//signup(Email and OTPstate will be sent)
const register = (name, email, password) => {
  setEmail(email.value);
  setName(name.value);
  setPassword(password.value);
  fetch('API', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      otpstate: 'SENDOTP',
      emailid: email.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      setCurrentUser(data);
      console.log(data);
    })
    .catch((e) => {
      console.log(`register error ${e}`);
    });
};

//login
const register1 = (email, password) => {
  return new Promise((resolve, reject) => {
    fetch('API', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
        const message = data.body.message;
        console.log(message);
        if (message === 'verified') {
          resolve(true);
        }
        if (message === 'password_incorrect') {
          alert('Invalid Password');
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

//otp(for both SignIn and SignUp)
const register2 = (otp) => {
  return new Promise((resolve, reject) => {
    fetch('API', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otpstate: 'VERIFY',
        emailid: email,
        otp: otp.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        console.log(data);
        const message = data.body;
        console.log(message);
        if (message.message === 'verified succesfully') {
          Validation();//send data
          resolve(true);
        }
        if (message.message === 'OTP invalid') {
          alert('Verification failed. Please check your OTP and try again.');
          resolve(false);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
  return <AuthContext.Provider value={{ currentUser, register, register2,Validation,register1,apiData }}>{children}</AuthContext.Provider>;
};

