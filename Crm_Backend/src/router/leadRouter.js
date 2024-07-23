const express = require('express');
const { createLead, getLead, updateLead, deleteLead ,getLeads} = require('../controller/leadController');

const router = express.Router();

router.get('/',getLeads);
router.post('/', createLead);
router.get('/:id', getLead);
router.put('/update/:id', updateLead);
router.delete('/:id', deleteLead);

module.exports = router;
