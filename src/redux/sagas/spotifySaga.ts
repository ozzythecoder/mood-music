import { put, takeLatest, call, select } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";

// where access token is requested from Spotify - initialized from SpotifyAccessToken component on Home Screen
// sending through back-end - spotify.router - which uses client id and secret from .env file
function* getAccessToken() {
    try {
        console.log("in access token saga");
        const response: AxiosResponse = yield call(axios.post, "http://localhost:3000/api/spotify/accesstoken");
        const accessToken = response.data.access_token;
        console.log("access token is:", accessToken);

        // calculating the expiration date (token is only good for 1 hour)
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1);
        console.log("expiration date is:", expirationDate);

        // then we dispatch an action to update the Redux state with the access token
        yield put({
            type: "SET_ACCESS_TOKEN",
            payload: { accessToken, expirationDate },
        });
    } catch (error) {
        console.log("Error with get spotify saga fetch POST:", error);
    }
};

function* spotifySaga() {
    yield takeLatest("FETCH_SPOTIFY_ACCESS_TOKEN", getAccessToken);
}

export default spotifySaga;
