import express from 'express';
import otpRoutes from './routes/otpRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express()
const port = 3000;

app.use(express.json());

app.listen(port)

app.get('/', (req, res) => {
    res.send('Working');
});

app.use('/api/auth', authRoutes);
app.use('/api/otp', otpRoutes);

console.log('server on port', port)