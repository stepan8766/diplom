import { configureStore } from "@reduxjs/toolkit"
// import { useDispatch } from "react-redux"
import postSlice from "./postSlice" 
import portfolioSlice from "./portfolioSlice" 
// import userSlice from "./UserStore"



const store = configureStore({
    reducer: {
        posts: postSlice,
        portfolios: portfolioSlice,
        // user: userSlice
    },
})

export default store







