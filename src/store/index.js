import { usersReducer } from "./slices/usersSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { albumsApi } from "./apis/albumsApi";
import { photosApi } from "./apis/photosApi";


export const store = configureStore({
    reducer:{
        users: usersReducer,
        [albumsApi.reducerPath] : albumsApi.reducer,
        [photosApi.reducerPath] : photosApi.reducer,
    }, 

    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware)
    }
})

setupListeners(store.dispatch);

export * from './thunks/fetchUsers';
export * from './thunks/addUsers';
export * from './thunks/removeUser';
export {useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation} from './apis/albumsApi'
export {useFetchPhotoQuery, useAddPhotoMutation, useRemovePhotoMutation} from './apis/photosApi'