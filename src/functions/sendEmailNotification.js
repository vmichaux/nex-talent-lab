
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize the Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp();
}

// Create a nodemailer transporter using SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email?.user || 'app@example.com',
    pass: functions.config().email?.password || 'password123'
  }
});

// Contact form submission notification
exports.sendContactFormNotification = functions.firestore
  .document('contactMessages/{messageId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    
    // Skip sending email notifications
    console.log('Contact form submitted, but email notification is disabled:', data);
    return null;
  });

// Newsletter subscription notification
exports.sendNewsletterSubscriptionNotification = functions.firestore
  .document('newsletterSubscriptions/{subscriptionId}')
  .onCreate((snap, context) => {
    const data = snap.data();
    
    // Skip sending email notifications
    console.log('Newsletter subscription submitted, but email notification is disabled:', data);
    return null;
  });
