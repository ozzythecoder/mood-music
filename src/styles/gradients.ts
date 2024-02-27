import * as Colors from "./colors";

export const topLeftToBottomRight = {
    start: { x: 0, y: 0 },
    end: { x: 1, y: 1 },
    locations: [0.2, 0.6, 1],
};

export const lavender = {
    colors: [
        "#e7d5f6", "#c8afe7", "#f4f2f7",
    ],
    ...topLeftToBottomRight,
};

export const starburst = {
    colors: [
        "#ffb191", "#ff8880", "#7196c6",
    ],
    ...topLeftToBottomRight,
};

export const cloudCity = {
    colors: [
        "#fffce9", "#ffcfd7", "#5aa3e0",
    ],
    start: { x: 0.3, y: 0 },
    end: { x: 0.8, y: 1 },
    locations: [0.1, 0.4, 1],
};
