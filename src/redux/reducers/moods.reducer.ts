import { DispatchAction } from "../definitions.redux";

type SetMoodsAction = DispatchAction<"SET_MOODS", string[]>;

const moods = (state = [], action: SetMoodsAction) => {
    switch (action.type) {
        case "SET_MOODS":
            return action.payload;
        default:
            return state;
    }
};
export default moods;
