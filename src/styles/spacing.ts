export const spacing = {
    standardGap: 4,
    extendedGap: 12,
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
    gap: spacing.standardGap,
};

export const spacedFlexCol = {
    ...col,
    ...centered,
    gap: spacing.standardGap,
};
