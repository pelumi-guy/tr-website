import Property from "../models/property.js";


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