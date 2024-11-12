import crypto from 'crypto';

const generateOtp = () => {
    return crypto.randomInt(100000, 999999).toString();
};

export default generateOtp;
