import axios from "axios";

export async function addOrEditSongs({ payload }: { payload: any }) {
    await axios.post(`${process.env.BASE_URL}/api/songs`, payload);
}

export async function fetchSongs() {
    await axios.get(`${process.env.BASE_URL}/api/songs`);
}
