// Generates 6 digits otp
const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

module.exports = { generateOtp };