/**
 * Recursively maps over the properties of an object.
 * @param {object} obj The object to map over.
 * @param {function(any): any} mapFn The function to apply to each non-object value.
 * @returns {object} The new object with mapped values.
 */
const objectMap = (obj, mapFn) => {
    // Handle non-object inputs gracefully (e.g., null, undefined, primitives)
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // Use Object.fromEntries for a more declarative and readable approach
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            // Recursively call objectMap for nested objects (but not arrays)
            const mappedValue = (typeof value === 'object' && !Array.isArray(value) && value !== null) ?
                objectMap(value, mapFn) :
                mapFn(value); // Apply the map function only to non-object leaf nodes

            return [key, mappedValue];
        })
    );
};

export default objectMap;