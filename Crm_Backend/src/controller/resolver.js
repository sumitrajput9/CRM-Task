const Lead = require('../model/lead');
const emailQueue = require('../queue/emailQueue');

const resolver = {
  Query: {
    leads: () => Lead.find(),
  },
  Mutation: {
    addLead: async (_, { name, email, status }) => {
      const lead = new Lead({ name, email, status });
      await lead.save();
      emailQueue.add({ type: 'newLead', lead });
      return lead;
    },
    changeLeadStatus: async (_, { id, status }) => {
      const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });
      emailQueue.add({ type: 'statusChange', lead });
      return lead;
    }
  }
};

module.exports = resolver;
