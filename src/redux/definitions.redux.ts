export type DispatchAction<T, K> = {
    type: T;
    payload: K;
};

export interface SpotifyToken {
    accessToken: string;
    expirationDate: Date | null;
};
