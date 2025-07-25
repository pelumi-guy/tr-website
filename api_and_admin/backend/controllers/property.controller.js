import mongoose from "mongoose";
import Property from "../models/property.js";
import Admin from "../models/admin.js";
import Agency from "../models/agency.js";
import APIFeatures from "../utils/apiFeatures.js";

import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

const adminLegacyGetAllProperties = async(req, res) => {
    const { _start, _order, _end, _sort, title_like = "", propertyType = "" } = req.query;
    const query = {};

    if (propertyType !== "") {
        query.propertyType = propertyType;
    }
    if (title_like) {
        query.title = { $regex: title_like, $options: "i" };
    }

    try {
        const count = await Property.countDocuments({ query });
        const properties = await Property
            .find(query)
            .limit(_end)
            .skip(_start)
            .sort({
                [_sort]: _order
            })

        res.header('X-Total-Count', count);
        res.header('Access-Control-Expose-Headers', 'X-Total-Count');

        res.status(200).json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPropertyDetails = async(req, res) => {
    const { id } = req.params;
    console.log("id:", id);
    const propertyExists = await Property.findById(id).populate('creator').populate('agency');

    if (propertyExists) {
        res.status(200).json({
            success: true,
            data: propertyExists
        })
    } else {
        res.status(404).json({ message: 'Property not found' });
    }
}

const createProperty = async(req, res) => {
    try {
        const { title, propertyType, location, photo, price, description, email } = req.body;

        const sessions = await mongoose.startSession();
        sessions.startTransaction();

        var testAdmin = "seed.admin@example.com";
        var testAgency = "seed-agency@example.com";

        const admin = await Admin.findOne({ email: testAdmin }).session(sessions);
        if (!admin) throw new Error("Admin not found");

        const agency = await Agency.findOne({ email: testAgency }).session(sessions);
        if (!agency) throw new Error("Agency not found");

        // const photoUrl = await cloudinary.uploader.upload(photo);
        const photoUrl = "https://res.cloudinary.com/do5lofza7/image/upload/v1751570976/Transcendent_Realty/Sample_Images/PropertyImagePlaceholder_ousfbr.png";

        const newProperty = await Property.create({
            title,
            propertyType,
            'location.street': location.street,
            'price.amount': price.amount,
            description,
            photo: photoUrl.url,
            creator: admin._id,
            agency: agency._id

        });

        admin.allProperties.push(newProperty._id);
        await admin.save({ session: sessions });

        await sessions.commitTransaction();

        res.status(200).json({ message: 'Property Created successfully' });

    } catch (error) {
        console.log("error:", error.message);
        res.status(500).json({ message: error.message });
    }
}

const updateProperty = async(req, res) => {
    try {
        const { id } = req.params;
        const { title, price, description, location, propertyType, photo } = req.body;

        const photoUrl = await cloudinary.uploader.upload(photo);

        await Property.findByIdAndUpdate({ _id: id }, { title, price, description, location, propertyType, photo: photoUrl.url || photo });

        res.status(200).json({ message: 'Property updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProperty = async(req, res) => {
    try {
        const { id } = req.params;
        const propertyToDeleted = await Property.findById({ _id: id }).populate('creator');

        if (!propertyToDeleted) throw new Error("Property not found");

        const sessions = await mongoose.startSession();
        sessions.startTransaction();

        propertyToDeleted.remove({ session: sessions });
        propertyToDeleted.creator.allProperties.pull(propertyToDeleted);

        await propertyToDeleted.creator.save({ session: sessions });
        await sessions.commitTransaction();

        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// My Methods
const getProperties = async(req, res, next) => {
    // --- AI-Powered Search Integration ---
    const searchString = req.query.search; // e.g., "5 bedroom duplex with a pool in lekki"

    let keywordsForQuery = { keywords: searchString };
    console.log('searchString:', searchString);

    // if (searchString) {
    //     // In a real app, this would be an async call to your LLM service
    //     const extractedKeywords = await getKeywordsFromLLM(searchString); // e.g., ['5 bedroom', 'duplex', 'pool', 'lekki']

    //     // Prepare the keywords for the APIFeatures class
    //     if (extractedKeywords && extractedKeywords.length > 0) {
    //         keywordsForQuery = { keywords: extractedKeywords.join(',') };
    //     }
    // }

    // --- Execute the API Features ---
    const features = new APIFeatures(Property.find(), {...req.query, ...keywordsForQuery })
        .search() // Handles multi-keyword search
        .filter() // Handles price[gte], details.bedrooms=5, etc.
        .sort() // Handles sort=-price,createdAt
        .limitFields() // Handles fields=title,price
        .paginate(); // Handles page=2&limit=10

    // Execute the final query
    const properties = await features.query;

    // TODO: You might want to get a total count for pagination on the frontend
    // const total = await Property.countDocuments(features.query.getFilter());

    res.status(200).json({
        status: 'success',
        results: properties.length,
        data: {
            properties,
        },
    });
};


/**
 * @desc    Get all properties with advanced filtering, sorting, pagination, and searching.
 * @route   GET /api/v1/properties
 * @access  Public
 */
const getAllProperties = async(req, res, next) => {
    // 1. --- COUNT TOTAL DOCUMENTS FOR PAGINATION ---
    // To provide the frontend with total pages, we first need to count the documents
    // that match the initial filters (search and filter), *before* pagination is applied.

    // Create a new APIFeatures instance just for counting
    const countingFeatures = new APIFeatures(Property.find(), req.query)
        .search()
        .filter();

    // Execute the count query. `getFilter()` is a Mongoose Query method that
    // returns the filter object used, which we pass to countDocuments.
    const totalProperties = await Property.countDocuments(countingFeatures.query.getFilter());


    // 2. --- GET THE PAGINATED DATA ---
    // Now, build the full query to get the actual documents, including sorting and pagination.
    const features = new APIFeatures(Property.find(), req.query)
        .search() // Handles multi-keyword search (e.g., ?keywords=lekki,pool)
        .filter() // Handles price[gte]=100000, details.bedrooms=3, etc.
        .sort() // Handles sort=-price.amount,createdAt
        .limitFields() // Handles fields=title,price to reduce payload size
        .paginate(); // Handles page=2&limit=12

    // Execute the final query to get the documents for the current page
    const properties = await features.query;

    // 3. --- SEND THE RESPONSE ---
    res.status(200).json({
        status: 'success',
        totalResults: totalProperties, // Total number of documents matching the query
        results: properties.length, // Number of documents on the current page
        data: {
            properties,
        },
    });
};

/**
 * @desc    Get total count of properties.
 * @route   GET /api/v1/properties/count
 * @access  Public
 */
const getPropertiesCount = async(req, res, next) => {
    const totalPropertiesCount = await Property.countDocuments({});

    res.status(200).json({
        status: 'success',
        data: {
            count: totalPropertiesCount
        }
    });
};

export {
    adminLegacyGetAllProperties,
    getPropertyDetails as getAllPropertyDetails,
    createProperty,
    updateProperty,
    deleteProperty,
    getProperties,
    getAllProperties,
    getPropertiesCount
};