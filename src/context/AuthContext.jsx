import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    loginUser,
    registerUser,
    logoutUser,
    subscribeToAuthChanges
} from '../services/authService';

import { getUserProfile } from '../services/userService';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = subscribeToAuthChanges(async (user) => {
            setCurrentUser(user);
            if (user) {
                try {
                    const profile = await getUserProfile(user.uid);
                    setUserProfile(profile);
                } catch (error) {
                    console.error("Error fetching profile in context:", error);
                }
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        return await loginUser(email, password);
    };

    const register = async (email, password, name) => {
        return await registerUser(email, password, name);
    };

    const logout = async () => {
        return await logoutUser();
    };

    const refreshProfile = async () => {
        if (currentUser) {
            const profile = await getUserProfile(currentUser.uid);
            setUserProfile(profile);
            return profile;
        }
    };

    const value = {
        currentUser,
        userProfile,
        login,
        register,
        logout,
        refreshProfile,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
