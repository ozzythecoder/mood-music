export interface Song {
    _id: string;
    title: string;
    artists: string;
    album: string;
    image: string;
    moods: string[];
    moodFull: {
        _id: string;
        moodName: string;
        color: string;
    }[];
}

export interface Artist {
    id: string;
    name: string;
    images?: {
        height: number;
        url: string;
        width: number;
    }[];
    followers?: {
        href: null;
        total: number;
    };
    genres?: string[];
}

export interface Track {
    id: string;
    name: string;
    artists: {
        name: string;
    }[];
    album: {
        name: string;
        images: {
            url: string;
        }[];
    };
}

export interface Playlist {
    _id: string;
    title: string;
    songs: [string];
    description: string;
}

export interface Mood {
    _id: string;
    moodName: string;
    color: string;
}

export type ClickedMoodType = {
    clickedMood: {
        _id: string;
        moodName: string;
        color: string;
    };
};

export type SongArrayType = {
    songs: Song[];
};

export type PlaylistsArrayType = {
    playlists: Playlist[];
};

export type MoodsArrayType = {
    moods: Mood[];
};

export type NewPlaylistType = {
    newPlaylist: Song[];
};
