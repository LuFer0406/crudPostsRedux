import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    posts: [
        {
            id: uuidv4(),
            img: "https://ichef.bbci.co.uk/news/640/cpsprodpb/18504/production/_90488599_thinkstockphotos_gato6.jpg",
            title: "Gatico",
            description: "Gatico bebé"
        }
    ]
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state, action) => {
            state.posts.push({...action.payload, id: uuidv4()})
        },
        delPost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload)
        },
        putPost: (state, action) => {
            state.posts = state.posts.map((post) => (post.id === action.payload.id) ? action.payload : post)
        }

    }

})

export const {addPost, putPost, delPost} = postSlice.actions;

export default postSlice.reducer;