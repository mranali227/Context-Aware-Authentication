const deviceTrustScores = {
    laptop: 90,
    mobile: 80,
    tablet: 70,
    desktop: 85
};

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const location = document.getElementById('location').value.toLowerCase();
    const device = document.getElementById('device').value.toLowerCase();

    const trustedLocations = ['home', 'office'];
    let riskScore = 0;

    // Risk scoring for location
    if (!trustedLocations.includes(location)) riskScore += 50;

    // Risk scoring for device trust
    const deviceScore = deviceTrustScores[device] || 50; // Default trust score
    riskScore += (100 - deviceScore);

    // Decision-making
    if (riskScore < 50) {
        document.getElementById('message').innerText = 'Access Granted: Low risk detected!';
    } else if (riskScore < 80) {
        triggerOTP();
    } else {
        document.getElementById('message').innerText = 'Access Denied: High risk detected!';
    }
});

function triggerOTP() {
    document.getElementById('otpLabel').style.display = 'block';
    document.getElementById('otp').style.display = 'block';
}

document.getElementById('otp').addEventListener('input', function () {
    const otp = document.getElementById('otp').value;
    const message = document.getElementById('message');
    const correctOTP = '123456';

    if (otp === correctOTP) {
        message.innerText = 'Access Granted: OTP Verified!';
    } else if (otp.length >= 6) {
        message.innerText = 'Invalid OTP. Please try again.';
    }
});
