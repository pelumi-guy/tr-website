// utils/llmService.js
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import ErrorHandler from '../utils/errorHandler.js';
import dotenv from 'dotenv';

dotenv.config({ path: "config.env" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Define the schema for the structured response
const searchSchema = {
    type: 'OBJECT',
    properties: {
        'keywords': {
            type: 'STRING',
            description: 'A comma-separated list of important nouns, adjectives, and locations from the user\'s query. Include property types (e.g., duplex, flat), locations, and key features (e.g., pool, security).',
        },
        'maxPrice': {
            type: 'NUMBER',
            description: 'The maximum price in numbers mentioned or implied (e.g., "under 50 million" means maxPrice is 50000000). If no maximum price is found, this must be null.',
            nullable: true,
        },
        'minPrice': {
            type: 'NUMBER',
            description: 'The minimum price in numbers mentioned or implied (e.g., "above 20 million" means minPrice is 20000000). If no minimum price is found, this must be null.',
            nullable: true,
        },
    },
    required: ['keywords', 'maxPrice', 'minPrice'],
};

/**
 * Parses a user's natural language search query to extract structured search terms using the Gemini API.
 * @param {string} userQuery - The natural language query from the user.
 * @returns {Promise<{keywords: string, maxPrice: number | null, minPrice: number | null}>} A structured object with search terms.
 */
const getStructuredSearchTerms = async(userQuery) => {
    if (!userQuery || userQuery.trim() === '') {
        throw new ErrorHandler('Search query cannot be empty.', 400);
    }

    try {
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash-latest', // Use a modern, fast model
            generationConfig: {
                response_mime_type: 'application/json',
                response_schema: searchSchema,
            },
            // Safety settings to reduce the chance of the AI refusing to answer
            safetySettings: [{
                    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
                {
                    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
                },
            ],
        });

        const prompt = `
      Analyze the following real estate search query and extract the key information based on the provided JSON schema.
      The query is: "${userQuery}"
    `;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const responseText = response.text();

        // The response text should be a valid JSON string.
        // We parse it to get the final object.
        const structuredData = JSON.parse(responseText);

        console.log('LLM Structured Response:', structuredData);
        return structuredData;

    } catch (error) {
        console.error('Error contacting Gemini API:', error);
        // You might want to have a fallback here, like just using the raw query as keywords
        // For now, we'll throw a server error.
        throw new ErrorHandler('Failed to process search query with AI service.', 500);
    }
};

export default getStructuredSearchTerms;