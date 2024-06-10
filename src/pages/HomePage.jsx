import { useContext, useEffect, useState } from "react"
import React  from 'react'
import "../styles/Page__HomeStyles.css"
import PostList from "../components/PostList"
import PostForm from "../components/PostForm"
import PostMarquee from "../components/PostMarquee"
import HomeBanner from "../components/HomeBanner"
import { ContextUser } from "../index";

import image1 from "C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\promotion1.jpeg"
import image2 from 'C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\promotion2.jpeg'
import image3 from 'C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\promotion3.jpeg'
import image4 from 'C:\\alldesktop\\Diplom2copy\\fundamental-react\\src\\image\\promotion4.jpeg'


const Home_page = () => {
const [posts, setPosts] = useState([])
const { user } = useContext(ContextUser);

const createPost = (newPost) => {setPosts ( [newPost, ...posts])}
const images = [
    image1,
    image2,
    image3,
    image4
];
useEffect(() => {
  console.log("Состояние авторизации изменилось:", user.isAuth);
}, []);
  return (
    <>  
        <HomeBanner/>
      <div className='home-content'>
        <PostForm create={createPost} />
        <PostMarquee images={images}/>
        <PostList posts={posts} />
      </div>
    </>

  )
}

export default Home_page 