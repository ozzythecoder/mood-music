export const spacing = {
};

export const row = {
    display: "flex",
    flexDirection: "row",
} as const;

export const col = {
    display: "flex",
    flexDirection: "column",
} as const;

export const centered = {
    justifyContent: "center",
    alignItems: "center",
} as const;

export const spacedFlexRow = {
    ...row,
    ...centered,
    gap: 4,
};

export const spacedFlexCol = {
    ...col,
    ...centered,
    gap: 4,
};
