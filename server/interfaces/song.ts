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
