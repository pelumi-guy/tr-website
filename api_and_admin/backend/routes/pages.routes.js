import express from 'express';

import { getHomepageData, getPropertiesCountForExplorePage } from '../controllers/pages.controller.js';
import { getPropertiesForExplore } from '../controllers/pages.controller.js';

const router = express.Router();

router.route('/homepage').get(getHomepageData);
router.route('/explore')
    .get(getPropertiesForExplore);

router.route('/explore/count')
    .get(getPropertiesCountForExplorePage);


export default router;