const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3006';

/**
 * Fetches diagnostic questions for a specific test.
 * @param {string} testId - The ID of the test (e.g., 'm1', 'lenguaje').
 * @returns {Promise<Object>} - The API response containing questions.
 */
export const getDiagnosticQuestions = async (testId) => {
    try {
        // Map testId to the correct endpoint if necessary
        const endpoint = `/api/paes/diagnostic-${testId.toLowerCase()}`;
        const response = await fetch(`${API_URL}${endpoint}`);

        if (!response.ok) {
            throw new Error(`Failed to fetch questions: ${response.statusText}`);
        }

        return await response.ok ? await response.json() : { ok: false };
    } catch (error) {
        console.error("Error in getDiagnosticQuestions:", error);
        throw error;
    }
};

/**
 * Submits diagnostic results for a user.
 * @param {Object} results - The results data (userName, userEmail, answers, etc.)
 * @returns {Promise<Object>} - The API response.
 */
export const submitDiagnosticResults = async (results) => {
    try {
        const response = await fetch(`${API_URL}/api/paes/submit-diagnostic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(results)
        });

        if (!response.ok) {
            throw new Error(`Failed to submit results: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error in submitDiagnosticResults:", error);
        throw error;
    }
};
