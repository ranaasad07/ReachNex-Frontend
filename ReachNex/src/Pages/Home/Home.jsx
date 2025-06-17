import React from "react";
import style from "./Home.module.css";
import Profile from "./Card/profile";
import Card from "./Card/Card";
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import ArticleIcon from '@mui/icons-material/Article';

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
                  <div className={style.videoIcon}><OndemandVideoIcon></OndemandVideoIcon>Video</div>
                  <div className={style.videoIcon}><InsertPhotoIcon></InsertPhotoIcon>Photo</div>
                  <div className={style.videoIcon}><ArticleIcon></ArticleIcon>Article</div>
                </div>
              </Card>
            </div>
          </div>
          <div className="col-3">Column</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
