"use client";

import { useState } from 'react';
import Header from '../../../components/Header/Header';
import Input from '../../../components/Input/Input';
import Textarea from '../../../components/Textarea/Textarea';
import Button from '../../../components/Button/Button';
import styles from './settings.module.css';

export default function SettingsPage() {
  const [tab, setTab] = useState('account');
  const [nickname, setNickname] = useState('Nickname');
  const [displayName, setDisplayName] = useState('');
  const [bio, setBio] = useState('');
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
  };

  const saveAccount = (event) => {
    event?.preventDefault();
    console.log('Save account', { nickname, displayName, bio, avatarPreview });
    alert('Account settings saved (demo)');
  };

  const saveSecurity = (event) => {
    event?.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Save security');
    alert('Security settings saved (demo)');
  };

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <section className={styles.leftCol} aria-hidden>
          <div className={styles.avatarWrap}>
            <div className={styles.avatar} style={avatarPreview ? { backgroundImage: `url(${avatarPreview})` } : {}} />
            <label className={styles.avatarLabel}>
              Change avatar
              <input type="file" accept="image/*" onChange={handleAvatar} className={styles.fileInput} />
            </label>
          </div>
          <h2 className={styles.nick}>{nickname}</h2>
          <p className={styles.help}>Manage your public profile and security settings.</p>
        </section>

        <section className={styles.rightCol}>
          <div className={styles.tabs} role="tablist" aria-label="Settings tabs">
            <button className={`${styles.tab} ${tab === 'account' ? styles.active : ''}`} onClick={() => setTab('account')}>
              Account
            </button>
            <button className={`${styles.tab} ${tab === 'security' ? styles.active : ''}`} onClick={() => setTab('security')}>
              Security
            </button>
          </div>

          <div className={styles.panel}>
            {tab === 'account' && (
              <form onSubmit={saveAccount} className={styles.form}>
                <Input id="nickname" label="Nickname" value={nickname} onChange={(event) => setNickname(event.target.value)} />
                <Input id="display" label="Display name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
                <Textarea id="bio" label="Bio" value={bio} onChange={(event) => setBio(event.target.value)} />

                <div className={styles.row}>
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            )}

            {tab === 'security' && (
              <form onSubmit={saveSecurity} className={styles.form}>
                <Input id="currentPassword" label="Current password" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
                <Input id="newPassword" label="New password" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                <Input id="confirmPassword" label="Confirm new password" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />

                <div className={styles.row}>
                  <Button type="submit">Save security</Button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}