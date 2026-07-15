"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Textarea from '../Textarea/Textarea';
import styles from './Form.module.css';

const INITIAL_STATE = {
  login: {
    submitLabel: 'Sign In',
    alternateText: 'Need an account?',
    alternateAction: 'Create one',
    emailPlaceholder: 'you@example.com',
    passwordPlaceholder: 'Your password',
  },
  register: {
    submitLabel: 'Sign Up',
    alternateText: 'Already have an account?',
    alternateAction: 'Sign in',
    emailPlaceholder: 'you@example.com',
    passwordPlaceholder: 'Create a password',
    confirmPlaceholder: 'Repeat your password',
  },
  contact: {
    submitLabel: 'Send Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@example.com',
    messagePlaceholder: "Tell us what's on your mind…",
  },
};

export default function Form({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    message: false,
  });
  const isLogin = mode === 'login';
  const isRegister = mode === 'register';
  const isContact = mode === 'contact';
  const state = INITIAL_STATE[mode];
  const router = useRouter();


const handleSubmit = async (event) => {
  event.preventDefault();

  const nextErrors = {
    name: isContact ? !name : false,
    email: !email,
    password: isLogin || isRegister ? !password : false,
    confirmPassword: isRegister ? !confirmPassword : false,
    message: isContact ? !message : false,
  };

  const isInvalidContact = isContact && (!name || !email || !message);
  const isInvalidLogin = isLogin && (!email || !password);
  const isInvalidRegister = isRegister && (!email || !password || !confirmPassword || password.length < 6);
  const isPasswordMismatch =
    isRegister && password && confirmPassword && password !== confirmPassword;

  if (isInvalidContact || isInvalidLogin || isInvalidRegister || isPasswordMismatch) {
    if (isPasswordMismatch) {
      nextErrors.confirmPassword = true;
    }

    if (isRegister && password.length < 6) {
      nextErrors.password = true;
    }

    setErrors(nextErrors);
    return;
  }

  setErrors({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
    message: false,
  });


  // LOGIN
  if (isLogin) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log("Login error:", error.message);
      return;
    }

    console.log("Logged in:", data.user);

    router.push("/");
  }


    // REGISTER
  if (isRegister) {
    console.log("START REGISTER");

    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    });

    if (error) {

      console.log("Signup error:", error.message);
      return;
    }

    const user = data.user;

    if (!user) {
      console.log("No user created");
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        username: email.split("@")[0],
      });

    if (profileError) {
      console.log("Profile creation error:", profileError.message);
      return;
    }

    router.push("/");
  }
};

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setName('');
    setMessage('');
    setErrors({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
      message: false,
    });
  };

  return (
    <div className={styles.container}>
      {!isContact && (
        <div className={styles.modeSwitcher} role="tablist" aria-label="Authentication mode selector">
          <button
            type="button"
            className={`${styles.tab} ${isLogin ? styles.active : ''}`}
            onClick={() => handleModeChange('login')}
            aria-selected={isLogin}
          >
            Login
          </button>
          <button
            type="button"
            className={`${styles.tab} ${!isLogin ? styles.active : ''}`}
            onClick={() => handleModeChange('register')}
            aria-selected={!isLogin}
          >
            Register
          </button>
        </div>
      )}

      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        {isContact ? (
          <>
            <Input
              id="contact-name"
              label="Name"
              placeholder={state.namePlaceholder}
              value={name}
              variant={errors.name ? 'input_error' : undefined}
              onChange={(event) => {
                setName(event.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
              }}
            />

            <Input
              id="contact-email"
              label="Email"
              type="email"
              placeholder={state.emailPlaceholder}
              value={email}
              variant={errors.email ? 'input_error' : undefined}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: false }));
              }}
              autoComplete="email"
            />

            <Textarea
              id="contact-message"
              label="Message"
              placeholder={state.messagePlaceholder}
              value={message}
              variant={errors.message ? 'input_error' : undefined}
              onChange={(event) => {
                setMessage(event.target.value);
                if (errors.message) setErrors((prev) => ({ ...prev, message: false }));
              }}
              rows={5}
            />
          </>
        ) : (
          <>
            <Input
              id={`${mode}-email`}
              label="Email"
              type="email"
              placeholder={state.emailPlaceholder}
              value={email}
              variant={errors.email ? 'input_error' : undefined}
              onChange={(event) => {
                setEmail(event.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: false }));
              }}
              autoComplete="email"
            />

            <Input
              id={`${mode}-password`}
              label="Password"
              type="password"
              placeholder={state.passwordPlaceholder}
              value={password}
              variant={errors.password ? 'input_error' : undefined}
              onChange={(event) => {
                setPassword(event.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: false }));
              }}
              autoComplete={isLogin ? 'current-password' : 'new-password'}
            />

            {!isLogin && (
              <Input
                id="register-password-confirm"
                label="Confirm Password"
                type="password"
                placeholder={state.confirmPlaceholder}
                value={confirmPassword}
                variant={errors.confirmPassword ? 'input_error' : undefined}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                  if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: false }));
                }}
                autoComplete="new-password"
              />
            )}
          </>
        )}

        <Button type="submit" size="lg" className={styles.submitButton}>
          {state.submitLabel}
        </Button>
      </form>

      {!isContact && (
        <div className={styles.footer}>
          <span>{state.alternateText}</span>
          <button type="button" className={styles.switchLink} onClick={() => handleModeChange(isLogin ? 'register' : 'login')}>
            {state.alternateAction}
          </button>
        </div>
      )}
    </div>
  );
}
