"use client";

import { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
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
};

export default function Form({ initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const isLogin = mode === 'login';
  const state = INITIAL_STATE[mode];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      alert('Please complete both fields.');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    console.log(mode === 'login' ? 'Login' : 'Register', { email, password });
    alert(`${state.submitLabel} submitted (demo)`);
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <div className={styles.container}>
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

      <form className={styles.form} noValidate onSubmit={handleSubmit}>
        <Input
          id={`${mode}-email`}
          label="Email or Username"
          type="email"
          placeholder={state.emailPlaceholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
        />

        <Input
          id={`${mode}-password`}
          label="Password"
          type="password"
          placeholder={state.passwordPlaceholder}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete={isLogin ? 'current-password' : 'new-password'}
        />

        {!isLogin && (
          <Input
            id="register-password-confirm"
            label="Confirm Password"
            type="password"
            placeholder={state.confirmPlaceholder}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            autoComplete="new-password"
          />
        )}

        <Button type="submit" size="lg" className={styles.submitButton}>
          {state.submitLabel}
        </Button>
      </form>

      <div className={styles.footer}>
        <span>{state.alternateText}</span>
        <button type="button" className={styles.switchLink} onClick={() => handleModeChange(isLogin ? 'register' : 'login')}>
          {state.alternateAction}
        </button>
      </div>
    </div>
  );
}
