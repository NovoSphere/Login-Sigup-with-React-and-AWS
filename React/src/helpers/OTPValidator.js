export function otpValidator(otp) {
    if (!otp) return "otp can't be empty."
    if (otp.length < 6) return 'OTP is 6 digits'
    return ''
  }

  