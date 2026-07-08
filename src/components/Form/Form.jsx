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
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  });
  const isLogin = mode === 'login';
  const state = INITIAL_STATE[mode];

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {
      email: !email,
      password: !password,
      confirmPassword: !isLogin ? !confirmPassword : false,
    };

    if (!email || !password || (!isLogin && !confirmPassword) || (!isLogin && password !== confirmPassword)) {
      if (!isLogin && password && confirmPassword && password !== confirmPassword) {
        nextErrors.confirmPassword = true;
      }

      setErrors(nextErrors);
      return;
    }

    setErrors({ email: false, password: false, confirmPassword: false });
  };

  const handleModeChange = (selectedMode) => {
    setMode(selectedMode);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors({ email: false, password: false, confirmPassword: false });
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
