const extractLeadData = (dataArray) => {
  return dataArray.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});
};

const newLead = (lead) => {
  const leadData = extractLeadData(lead.data);
  return `
    Hi ${leadData.name},
    Welcome to our system!
  `;
};

const statusUpdate = (lead) => {
  const leadData = extractLeadData(lead.data);
  return `
    Hi ${leadData.name},
    Your data has been updated.
  `;
};

module.exports = {
  newLead,
  statusUpdate,
};
