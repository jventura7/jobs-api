const express = require('express')
const router = express.Router()

const jobsControllers = require('../controllers/jobs')

router.route('/').post(jobsControllers.createJob).get(jobsControllers.getAllJobs)
router.route('/:id').get(jobsControllers.getJob).patch(jobsControllers.updateJob).delete(jobsControllers.deleteJob)

module.exports = router