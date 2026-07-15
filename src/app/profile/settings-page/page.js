"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import { useRouter } from "next/navigation";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import styles from "./settings.module.css";

export default function SettingsPage() {
  const [tab, setTab] = useState("account");
  const [user, setUser] = useState(null);
  const [nickname, setNickname] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setUser(user);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.log("PROFILE ERROR:", error);
      return;
    }

    setNickname(data.username || "");
    setAvatarPreview(data.avatar_url || null);

  }

  function handleAvatar(event) {

    const file = event.target.files?.[0];

    if (!file) return;

    setAvatarFile(file);

    setAvatarPreview(
      URL.createObjectURL(file)
    );

  }

  async function saveAccount(event) {

    event.preventDefault();

    if (!user) return;

    let avatarUrl = avatarPreview;

    // якщо вибрали новий аватар
    if (avatarFile) {

      const filePath = `${user.id}/${Date.now()}-${avatarFile.name}`;

      const {
        error: uploadError
      } = await supabase.storage
        .from("avatars")
        .upload(
          filePath,
          avatarFile,
          {
            upsert: true,
          }
        );

      if (uploadError) {

        console.log(
          "UPLOAD ERROR:",
          uploadError
        );

        alert("Avatar upload failed");
        return;
      }

      const {
        data
      } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);
      avatarUrl = data.publicUrl;

    }

    const {
      error
    } = await supabase
      .from("profiles")
      .update({
        username: nickname,
        avatar_url: avatarUrl,
      })
      .eq(
        "id",
        user.id
      );

    if (error) {

      console.log(
        "PROFILE UPDATE ERROR:",
        error
      );

      alert(error.message);
      return;

    }

    setAvatarPreview(avatarUrl);
    setAvatarFile(null);
    alert("Profile updated");
  }

  async function saveSecurity(event) {

    event.preventDefault();

    if (newPassword.length < 6) {

      alert(
        "Password must be at least 6 characters"
      );

      return;
    }

    if (newPassword !== confirmPassword) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {

      console.log(
        "PASSWORD ERROR:",
        error
      );

      alert(error.message);
      return;

    }

    setNewPassword("");
    setConfirmPassword("");
    alert("Password changed");

  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("LOGOUT ERROR:", error);
      alert(error.message);
      return;
    }

    router.push("/login");
  }

  return (
    <div className={styles.page}>

      <main className={styles.main}>

        <section className={styles.leftCol}>

          <div className={styles.avatarWrap}>

            <div
              className={styles.avatar}
              style={
                avatarPreview
                  ? {
                      backgroundImage:
                        `url(${avatarPreview})`,
                    }
                  : {}
              }
            />

            <label className={styles.avatarLabel}>
              Change avatar
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatar}
                className={styles.fileInput}
              />

            </label>

          </div>

          <h2 className={styles.nick}>
            {nickname}
          </h2>

          <p className={styles.logout} onClick={logout}>
            Logout
          </p>

          <p className={styles.help}>
            Manage your public profile and security settings.
          </p>

        </section>

        <section className={styles.rightCol}>
          
          <div className={styles.tabs}>

            <button
              className={`${styles.tab} ${
                tab === "account"
                  ? styles.active
                  : ""
              }`}
              onClick={() => setTab("account")}
            >
              Account
            </button>

            <button
              className={`${styles.tab} ${
                tab === "security"
                  ? styles.active
                  : ""
              }`}
              onClick={() => setTab("security")}
            >
              Security
            </button>
          </div>

          <div className={styles.panel}>
            {tab === "account" && (
              <form
                onSubmit={saveAccount}
                className={styles.form}
              >
                <Input
                  id="nickname"
                  label="Nickname"
                  value={nickname}
                  onChange={(e)=>
                    setNickname(e.target.value)
                  }
                />

                <Button type="submit" size="sm">
                  Save changes
                </Button>

              </form>

            )}

            {tab === "security" && (

              <form
                onSubmit={saveSecurity}
                className={styles.form}
              >

                <Input
                  id="newPassword"
                  label="New password"
                  type="password"
                  value={newPassword}
                  onChange={(e)=>
                    setNewPassword(e.target.value)
                  }
                />

                <Input
                  id="confirmPassword"
                  label="Confirm password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e)=>
                    setConfirmPassword(e.target.value)
                  }
                />

                <Button type="submit" size="sm">
                  Save security
                </Button>

              </form>

            )}

          </div>

        </section>

      </main>

    </div>
  );
}