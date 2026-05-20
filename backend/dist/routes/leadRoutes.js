"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leadController_1 = require("../controllers/leadController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const router = (0, express_1.Router)();
// Protect all lead routes
router.use(authMiddleware_1.protect);
// Dynamic statistics route (placed before parameterized /:id route to prevent collision)
router.get('/stats', leadController_1.getLeadStats);
router
    .route('/')
    .get(leadController_1.getLeads)
    .post(validationMiddleware_1.validateLead, leadController_1.createLead);
router.get('/export', leadController_1.exportLeads);
router
    .route('/:id')
    .get(leadController_1.getLead)
    .patch(validationMiddleware_1.validateLead, leadController_1.updateLead)
    .delete(leadController_1.deleteLead);
exports.default = router;
