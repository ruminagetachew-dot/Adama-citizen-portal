// MUST be first — loads env vars before any other module initializes
import 'dotenv/config';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { sendPasswordResetEmail } from '../utils/emailService.js';
import { createNotification } from '../utils/workflow.js';

async function runVerification() {
  console.log('🔄 Starting Verification Check...\n');

  // Connect to DB
  await connectDB();

  try {
    // 1. Find or create citizen test account
    let user = await User.findOne({ email: 'citizen@test.com' });
    if (!user) {
      console.log('👤 Test user citizen@test.com not found. Creating one...');
      user = await User.create({
        fullName: 'Test Citizen',
        email: 'citizen@test.com',
        passwordHash: await bcrypt.hash('citizen123', 12),
        role: 'citizen',
        phoneNumber: '+251911223344',
        isActive: true,
      });
      console.log('✅ Test user created.');
    } else {
      // Ensure phoneNumber is populated for SMS testing
      if (!user.phoneNumber) {
        user.phoneNumber = '+251911223344';
        await user.save();
        console.log('✅ Updated test user phone number for SMS delivery.');
      }
    }

    console.log(`👤 Using test user: ${user.fullName} (${user.email}, Phone: ${user.phoneNumber})\n`);

    // 2. Test Password Reset Token Generation & Email Dispatch
    console.log('--- TEST 1: Password Reset Token ---');
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    console.log('✅ Reset token generated and saved in DB.');

    console.log('📬 Dispatching mock password reset email...');
    await sendPasswordResetEmail(user, token);
    console.log('✅ Reset email test complete.\n');

    // 3. Test In-App Notification Hook (triggers email + SMS dispatch)
    console.log('--- TEST 2: In-App Notification Workflow with Email/SMS ---');
    console.log('🔔 Creating a workflow notification...');
    const notification = await createNotification({
      userId: user._id,
      title: 'Status Update: In Progress',
      message: 'Your road maintenance complaint (Ref: COMP-2026-0004) has been assigned and is now in progress.',
      relatedEntityType: 'complaint',
      relatedEntityId: new mongoose.Types.ObjectId(),
    });
    console.log(`✅ In-app notification created in DB (ID: ${notification._id}).`);

    // Wait a brief moment for the async tasks to run and print their logs
    console.log('⏳ Waiting 2 seconds for background Email/SMS dispatch triggers...');
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log('✅ Verification finished.');
  } catch (err) {
    console.error('❌ Verification failed with error:', err);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB.');
  }
}

runVerification();
