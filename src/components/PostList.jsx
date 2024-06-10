
import React, { useEffect } from "react";
import PostItem from "./PostItem";
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { addPost } from "../store/postSlice";

const PostList = ({ title }) => {
  const posts = useSelector(state => state.posts.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get("/api/posts").then((result) => { 
      result.data.forEach(element => {
        dispatch(addPost(element))
        console.log("---------")
        console.log(element)
      });
    })
  },[])

  return (
    <div>
      <h1>{title}</h1>
      {posts.map((post, index) => (
        <PostItem number={index + 1} _id={post._id}  post={post}  key={post.id}/>
       
      ))}
    </div>
  );
}

export default PostList;

