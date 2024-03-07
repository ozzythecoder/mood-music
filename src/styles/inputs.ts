import * as Colors from "./colors";

export const bordered = {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.neutral,
};

export const padded = {
    padding: 12,
};

export const simpleInput = {
    ...bordered,
    ...padded,
    color: Colors.text,
    backgroundColor: Colors.background,
};
