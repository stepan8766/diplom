import { createSlice } from "@reduxjs/toolkit"

const postSlice = createSlice({
    name: "posts",
    initialState: {
        posts: [],
      
    },
    reducers: {
        addPost(state, action) {
            console.log(action.payload._id) 
            if (!state.posts.find(el => el._id === action.payload._id))
                state.posts.unshift(action.payload)

        },
        clearStorage(state) {
            state.posts.splice(0, state.files.length)
        },
        filterPost(state, action) {
            console.log(state)
            console.log(action) 
            state.posts = state.posts.filter(post => post._id !== action.payload)
            console.log("filtered")
        }
    }
})

export default postSlice.reducer
export const {addPost, clearStorage, filterPost} = postSlice.actions