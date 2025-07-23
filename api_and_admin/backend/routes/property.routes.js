import express from 'express';
import {
    adminLegacyGetAllProperties,
    getAllPropertyDetails,
    createProperty,
    updateProperty,
    deleteProperty,
    getAllProperties,
    getPropertiesCount
} from '../controllers/property.controller.js';

const router = express.Router();

router.route('/')
    .get(adminLegacyGetAllProperties)
    .post(createProperty);

router.route('/all')
    .get(getAllProperties)

router.route('/count')
    .get(getPropertiesCount)

router.route('/:id')
    .get(getAllPropertyDetails)
    .patch(updateProperty)
    .delete(deleteProperty);






export default router;