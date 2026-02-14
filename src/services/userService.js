import { ref, set, get, child } from "firebase/database";
import { db } from "../firebaseConfig";

/**
 * Saves or updates a user's profile information in the Realtime Database.
 * @param {string} userId - The unique ID of the user (from Firebase Auth).
 * @param {Object} profileData - The data to save (name, email, career, university, tests, etc.).
 */
export const saveUserProfile = async (userId, profileData) => {
    try {
        const userRef = ref(db, `users/${userId}`);
        await set(userRef, {
            ...profileData,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error saving user profile:", error);
        throw error;
    }
};

/**
 * Retrieves a user's profile information from the Realtime Database.
 * @param {string} userId - The unique ID of the user.
 * @returns {Promise<Object|null>} The user profile data or null if not found.
 */
export const getUserProfile = async (userId) => {
    try {
        const dbRef = ref(db);
        const snapshot = await get(child(dbRef, `users/${userId}`));
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};
