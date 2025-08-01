// utils/APIFeatures.js
import objectMap from "../utils/ObjectMap.js";

class APIFeatures {
    constructor(mongooseQuery, queryString) {
        this.query = mongooseQuery; // The initial Mongoose query object (e.g., Property.find())
        this.queryString = queryString; // The request query object (e.g., req.query)
    }

    /**
     * Performs a multi-keyword search across multiple fields.
     * Expects a `keywords` query parameter, which is a comma-separated string of search terms.
     * Example: /api/v1/properties?keywords=lekki,pool,duplex
     */
    search() {
        if (this.queryString.keywords) {
            const subtype = this.queryString.propertySubtype;

            console.log("subtype:", subtype);
            const keywords = this.queryString.keywords.split(',').map(kw => kw.trim());

            // Create an array of regex conditions for each keyword
            const keywordConditions = keywords.map(keyword => ({
                $or: [
                    // Search in the 'title' field
                    { title: { $regex: keyword, $options: 'i' } },
                    // Search in the 'description' field
                    { description: { $regex: keyword, $options: 'i' } },
                    // Search in the 'location.city' or 'location.street' fields
                    { 'location.city': { $regex: keyword, $options: 'i' } },
                    { 'location.street': { $regex: keyword, $options: 'i' } },
                    // Search in the 'features' array
                    { amenities: { $regex: keyword, $options: 'i' } },
                    // Search in the 'propertySubtype' field
                    { propertySubtype: { $regex: keyword, $options: 'i' } }
                ]
            }));

            // Combine all keyword conditions with an $and operator.
            // This means a document must match conditions for ALL keywords provided.
            // e.g., must match "lekki" AND "pool".
            // this.query = this.query.find({ $and: keywordConditions });

            // --- ALTERNATIVE: Use $or to find properties that match ANY keyword ---
            // If you want to show results that match "lekki" OR "pool", use this instead:
            this.query = this.query.find({ $or: keywordConditions.flatMap(cond => cond.$or) });
        }
        return this;
    }

    filterByCategory() {
        const { category, value } = this.queryString;

        // Only apply the filter if both 'category' and 'value' parameters are present.
        if (category && value) {
            // Define a whitelist of allowed fields to filter by for security.
            // This prevents users from trying to filter by sensitive fields.
            const allowedCategories = [
                'propertyType',
                'propertySubtype',
                'listingType',
                'status',
                'location.city',
                'location.state',
                'amenities'
            ];

            if (allowedCategories.includes(category)) {
                // Create the filter object dynamically.
                // We use a case-insensitive regex for more flexible matching (e.g., 'lekki' matches 'Lekki').
                const filter = {
                    [category]: { $regex: value, $options: 'i' }
                };

                // Apply the filter to the Mongoose query.
                this.query = this.query.find(filter);
            }
        }
        return this;
    }

    /**
     * Applies advanced filtering for fields like price, bedrooms, etc.
     * Example: /api/v1/properties?price[gte]=100000&details.bedrooms[gte]=3
     */


    filter() {
        // 1. Create a shallow copy of the query string
        const queryCopy = {...this.queryString };

        // 2. Remove fields that are handled by other methods
        const excludedFields = ['page', 'sort', 'limit', 'keywords', 'category', 'value'];
        excludedFields.forEach(el => delete queryCopy[el]);

        // 3. Manually build the correct MongoDB query object
        const mongoQuery = {};

        for (const key in queryCopy) {
            let value = queryCopy[key];
            console.log('key value:', value);

            // This handles nested objects like `price[amount][gte]=100000`
            // which Express parses into `{ price: { amount: { gte: '100000' } } }`
            // if (typeof value === 'object' && value !== null && !Array.isArray(value))
            if (key === 'price[amount][lte]') {
                mongoQuery['price.amount'] = {
                    ['$lte']: value
                };
            } else if (key === 'price[amount][gte]') {
                mongoQuery['price.amount'] = {
                    ['$gte']: value
                };
            } else {
                // This handles simple key-value pairs like `propertyType=House`
                mongoQuery[key] = value;
            }
        }

        console.log("Backend filter query (Corrected):", mongoQuery);

        // 4. Apply the correctly structured filter to the Mongoose query
        this.query = this.query.find(mongoQuery);
        return this;
    }

    /**
     * Sorts the results based on the 'sort' query parameter.
     * Example: /api/v1/properties?sort=-price,createdAt
     */
    sort() {
        if (this.queryString.sort) {
            // Convert comma-separated string to space-separated for Mongoose
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        } else {
            // Default sort by creation date if no sort is specified
            this.query = this.query.sort('-createdAt');
        }
        return this;
    }

    /**
     * Limits the fields returned in the final result set.
     * Example: /api/v1/properties?fields=title,price,location
     */
    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(',').join(' ');
            this.query = this.query.select(fields);
        } else {
            // Exclude the '__v' field by default
            this.query = this.query.select('-__v');
        }
        return this;
    }

    /**
     * Paginates the results.
     * Example: /api/v1/properties?page=2&limit=10
     */
    paginate() {
        const page = parseInt(this.queryString.page, 10) || 1;
        const limit = parseInt(this.queryString.limit, 10) || 10;
        const skip = (page - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
}

export default APIFeatures;