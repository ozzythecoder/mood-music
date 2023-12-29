import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function SpotifyAccessToken() {

    const dispatch = useDispatch();

    useEffect(() => {
        // where we first call the fetch for the API Access Token through Saga to set to Redux state
        dispatch({ type: 'FETCH_SPOTIFY_ACCESS_TOKEN' });
    }, [dispatch]);

    return null; // nothing needs to be rendered in this component
}

export default SpotifyAccessToken;