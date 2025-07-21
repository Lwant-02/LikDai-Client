import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Shield, ArrowLeft, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/Spinner";
import { useVerifyOtp, useResendOtp } from "@/hooks/useAuth";

export const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { verifyOtp, isVerifyingOtp } = useVerifyOtp();
  const { resendOtp, isResendingOtp } = useResendOtp();

  // Redirect if no email parameter
  useEffect(() => {
    if (!email) {
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single character

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join("");

    if (otpString.length !== 6) {
      toast("ⓘ Notice", {
        description: <p className="text-white">Please enter all 6 digits!</p>,
      });
      return;
    }

    await verifyOtp(
      { email: email!, otp: otpString },
      {
        onSuccess: () => {
          navigate(`/change-password?email=${encodeURIComponent(email!)}`, {
            replace: true,
          });

          toast("✅️ Success", {
            description: (
              <p className="text-white">OTP verified successfully!</p>
            ),
            style: {
              backgroundColor: "#1f7d53",
            },
          });
        },
        onError: (error: any) => {
          toast("❌️ Error", {
            description: (
              <p className="text-white">
                {error.response.data.message ||
                  "Invalid OTP. Please try again."}
              </p>
            ),
          });
        },
      }
    );
  };

  const handleResendOtp = async () => {
    await resendOtp(email!, {
      onSuccess: () => {
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();

        toast("✅️ Success", {
          description: (
            <p className="text-white">New OTP sent to your email!</p>
          ),
          style: {
            backgroundColor: "#1f7d53",
          },
        });
      },
      onError: (error: any) => {
        toast("❌️ Error", {
          description: (
            <p className="text-white">
              {error.response?.data?.message ||
                "Failed to resend OTP. Please try again."}
            </p>
          ),
        });
      },
    });
  };

  if (!email) {
    return null; // Will redirect in useEffect
  }

  return (
    <>
      <Helmet>
        <title>Verify OTP | LikDai - Pro</title>
        <meta
          name="description"
          content="Verify your OTP to reset your password for LikDai - Pro."
        />
      </Helmet>

      <article className="flex justify-center items-center h-screen w-full flex-col gap-7 md:px-0 px-3">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center gap-2"
        >
          <img
            src="/svg/Logo.svg"
            alt="Logo"
            className="size-12 object-cover"
          />
          <p className="text-2xl font-bold">LikDai - Pro</p>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col justify-start items-center gap-6 w-full max-w-md"
        >
          {/* Header */}
          <div className="flex justify-center items-center gap-2 text-center">
            <Shield className="size-7 text-yellow" />
            <p className="text-2xl font-bold">Verify OTP</p>
          </div>

          {/* Description */}
          <div className="text-center space-y-2">
            <p className="text-base text-muted-foreground">
              We've sent a 6-digit verification code to
            </p>
            <p className="text-base font-semibold text-yellow">{email}</p>
            <p className="text-sm text-muted-foreground">
              Enter the code below to reset your password
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex gap-3 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-input rounded-lg bg-background focus:border-yellow focus:ring-2 focus:ring-yellow/20 outline-none transition-all"
              />
            ))}
          </div>

          {/* Verify Button */}
          <Button
            onClick={handleVerifyOtp}
            disabled={isVerifyingOtp || otp.join("").length !== 6}
            className="mt-4 h-11 rounded-lg text-primary bg-yellow hover:bg-yellow/90 w-full max-w-sm cursor-pointer flex justify-center items-center text-base font-semibold"
          >
            {isVerifyingOtp ? (
              <Spinner size={6} color="primary" />
            ) : (
              <>
                <Shield className="size-5 mr-2" />
                Verify OTP
              </>
            )}
          </Button>

          {/* Resend OTP */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?
            </p>
            <Button
              variant="ghost"
              onClick={handleResendOtp}
              disabled={isResendingOtp}
              className="text-yellow  hover:bg-yellow/10 cursor-pointer border border-yellow/50"
            >
              {isResendingOtp ? (
                <Spinner size={5} color="primary" />
              ) : (
                <>
                  <RotateCcw className="size-4 mr-2" />
                  Resend OTP
                </>
              )}
            </Button>
          </div>

          {/* Back to Login */}
          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
            className="text-muted-foreground hover:text-primary/70 cursor-pointer"
          >
            <ArrowLeft className="size-4 mr-2" />
            Back to Login
          </Button>
        </motion.div>
      </article>
    </>
  );
};
