const Lead = require('../model/lead');
const { sendStatusUpdateEmail, sendNewLeadEmail } = require('./emailServices');

exports.createLead = async (req, res) => {
  const { name, email, status, account, designation, phonenumber, type } = req.body;
  const data = [
    { key: 'name', value: name },
    { key: 'email', value: email },
    { key: 'status', value: status },
    { key: 'account', value: account },
    { key: 'designation', value: designation },
    { key: 'phonenumber', value: phonenumber },
    { key: 'type', value: type }
  ];
  try {
    const newLead = new Lead({ data });
    await newLead.save();
    sendNewLeadEmail(newLead);
    res.status(201).json(newLead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json(lead);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getLeads = async (req, res) => {
    try {
      const leads = await Lead.find();
      res.status(200).json(leads);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  exports.updateLead = async (req, res) => {
    const { data } = req.body; // Ensure data is correctly destructured from req.body
  
    if (!Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }
  
    try {
      const lead = await Lead.findById(req.params.id);
      if (!lead) return res.status(404).json({ error: 'Lead not found' });
      
      // Update the lead data
      data.forEach(({ key, value }) => {
        const index = lead.data.findIndex(item => item.key === key);
        if (index !== -1) {
          lead.data[index].value = value;
        } else {
          lead.data.push({ key, value });
        }
      });
  
      await lead.save();
      await sendStatusUpdateEmail(lead);
  
      res.status(200).json(lead);
    } catch (err) { 
      res.status(500).json({ error: err.message });
    }
  };
  
  

exports.deleteLead = async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ error: 'Lead not found' });
    res.status(200).json({ message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
