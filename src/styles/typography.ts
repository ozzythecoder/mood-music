import { material, systemWeights } from "react-native-typography";

export const bold = {
    ...systemWeights.bold,
};

export const thin = {
    ...systemWeights.thin,
};

export const heading1 = {
    ...material.headlineObject,
    ...systemWeights.bold,
    marginBottom: 10,
    marginTop: 10,
};

export const heading2 = {
    ...material.titleObject,
    ...systemWeights.bold,
};

export const label = {
    ...material.body2Object,
    fontSize: 16,
};
