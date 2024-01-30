import { DispatchAction } from "../definitions.redux";

type SetClickedMoodAction = DispatchAction<"SET_CLICKED_MOOD", string>;

const clickedMood = (state = [], action: SetClickedMoodAction) => {
    switch (action.type) {
        case "SET_CLICKED_MOOD":
            return action.payload;
        default:
            return state;
    }
};
export default clickedMood;
