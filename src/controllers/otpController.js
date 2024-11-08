import pool from '../db.js';

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const otpResult = await pool.query(
            'SELECT * FROM otps WHERE user_id = $1 AND otp = $2 AND used = FALSE AND expires_at > NOW()',
            [user.id, otp]
        );

        const otpEntry = otpResult.rows[0];
        if (!otpEntry) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        await pool.query('UPDATE otps SET used = TRUE WHERE id = $1', [otpEntry.id]);
        res.status(200).json({ message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
};
