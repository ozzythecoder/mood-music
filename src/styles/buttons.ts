import * as Colors from "./colors";
import * as Typography from "./typography";

export const rounded = {
    borderRadius: 8,
};

export const small = {
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
};

export const square = {
    aspectRatio: "square",
    padding: 8,
};

export const centered = {
    justifyContent: "center",
    alignItems: "center",
} as const;

export const simpleSmallButton = {
    ...rounded,
    ...small,
    ...centered,
    ...Typography.label,
    backgroundColor: Colors.primary.dark,
    margin: 4,
};
