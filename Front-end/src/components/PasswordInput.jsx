import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Importing icons
import "../styles/passwordInput.css"

const PasswordInput = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="password-container">
            
            {/* Password Input Field */}
            <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="password-input"
            />

            {/* Eye Icon to Toggle Visibility */}
            <button
                type="button"
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
            >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    );
};

export default PasswordInput;
