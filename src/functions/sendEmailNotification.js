
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Function to send notification when a new contact form is submitted
exports.sendContactFormNotification = functions.firestore
  .document('contactSubmissions/{submissionId}')
  .onCreate(async (snapshot) => {
    const submission = snapshot.data();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'victoria@inspire-live.com',
      subject: 'New Contact Form Submission',
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${submission.name}</p>
        <p><strong>Email:</strong> ${submission.email}</p>
        <p><strong>Company:</strong> ${submission.company || 'Not provided'}</p>
        <p><strong>Message:</strong> ${submission.message}</p>
        <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Contact form notification email sent successfully');
      return null;
    } catch (error) {
      console.error('Error sending contact form notification email:', error);
      return null;
    }
  });

// Function to send notification when a new newsletter subscription is created
exports.sendNewsletterSubscriptionNotification = functions.firestore
  .document('newsletterSubscriptions/{subscriptionId}')
  .onCreate(async (snapshot) => {
    const subscription = snapshot.data();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'victoria@inspire-live.com',
      subject: 'New Newsletter Subscription',
      html: `
        <h1>New Newsletter Subscription</h1>
        <p><strong>Email:</strong> ${subscription.email}</p>
        <p><strong>Subscribed at:</strong> ${new Date().toLocaleString()}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Newsletter subscription notification email sent successfully');
      return null;
    } catch (error) {
      console.error('Error sending newsletter subscription notification email:', error);
      return null;
    }
  });
