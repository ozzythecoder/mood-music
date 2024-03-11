export interface Artist {
    id: string;
    name: string;
    images?: {
        height: number;
        url: string;
        width: number;
    }[];
    followers?: {
        href: null;
        total: number;
    };
    genres?: string[];
}
