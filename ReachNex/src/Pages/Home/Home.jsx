import React from "react";
import style from "./Home.module.css";
import Profile from "./Card/profile";
import Card from "./Card/Card";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import ArticleIcon from "@mui/icons-material/Article";

const Home = () => {
  return (
    <div className={style.home}>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <div>
              <Profile></Profile>
            </div>
            <div className={style.profileViwer}>
              <Card>
                <div className={style.statsWrapper}>
                  <div className={style.label}>Profile View</div>
                  <div className={style.value}>30</div>
                </div>
                <div className={style.statsWrapper}>
                  <div className={style.label}>Post impression</div>
                  <div className={style.value}>90</div>
                </div>
              </Card>
            </div>
          </div>
          <div className="col-6">
            <div>
              <Card padding={1}>
                <div className={style.startPostWrapper}>
                  <img
                    src="https://randomuser.me/api/portraits/men/75.jpg"
                    alt="user"
                    className={style.roundedImage}
                  />
                  <div className={style.startPost}>Start Post</div>
                </div>

                <div className={style.icon}>
                  <div className={style.videoIcon}>
                    <OndemandVideoIcon
                      sx={{ color: "green" }}
                    ></OndemandVideoIcon>
                    Video
                  </div>
                  <div className={style.videoIcon}>
                    <InsertPhotoIcon sx={{ color: "blue" }}></InsertPhotoIcon>
                    Photo
                  </div>
                  <div className={style.videoIcon}>
                    <ArticleIcon sx={{ color: "orange" }}></ArticleIcon>Article
                  </div>
                </div>
              </Card>
              <div className={style.postContainer}>
  <div className={style.userInfo}>
    <img
      src="https://randomuser.me/api/portraits/men/75.jpg"
      alt="profile"
      className={style.profilePic}
    />
    <div className={style.details}>
      <div className={style.name}>Ameer Hamza khan • 3rd+</div>
      <div className={style.subtitle}>
        Sales Specialist at TechnoArt • Affiliate marketing || LinkedIn...
      </div>
    </div>
    <button className={style.followButton}>+ Follow</button>
  </div>

  <div className={style.content}>
    <p>
      📌 Product link:
      <a
        href="https://lnkd.in/eCiB4mEq"
        target="_blank"
        rel="noopener noreferrer"
        className={style.link}
      >
        https://lnkd.in/eCiB4mEq
      </a>
    </p>
    <p>
      Toxic leaders want you silent.
      <br />
      Be louder.
    </p>
  </div>

  <div className={style.mediaWrapper}>
    <img
      src="https://i.imgur.com/VzBl7ZK.jpeg"
      alt="post visual"
      className={style.postImage}
    />
  </div>

  <div className={style.actions}>
    <span className={style.actionBtn}>👍 Like</span>
    <span className={style.actionBtn}>💬 Comment</span>
    <span className={style.actionBtn}>🔁 Repost</span>
    <span className={style.actionBtn}>📤 Send</span>
  </div>
</div>

            </div>
          </div>
          <div className="col-3">Column</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
