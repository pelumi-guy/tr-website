import mongoose from "mongoose";
import Property from "../models/property.js";
import Admin from "../models/admin.js";
import Agency from "../models/agency.js";

import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_KEY_SECRET,
});

const getAllProperties = async(req, res) => {
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

const getAllPropertyDetails = async(req, res) => {
    const { id } = req.params;
    console.log("id:", id);
    const propertyExists = await Property.findById(id).populate('creator');
    // const propertyExists = await Property.findOne({ id: mongoose.Types.ObjectId(id.trim()) });

    if (propertyExists) {
        res.status(200).json(propertyExists)
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

export {
    getAllProperties,
    getAllPropertyDetails,
    createProperty,
    updateProperty,
    deleteProperty
};