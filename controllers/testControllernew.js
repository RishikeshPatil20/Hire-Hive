// TestController.js

import express from 'express';
const router = express.Router();

// Render the home page
router.get('/', (req, res) => {
  res.render('jobdetails', {
    title: 'Job Opportunities Platform'
  });
});

// Export the router
export default router;