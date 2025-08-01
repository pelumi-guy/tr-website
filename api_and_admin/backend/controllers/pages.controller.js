import Property from "../models/property.js";
import APIFeatures from "../utils/apiFeatures.js";


/**
 * @desc    Get properties for the homepage sections ("Properties of the Week" and "Hot Right Now")
 * @route   GET /api/v1/properties/homepage
 * @access  Public
 */
export const getHomepageData = async(req, res) => {
    try {
        // We will run two queries in parallel for maximum efficiency
        const [propertiesOfTheWeek, hotProperties] = await Promise.all([
            // --- Query 1: Properties of the Week ---
            // Fetches 3 available properties that are marked as featured,
            // sorted by the most recently updated.
            Property.find({ isFeatured: true, status: 'Available' })
            .sort({ updatedAt: -1 }) // Show the most recently updated featured properties first
            .limit(3)
            .select('title price location photos propertyType listingType details') // Only fetch data needed for cards
            .populate('agency', 'name'), // Example: populate agency name

            // --- Query 2: Hot Right Now ---
            // Fetches 3 properties based on a "hotness" score.
            Property.find({ status: { $in: ['Available', 'Under Offer'] } })
            .sort({
                status: -1, // 'Under Offer' comes before 'Available' alphabetically descending
                viewCount: -1, // Then, sort by the most views
                createdAt: -1, // As a final tie-breaker, show the newest
            })
            .limit(3)
            .select('title price location photos propertyType listingType status details') // Include status to show 'Under Offer' badge
            .populate('agency', 'name'),
        ]);

        res.status(200).json({
            success: true,
            data: {
                propertiesOfTheWeek,
                hotProperties,
            },
        });
    } catch (error) {
        console.error('Error fetching homepage sections:', error);
        res.status(500).json({ success: false, message: 'Server error while fetching homepage data' });
    }
};


/**
 * @desc    Get properties count for specific cities for the Explore page.
 * @route   GET /api/v1/properties/explore/counts
 * @access  Public
 */
export const getPropertiesCountForExplorePage = async(req, res) => {
    // 1. Define the list of cities we care about.
    const targetCities = ['ikeja', 'magodo', 'lekki', 'ajah'];

    // 2. Use MongoDB's Aggregation Framework to count documents in a single query.
    const cityCounts = await Property.aggregate([{
            // Stage 1: Match only the documents in our target cities.
            // This is a crucial first step for performance.
            $match: {
                'location.city': { $in: targetCities.map(city => new RegExp(city, 'i')) } // Case-insensitive match
            }
        },
        {
            // Stage 2: Group the matched documents by their city and count them.
            $group: {
                _id: { $toLower: '$location.city' }, // Group by the lowercase city name
                count: { $sum: 1 } // For each document in a group, add 1 to the count
            }
        }
    ]);

    // 3. Transform the aggregation result into the desired JSON format.
    // The result from the aggregation looks like:
    // [ { _id: 'lekki', count: 50 }, { _id: 'ikeja', count: 35 }, ... ]

    const counts = {};
    // Initialize all target cities with a count of 0.
    targetCities.forEach(city => {
        counts[`${city}`] = 0;
    });

    // Populate the counts with the actual data from the database.
    cityCounts.forEach(item => {
        if (targetCities.includes(item._id)) {
            counts[`${item._id}`] = item.count;
        }
    });

    res.status(200).json({
        status: 'success',
        data: counts
    });
};

/**
 * @desc    Get properties for the Explore page, filtered by a single category.
 * @route   GET /api/v1/pages/explore
 * @access  Public
 */
export const getPropertiesForExplore = async(req, res) => {
    const limit = parseInt(req.query.limit, 10) || 10;
    const page = parseInt(req.query.page, 10) || 1;

    // 1. Get the total count of documents that match the category filter for pagination.
    // We create a separate, lean query just for counting.
    const countFeatures = new APIFeatures(Property.find(), req.query)
        .filterByCategory();

    // getFilter() is a Mongoose method to get the filter object from the query.
    const totalCount = await Property.countDocuments(countFeatures.query.getFilter());

    // 2. Now, build the main query to get the actual data with sorting and pagination.
    const features = new APIFeatures(Property.find(), req.query)
        .filterByCategory() // Apply the category filter
        .sort() // Apply sorting (e.g., ?sort=-price.amount)
        .limitFields() // Limit fields (e.g., ?fields=title,price)
        .paginate(); // Apply pagination (e.g., ?page=2&limit=12)

    // Execute the final query
    const properties = await features.query;
    const { category, value } = req.query;

    res.status(200).json({
        status: 'success',
        results: properties.length,
        data: {
            properties,
            pagination: {
                total: totalCount,
                limit: limit,
                page: page,
                totalPages: Math.floor(totalCount / limit)
            },
            category,
            value
        }
    });
};