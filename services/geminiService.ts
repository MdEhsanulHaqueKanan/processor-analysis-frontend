// services/geminiService.ts (Corrected Final Version)

// First, import all the types we need from the central types file.
import type { FilterCriteria, Processor, AnalysisInput, AnalysisResult } from '../types';

// THIS IS THE CRUCIAL FIX: Re-export the types so other files can import them from this service.
export type { FilterCriteria, Processor, AnalysisInput, AnalysisResult };

// --- API Endpoints ---
const PREDICT_API_URL = 'http://127.0.0.1:5000/api/predict';
const RECOMMEND_API_URL = 'http://127.0.0.1:5000/api/recommend';


// ====================================================================
// --- Function for the AI Processor Analyzer ---
// ====================================================================

/**
 * This function sends processor specifications to your local Flask backend for analysis.
 */
export async function analyzeProcessor(input: AnalysisInput): Promise<AnalysisResult> {
    console.log("Sending data to Flask backend for prediction:", input);

    try {
        const response = await fetch(PREDICT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Request failed with status: ${response.status}`);
        }

        const data: AnalysisResult = await response.json();
        
        if (!data.primaryFunction || !data.wirelessCapabilities) {
            throw new Error("Backend response is missing required fields for analysis.");
        }
        
        console.log("Received prediction data from Flask backend:", data);
        return data;

    } catch (error) {
        console.error("Error calling prediction backend:", error);
        throw new Error(`Failed to get analysis. Please ensure the backend server is running. Details: ${error instanceof Error ? error.message : String(error)}`);
    }
}


// ====================================================================
// --- Function for the Recommendation Engine ---
// ====================================================================

/**
 * This function sends filter criteria to your Flask backend and fetches a list of recommended processors.
 */
export async function getRecommendations(filters: FilterCriteria): Promise<Processor[]> {
    console.log("Requesting recommendations with filters:", filters);

    // Translate frontend filter names to the names your Python backend expects.
    const payload = {
        designer: filters.designer,
        min_year: filters.releaseYearRange[0],
        max_year: filters.releaseYearRange[1],
        min_cores: filters.minCores,
        needs_5g: filters.has5g,
        needs_wifi_6: filters.hasWifi6,
    };

    try {
        const response = await fetch(RECOMMEND_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `Request failed with status: ${response.status}`);
        }

        const data: Processor[] = await response.json();
        console.log("Received recommendations:", data);
        return data;

    } catch (error) {
        console.error("Error fetching recommendations:", error);
        throw new Error(`Failed to get recommendations. Please ensure the backend server is running. Details: ${error instanceof Error ? error.message : String(error)}`);
    }
}