import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyOtpMutation, useResendOtpMutation } from "@/redux/services/authApi";

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Read email from router state. If they navigated here directly (bypassing register), boot them back.
  const email = location.state?.email || "";
  
  const [otpValue, setOtpValue] = useState("");
  const [timer, setTimer] = useState(60);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [verifyOtp, { isLoading: isVerifying }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  // Security Redirect: Block direct URL access
  useEffect(() => {
    if (!email) {
      navigate("/auth/register", { replace: true });
    }
  }, [email, navigate]);

  // Cooldown Timer Logic
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>; // 👈 FIX IS HERE
    
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    
    return () => clearInterval(interval);
  }, [timer]);

  const handleVerify = async () => {
    if (otpValue.length !== 6) return;
    setErrorMsg(null);

    try {
      const res = await verifyOtp({ email, otp: otpValue }).unwrap();
      if (res.success) {
        setSuccessMsg("Account verified successfully! Redirecting to login...");
        // Delay slightly so user can read the success message
        setTimeout(() => navigate("/auth/login", { replace: true }), 2000);
      }
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Invalid or expired OTP");
      setOtpValue(""); // Clear input on failure
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    setErrorMsg(null);
    setSuccessMsg(null);
    setOtpValue("");

    try {
      await resendOtp({ email, type: "REGISTER" }).unwrap();
      setTimer(60); // Reset cooldown
      setSuccessMsg("A fresh OTP has been sent to your email.");
    } catch (err: any) {
      setErrorMsg(err?.data?.message || "Failed to resend OTP");
    }
  };

  // Prevent rendering if being redirected
  if (!email) return null; 

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl border shadow-sm text-center flex flex-col items-center">
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p className="text-sm text-gray-500 mt-2">
          We've sent a 6-digit verification code to <br />
          <span className="font-semibold text-gray-900">{email}</span>
        </p>

        {errorMsg && (
          <div className="w-full mt-4 p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="w-full mt-4 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-md">
            {successMsg}
          </div>
        )}

        <div className="my-8">
          <InputOTP
            maxLength={6}
            value={otpValue}
            onChange={(val) => setOtpValue(val)}
            disabled={isVerifying || !!successMsg}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <Button
          onClick={handleVerify}
          className="w-full"
          disabled={otpValue.length !== 6 || isVerifying || !!successMsg}
        >
          {isVerifying ? "Verifying..." : "Verify Code"}
        </Button>

        <div className="mt-6 text-sm text-gray-500">
          Didn't receive the code?{" "}
          {timer > 0 ? (
            <span className="font-medium">Resend in {timer}s</span>
          ) : (
            <button
              onClick={handleResend}
              disabled={isResending}
              className="text-blue-600 font-medium hover:underline disabled:opacity-50"
            >
              {isResending ? "Sending..." : "Resend Code"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Otp;