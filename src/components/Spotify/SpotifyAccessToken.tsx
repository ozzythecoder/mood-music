// component to fetch access token from Spotify - need to have an active access token to do all Spotify API calls
// 'FETCH_SPOTIFY_ACCESS_TOKEN' dispatch goes to spotifySaga to do the token request

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SpotifyAccessToken() {
    const dispatch = useDispatch();
    const { accessToken, expirationDate } = useSelector((state: any) => state.spotify.accessToken);

    // where we first call the fetch for the API Access Token through Saga to set to Redux state
    useEffect(() => {
        // checking if the expiration date has elapsed
        if (!accessToken || (expirationDate && new Date() > new Date(expirationDate))) {
            // if the access token is not set or has expired, fetch a new one
            dispatch({ type: "FETCH_SPOTIFY_ACCESS_TOKEN" });
        }
    }, [dispatch, accessToken, expirationDate]);

    return null; // nothing to be rendered in this component
}

export default SpotifyAccessToken;
