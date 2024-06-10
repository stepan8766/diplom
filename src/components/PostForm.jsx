// import React from "react";
// import { useState } from "react";
// import axios from 'axios';

// const PostForm = ({ create }) => {
//   const [post, setPost] = useState({ title: "", body: "", picture: "" });
//   const date = new Date();
//   const addNewPost = (e) => {
//     e.preventDefault();
//     const newPost = { ...post, id: date.getMilliseconds() };
//     create(newPost);
//     setPost({ title: "", body: "", picture: "" });
//     axios.post("/api/posts", {newPost:newPost})

//   };
//   return (
//     <div>
//       <form className="post-form">
//         <input
//           value={post.title}
//           onChange={(e) => setPost({ ...post, title: e.target.value })}
//           type="text"
//           placeholder="Название поста"
//         ></input>
//         <input
//           value={post.body}
//           onChange={(e) => setPost({ ...post, body: e.target.value })}
//           type="text"
//           placeholder="Описание поста"
//         ></input>
//         <input
//           value={post.picture}
//           onChange={(e) => setPost({ ...post, picture: e.target.value })}
//           type="file"
//           placeholder="Картинка"
//         ></input>
//         <button className="post-form__button" onClick={addNewPost}>
//           Создать пост
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PostForm;


//---------------------------------------------------------------------------
// import React, { useState } from "react";
// import axios from 'axios';
// import { useDispatch } from "react-redux";
// import { addPost } from "../store/postSlice";

// const PostForm = ({ create }) => {
//   const dispatch = useDispatch()
//   const [post, setPost] = useState({ title: "", body: "", picture: null });
//   const date = new Date();
  
//   const addNewPost = async (e) => {
//     e.preventDefault();
    
//     const formData = new FormData();
//     formData.append('title', post.title);
//     formData.append('body', post.body);
//     formData.append('picture', post.picture);
//     // console.log(formData)
    
//     const newPost = { ...post, id: date.getMilliseconds() };
    
//     try {
//       await axios.post("/api/posts", formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data'
//         }
//       });
//       dispatch(addPost(post))
//       create(newPost);
//       setPost({ title: "", body: "", picture: null });
//     } catch (error) {
//       console.error("Ошибка при отправке данных на сервер:", error);
//     }
//   };

//   const handlePictureChange = (e) => {
//     setPost({ ...post, picture: e.target.files[0] });
//   };

//   return (
//     <div>
//       <form className="post-form">
//         <input
//           value={post.title}
//           onChange={(e) => setPost({ ...post, title: e.target.value })}
//           type="text"
//           placeholder="Название поста"
//         />
//         <input
//           value={post.body}
//           onChange={(e) => setPost({ ...post, body: e.target.value })}
//           type="text"
//           placeholder="Описание поста"
//         />
//         <input
//           onChange={handlePictureChange}
//           type="file"
//           placeholder="Картинка"
//         />
//         <button className="post-form__button" onClick={addNewPost}>
//           Создать пост
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PostForm;

import React, { useState, useRef, useContext } from "react";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { addPost } from "../store/postSlice";
import { ContextUser } from "../index";

const PostForm = ({ create }) => {
  const dispatch = useDispatch();
  const [post, setPost] = useState({ title: "", content: "", picture: null });
  const fileInputRef = useRef(null);
  const { user } = useContext(ContextUser);

  const addNewPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', post.title);
    formData.append('content', post.content);
    formData.append('picture', post.picture);

    axios.post("/api/posts", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then((result) => {
      dispatch(addPost(result.data));
    });

    setPost({ title: "", content: "", picture: null });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePictureChange = (e) => {
    setPost({ ...post, picture: e.target.files[0] });
  };
  // useEffect(() => {
  //   console.log("Состояние изменилось")
  // }, [user.isAuth]);

  if (user.user.role !== 'admin') {
    return <></>; // Если пользователь не авторизован или не является администратором, не отображаем форму
  }
  else return (
    <div>
      <form className="post-form">
        <input
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          type="text"
          placeholder="Название поста"
        />
        <textarea className="text-content"
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          type="text"
          placeholder="Описание поста"
        />

        <div className="input-file-row">
          <label className="input-file">
            <input className="post_input-file"
              onChange={handlePictureChange}
              type="file"
              accept=".jpg .jpeg .png"
              placeholder="Картинка"
              ref={fileInputRef}
            />
            <span>Добавить фото</span>
          </label>
          <div className="input-file-list"></div>
        </div>

        <button className="post-form__button" onClick={addNewPost}>
          Создать пост
        </button>
      </form>
    </div>
  );
};

export default PostForm;

