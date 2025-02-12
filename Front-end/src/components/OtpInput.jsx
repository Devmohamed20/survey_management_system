import { useState, useRef } from "react";

export default function OTPInput({ length = 4, onComplete }) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (index, e) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Ensure only one digit per box
    setOtp(newOtp);

    // Move to the next input field if a number is entered
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Trigger onComplete when all fields are filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete && onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Move focus to the previous input when deleting
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          ref={(el) => (inputRefs.current[index] = el)}
          maxLength={1}
          style={{
            width: "50px",
            height: "50px",
            textAlign: "center",
            fontSize: "24px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      ))}
    </div>
  );
}
