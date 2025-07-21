import express from 'express';

import { createAdmin, getAllAdmins, getAdminInfoById } from '../controllers/admin.controller.js';

const router = express.Router();

router.route('/')
    .get(getAllAdmins)
    .post(createAdmin);
router.route('/:id').get(getAdminInfoById);

export default router;