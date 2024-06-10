import { createSlice } from "@reduxjs/toolkit"

const portfolioSlice = createSlice({
    name: "portfolios",
    initialState: {
        portfolios: [],
      
    },
    reducers: {
        addPortfolio(state, action) {
            console.log(action.payload._id) 
            if (!state.portfolios.find(el => el._id === action.payload._id))
                state.portfolios.unshift(action.payload)

        },
        clearStorage(state) {
            state.portfolios.splice(0, state.files.length)
        },
        filterPortfolio(state, action) {
            console.log(state)
            console.log(action) 
            state.portfolios = state.portfolios.filter(portfolio => portfolio._id !== action.payload)
            console.log("filtered")
        }
    }
})

export default portfolioSlice.reducer
export const {addPortfolio, clearStorage, filterPortfolio} = portfolioSlice.actions