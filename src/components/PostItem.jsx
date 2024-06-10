import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { filterPost } from "../store/postSlice";
import axios from "axios";
import { ContextUser } from "../index";

const PostItem = (props) => {
  const dispatch = useDispatch();
  const {user} = useContext(ContextUser)
  
  const dellPost = async () => {
    console.log(props._id)
    try {
      await axios.delete(`/api/posts/${props._id}`)
       dispatch(filterPost(props._id))
    } catch (error) {
      console.error("(dellPost) Ошибка при отправке данных на сервер:", error);
    }
  };
  function formatContent(content) {
    return content.split('\n').map((line, index) => (
        <span key={index} style={{ whiteSpace: 'pre-wrap' }}>
            {'    '}{line}
            <br />
        </span>
    ));
}
if (!user.isAuth || user.user.role !== 'admin') {
  return (
    <div className="post">
      <div className="post__content">
        <h3 className="postItem item__1"> 
          {/* {props.number}. {props.post.title} */}
          {props.post.title}
        </h3>
        <div className="postItem item__2">{formatContent(props.post.content)}</div>
        <div className="postItem item__3">
            <img src={props.post.picture} alt="s123123" width={"560px"}></img>
            </div>
        
      </div>
    </div>
  );
}
  return (
    <div className="post">
      <div className="post__content">
        <h3 className="postItem item__1"> 
          {/* {props.number}. {props.post.title} */}
          {props.post.title}
        </h3>
        <div className="postItem item__2">{formatContent(props.post.content)}</div>
        <div className="postItem item__3">
            <img src={props.post.picture} alt="s123123" width={"560px"}></img>
            </div>
        
      </div>
      <div className="post__btns">
      <>
            <button onClick={()=>(dellPost())  }>Удалить</button>
      </>      
      </div>
    </div>
  );
};

export default PostItem;
