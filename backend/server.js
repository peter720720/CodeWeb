import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

// =========================================================================
// 🔑 SERVER CONFIGURATION (Using workspace .env values with safe defaults)
// =========================================================================
const PORT = Number(process.env.PORT) || 3500;
const JWT_SECRET = process.env.JWT_SECRET || '7d9a7493be32f7200aad8ddb829719d09c2dd2e43beb95ba8a2d98ba71afc082';
const MONGO_URL = process.env.MONGO_URL || 'mongodb+srv://oyinloyepeter273_db_user:MRWRi3C4xA5wzHaJ@cluster0.kp6khjh.mongodb.net/codeweb_db?retryWrites=true&w=majority';

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_2BtxTDqP_KvzFAyUW75ESVr3qngB8YFne';
const EMAIL_FROM_NAME = process.env.EMAIL_FROM_NAME || 'CodeWeb Academy';

const NODEMAILER_USERNAME = process.env.NODEMAILER_USERNAME || 'oyinloyepeter273@gmail.com';
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD || 'iktg agtu kpxd wzoh';

const app = express();

// Initialize Resend Primary Email Engine
const resend = new Resend(RESEND_API_KEY);

// Configure Nodemailer Gmail Transport (Secondary Fallback Engine)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: NODEMAILER_USERNAME,
    pass: NODEMAILER_PASSWORD
  }
});

// Middleware Configuration
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// ==========================================
// 🍃 MONGOOSE SCHEMAS & MODELS
// ==========================================

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'admin'], default: 'student' },
  selectedCourse: { type: String, default: 'none' }, 
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Static CodeWeb Course Catalog
const COURSES = [
  { id: 'frontend', title: 'Frontend Development' },
  { id: 'backend', title: 'Backend Development' },
  { id: 'fullstack', title: 'Full-Stack Development' },
  { id: 'cybersecurity', title: 'Cybersecurity' },
  { id: 'data-analysis', title: 'Data Analysis' },
  { id: 'graphics-design', title: 'Graphics Design' },
  { id: 'production-design', title: 'Production Design' },
  { id: 'product-management', title: 'Product Management' }
];

// ==========================================
// 🚀 DATABASE CONNECTION & ADMIN SEEDING
// ==========================================
const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      maxPoolSize: 10
    });

    console.log('🍃 Connected to MongoDB Atlas successfully.');
    await seedAdminUser();
  } catch (err) {
    console.error('❌ Database connection failure:', err.message);
    console.log('⏳ Retrying MongoDB connection in 5 seconds...');
    setTimeout(connectToDatabase, 5000);
  }
};

connectToDatabase();

// Automated Seeding Routine
async function seedAdminUser() {
  try {
    const adminEmail = "oyinloyepeter273@gmail.com";
    const adminExists = await User.findOne({ email: adminEmail });
    
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('CodeWebAdminSecret2026!', salt);
      
      await User.create({
        fullName: "Peter Akorede (Admin)",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
        selectedCourse: "all"
      });
      
      console.log('👑 Admin user successfully seeded into database!');
    } else {
      console.log('ℹ️ Admin account already configured.');
    }
  } catch (error) {
    console.error('❌ Admin seeding failed:', error);
  }
}

// ==========================================
// 🛣️ API ENDPOINTS
// ==========================================

// 1. Fetch All Available Courses
app.get('/api/courses', (req, res) => {
  res.status(200).json(COURSES);
});

// 2. Student Enrollment/Registration with Smart Welcome Emails
app.post('/api/auth/register', async (req, res) => {
  try {
    const { fullName, email, password, selectedCourse } = req.body;

    if (!fullName || !email || !password || !selectedCourse) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'This email is already registered.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      role: 'student',
      selectedCourse
    });

    const courseObj = COURSES.find(c => c.id === selectedCourse);
    const courseTitle = courseObj ? courseObj.title : selectedCourse;

    const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #2563eb; text-align: center;">Welcome to CodeWeb Academy! 🎉</h2>
        <p>Hello <strong>${fullName}</strong>,</p>
        <p>Your enrollment in the <strong>${courseTitle}</strong> program was successful!</p>
        <p>We are thrilled to accompany you on your pathway toward software building mastery.</p>
        <br/>
        <p style="border-top: 1px solid #eee; padding-top: 15px; font-size: 12px; color: #777;">
          Best Regards,<br/>
          <strong>CodeWeb Academy Team</strong>
        </p>
      </div>
    `;

    let emailSent = false;

    // Strategy A: Dispatched via Primary Engine (Resend)
    if (RESEND_API_KEY && RESEND_API_KEY !== 'no_key') {
      try {
        await resend.emails.send({
          from: `${EMAIL_FROM_NAME} <onboarding@resend.dev>`,
          to: email,
          subject: 'Welcome to CodeWeb Academy! 🎉',
          html: emailHTML
        });
        console.log(`📧 Resend engine dispatched welcome email to: ${email}`);
        emailSent = true;
      } catch (err) {
        console.warn('⚠️ Resend primary email engine skipped or failed, trying backup engine...');
      }
    }

    // Strategy B: Dispatched via Fallback Engine (Nodemailer Gmail SMTP)
    if (!emailSent && NODEMAILER_USERNAME && NODEMAILER_PASSWORD) {
      try {
        await transporter.sendMail({
          from: `"${EMAIL_FROM_NAME}" <${NODEMAILER_USERNAME}>`,
          to: email,
          subject: 'Welcome to CodeWeb Academy! 🎉',
          html: emailHTML
        });
        console.log(`📧 Nodemailer backup engine dispatched welcome email to: ${email}`);
      } catch (error) {
        console.error('❌ Both registration email delivery systems failed:', error.message);
      }
    }

    res.status(201).json({ message: 'Enrollment successful! You can now sign in.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server registration error.' });
  }
});

// 3. User & Admin Login Authentication
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Sign-in successful!',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        selectedCourse: user.selectedCourse
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server login error.' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 CodeWeb Backend running on: http://localhost:${PORT}`);
});
