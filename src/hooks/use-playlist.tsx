import { useDispatch } from "react-redux";
import type { Mood } from "@src/definitions";

const usePlaylist = () => {
    const dispatch = useDispatch();
    // sends the clicked mood to a saga to generate a playlist from the DB
    return async function (mood: Mood) {
        dispatch({
            type: "CREATE_NEW_PLAYLIST",
            payload: mood,
        });
    };
};

export default usePlaylist;
