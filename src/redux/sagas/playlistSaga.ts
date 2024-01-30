import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

type CreatePlaylistAction = {
    type: string;
    payload: {
        _id: string;
        moodName: string;
        color: string;
    };
};

//    fetches songs from the mongodb based on the clicked mood.
//      Currently returning a list of up to ten songs who have a mood that matches the mood.
function* CreatePlaylist(action: CreatePlaylistAction) {
    console.log("in playlist saga", action.payload);
    try {
        const response: AxiosResponse = yield call(
            axios.get,
            "http://localhost:3000/api/playlist",
            { params: action.payload },
        );

        yield put({
            type: "SET_NEW_PLAYLIST",
            payload: response.data,
        });
    } catch (error) {
        console.log("Error with create playlist saga:", error);
    }
}

// saves newPlaylist to the db
function* SavePlaylist(action: CreatePlaylistAction) {
    console.log("in playlist saga", action.payload);
    try {
        yield call(axios.post, "http://localhost:3000/api/playlist", action.payload);

        // yield put({
        //   type: "GET_PLAYLISTS",
        //   payload: response.data,
        // });
    } catch (error) {
        console.log("Error with save playlist saga:", error);
    }
}

function* newPlaylistSaga() {
    yield takeLatest("CREATE_NEW_PLAYLIST", CreatePlaylist);
    yield takeLatest("SAVE_PLAYLIST", SavePlaylist);
}

export default newPlaylistSaga;
