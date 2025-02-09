import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import Teacher from '../models/Teacher.js';

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;

    // Determine user type based on the role provided
    if (role === 'admin') {
      user = await Admin.findOne({ email });
    } else if (role === 'teacher') {
      user = await Teacher.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid role specified' });
    }

    // If no user found for the specified role
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token with role-specific payload
    const token = jwt.sign(
      {
        id: user._id,
        role, 
        type: role === 'admin' ? 'adminToken' : 'teacherToken' === 'teacher', // Differentiate token type
      },
      process.env.JWT_SECRET,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    // Respond with success and the generated token
    res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email, role },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
