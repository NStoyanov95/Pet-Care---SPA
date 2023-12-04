import { get, post } from "./api.js";

export async function getLikeCounts(petId) {
    return await get(`data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function isLikedByUser(petId, userId) {
    return await get(`data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function like(petId) {
    return await post("data/donation", { petId });
}