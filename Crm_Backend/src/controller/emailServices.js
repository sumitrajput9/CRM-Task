const nodemailer = require('nodemailer');
const emailTemplates = require('../emails/emailTemplates');
const { EMAIL_USER, EMAIL_PASS } = process.env;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user:"rajputsumit6859@gmail.com",
    pass:"nqnnsqxnhvnidvld",
  },
});

const sendNewLeadEmail = async (lead) => {
    const email = lead.data.find(field => field.key === 'email').value;
  const mailOptions = {
    from: "rajputsumit6859@gmail.com",
    to:email,
    subject: 'Welcome!',
    text: emailTemplates.newLead(lead)
  };

  await transporter.sendMail(mailOptions);
};

const sendStatusUpdateEmail = async (lead) => {
    const email = lead.data.find(field => field.key === 'email').value;
  const mailOptions = {
    from: "rajputsumit6859@gmail.com",
    to:email,
    subject: 'Data Update',
    text: emailTemplates.statusUpdate(lead),
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendNewLeadEmail,
  sendStatusUpdateEmail,
};
