const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Health
 *   description: Health check API
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health endpoint
 *     description: Check status
 *     tags: [Health]
 *     responses:
 *       '200':
 *         description: Health check passed.
 */
router.get('/health', (req, res) => {
    res.status(200).send('Health check passed');
});

module.exports = router;