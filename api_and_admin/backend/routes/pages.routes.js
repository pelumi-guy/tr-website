import express from 'express';

import { getHomepageData } from '../controllers/pages.controller.js';

const router = express.Router();

router.route('/homepage').get(getHomepageData);

export default router;