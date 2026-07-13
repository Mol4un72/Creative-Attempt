"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Card from "../../components/Card/Card";
import { supabase } from "../../lib/supabase";
import style from "./page.module.css";

export default function ProfileClient() {
  const router = useRouter();

  const [profile, setProfile] = useState(null);
  const [arts, setArts] = useState([]);
  const [achievements, setAchievements] = useState([])

  useEffect(() => {
    loadProfile();
  }, []);

  if (!profile) {
    return (
      <div className={style.page}>
      </div>
    );
  }

  async function loadProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("USER:", user);

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: profileData, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      router.push("/login");
      return;
    }

    const { data: artsData } = await supabase
      .from("arts")
      .select("*")
      .eq("creator_id", user.id);

    const formattedArts =
      artsData?.map((art) => ({
        id: art.id,
        name: art.name,
        price: art.price,
        image: art.image_url,
      })) || [];

    const { data } = await supabase
    .from("user_achievements")
    .select(`
        achievements (
        id,
        name,
        ach_url
      )
    `)
    .eq("user_id", user.id);

    const achievements = data?.map((item) => item.achievements) || [];

    setAchievements(achievements);
    setProfile(profileData);
    setArts(formattedArts);
  }

  return (
    <div className={style.page}>
      <main>
    
        <section className={style.profileBanner}>
    
          <div className={style.avatarWrap}>
            <div className={style.avatar}>
              {profile.avatar_url && (
                <img
                  src={profile.avatar_url}
                  alt={profile.username}
                  className={style.avatarImage}
                />
              )}
            </div>
          </div>
            
            
          <div className={style.profileInfo}>
            <div className={style.nicknameRow}>
              <h1 className={style.nickname}>
                {profile.username}
              </h1>
            
              <Link 
                href="/profile/settings-page" 
                className={style.settingsBtn}
              >
                <img 
                  src="/settings.svg" 
                  alt="Settings"
                  width={22}
                  height={22}
                />
              </Link>
            </div>
            
            
            <p className={style.profileStats}>
              <span>
                <strong>{arts.length}</strong> artworks
              </span>
            </p>
            
          </div>


          <ul className={style.achievements}>

            {achievements.map((achievement) => (

              <li key={achievement.id} className={style.achievementItem}>

                <div className={style.achievement}>
                  {achievement.ach_url && (
                    <img src={achievement.ach_url} alt={achievement.name} />
                  )}
                </div>

                <span className={style.achievementName}>
                  {achievement.name}
                </span>

              </li>

            ))}

          </ul>

        </section>



        <section className={style.artSection}>

          <h2 className={style.sectionTitle}>
            Collection
          </h2>

          <div className={style.cards}>
            {arts.map((art) => (
              <Link key={art.id} href={`/gallery/${art.id}`}>
                <Card art={art} />
              </Link>
            ))}
          </div>

        </section>

      </main>

    </div>
  );
}