import twilio from 'twilio';

const hasTwilioConfig = !!(
  process.env.TWILIO_ACCOUNT_SID &&
  process.env.TWILIO_AUTH_TOKEN &&
  process.env.TWILIO_FROM
);

const client = hasTwilioConfig
  ? twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
  : null;

/**
 * Sends an SMS notification to the user's registered phone number.
 * @param {Object} user The user object containing phoneNumber and fullName
 * @param {string} message The SMS body content
 */
export async function sendNotificationSms(user, message) {
  if (!user.phoneNumber) {
    // No phone number, skip
    return;
  }

  const to = user.phoneNumber;
  const from = process.env.TWILIO_FROM;

  if (client) {
    try {
      await client.messages.create({
        body: message,
        from,
        to,
      });
    } catch (err) {
      console.error(`❌ Failed to send SMS to ${to} via Twilio:`, err.message);
    }
  } else {
    console.log('\n================================================================================');
    console.log('📱 [MOCK SMS DISPATCH]');
    console.log(`To: ${user.fullName} <${to}>`);
    console.log(`Body: ${message}`);
    console.log('================================================================================\n');
  }
}
