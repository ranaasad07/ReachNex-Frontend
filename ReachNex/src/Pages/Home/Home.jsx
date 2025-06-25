import React from 'react'
import SidebarProfile from './Card/SidebarProfile'
import Feed from './Card/Feed'
import RightSidebar from './Card/RightSidebar'
import PostInputBox from './Card/PostInputBox'
import style from './Home.module.css'


// const user = {
//     name:"Faizan Tariq",
//     adress:"Lahore"
// }

const Home = () => {
  return (
     <div className={style.container}>
        <SidebarProfile />
      <div>
        <PostInputBox />
        <Feed/>
      </div>
      <RightSidebar/>
      
    </div>
  )
}

export default Home
