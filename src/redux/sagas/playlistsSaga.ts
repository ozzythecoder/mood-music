import { call, put, takeLatest } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

//    fetches playlists from mongodb then calls set_playlists to update store
function* getDBPlaylists() {
    try {
        const response: AxiosResponse = yield call(axios.get, "http://localhost:3000/api/dbplaylists");

        yield put({
            type: "SET_PLAYLISTS",
            payload: response.data,
        });
    } catch (error) {
        console.log("Error with get playlists saga:", error);
    }
};
function* getDBPlaylistSongs() {
    try {
        const response: AxiosResponse = yield call(axios.get, "http://localhost:3000/api/dbplaylists/playlist-songs");

        yield put({
            type: "SET_SELECTED_PLAYLIST",
            payload: response.data,
        });
    } catch (error) {
        console.log("Error with get playlists saga:", error);
    }
};

function* playlistsSaga() {
    yield takeLatest("GET_DB_PLAYLISTS", getDBPlaylists);
    yield takeLatest("GET_SELECTED_PLAYLIST_SONGS", getDBPlaylistSongs);
}

export default playlistsSaga;
