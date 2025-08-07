import express from 'express';
import {
    adminLegacyGetAllProperties,
    getPropertyDetails,
    createProperty,
    updateProperty,
    deleteProperty,
    getAllProperties,
    getPropertiesCount,
    searchProperties,
    searchPropertiesWithLLM
} from '../controllers/property.controller.js';

const router = express.Router();

router.route('/')
    .get(adminLegacyGetAllProperties)
    .post(createProperty);

router.route('/all')
    .get(getAllProperties)

router.route('/count')
    .get(getPropertiesCount)

router.route('/ai-search')
    .get(searchPropertiesWithLLM)

router.route('/search')
    .get(searchProperties)

router.route('/:id')
    .get(getPropertyDetails)
    .patch(updateProperty)
    .delete(deleteProperty);






export default router;