import { useContext, useRef } from "react";
import { useNavigate } from "react-router";
import { KeyRound, Mail, User } from "lucide-react";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import useFormValidation from "../customHooks/useFormValidation";
import authService from "../services/auth";
import { useToast } from "../context/ToastContext";
import { AuthContext } from "../context/AuthContext";

const validationRules = {
  name: {
    required: false,
    pattern: /^[a-zA-Z][a-zA-Z0-9'’\- ]*$/,
    requiredMessage: "",
    patternMessage: "Please enter a valid name",
    maxLength: 120,
    maxLengthMessage: "Please enter a name with 120 characters or fewer.",
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    requiredMessage: "Email is required",
    patternMessage: "Please enter a valid email address",
  },
  password: {
    required: true,
    // pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).*$/,
    requiredMessage: "Password is required",
    patternMessage: "Please enter a secure password",
    minLength: 8,
    minLengthMessage: "Password must be at least 8 characters long",
  },
};

const SignupLogin = ({ mode }) => {
  const navigate = useNavigate();
  const isSignup = mode === "signup";
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const { nameValidationRule, ...restValidationRules } = validationRules;
  const { errors, validateForm, clearError } = useFormValidation(
    isSignup ? validationRules : restValidationRules
  );

  const { showToast } = useToast();

  const { setLoading, setUserData, setIsLoggedIn } = useContext(AuthContext);

  const handleSignUp = async () => {
    const formData = new FormData();
    formData.append(nameRef.current.name, nameRef.current.value);
    formData.append(emailRef.current.name, emailRef.current.value);
    formData.append(passwordRef.current.name, passwordRef.current.value);

    if (!validateForm(formData)) {
      return;
    }

    //API call
    try {
      const userAccountCreate = await authService.createAccount({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value,
      });
      // nameRef.current = null;
      // emailRef.current = null;
      // passwordRef.current = null;
      //Show toast
      showToast("Account created successfully", "success");

      setIsLoggedIn(true);
      setUserData(userAccountCreate);

      //Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Error creating account");
      showToast("Account created successfully", "error");
      setIsLoggedIn(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async () => {
    const formData = new FormData();
    formData.append(emailRef.current.name, emailRef.current.value);
    formData.append(passwordRef.current.name, passwordRef.current.value);

    if (!validateForm(formData)) {
      return;
    }

    //API call
    setLoading(true);
    try {
      const userLogin = await authService.login({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
      // nameRef.current = null;
      // emailRef.current = null;
      // passwordRef.current = null;
      //Show toast
      showToast("Logged in successfully", "success");

      setIsLoggedIn(true);
      setUserData(userLogin);

      //Take to home page
      navigate("/");
    } catch (error) {
      console.error("Error while logging");
      showToast("Log in failed", "error");
      setIsLoggedIn(false);
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out  max-w-7xl mx-auto ${
        isSignup
          ? "grid md:grid-cols-[45%_55%] bg-(--dark--card-bg)"
          : "flex justify-center h-screen bg-(--dark)"
      }`}
    >
      {isSignup && (
        <div className="bg-(--lime) rounded-tr-[8rem] rounded-br-[8rem] flex flex-col items-center justify-center text-center px-5">
          <h2 className="text-4xl font-bold mb-6 text-(--dark--grey)">
            Welcome Back!
          </h2>
          <p className="text-lg mb-6 max-w-11/12 text-(--dark--grey)">
            Login to read all the blogs, subscribe to newsletter, and many more
            features.
          </p>
          <Button
            className="border-(--dark--card-hover) border-2 bg-(--lime) text-2xl text-(--dark--grey) hover:text-(--white-text-color)"
            onClick={() => navigate("/auth/login")}
          >
            SIGN IN
          </Button>
        </div>
      )}
      <div
        className={`py-18 flex flex-col items-center justify-center transition-all duration-500 ${
          isSignup ? "" : "max-w-xl bg-(--dark--card-bg) px-16"
        }`}
      >
        <h2 className="text-4xl font-bold mb-6 text-(--white-text-color)">
          {isSignup ? "Create Account" : "Login to your account"}
        </h2>
        <div className="w-full max-w-2xl flex flex-col items-center space-y-6">
          {isSignup && (
            <FormInput
              name="name"
              type="name"
              placeholder="Name"
              icon={User}
              ref={nameRef}
              error={errors.name}
              onFocus={() => clearError("name")}
            />
          )}
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            icon={Mail}
            ref={emailRef}
            error={errors.email}
            onFocus={() => clearError("email")}
          />
          <FormInput
            name="password"
            type="password"
            placeholder="Password"
            icon={KeyRound}
            ref={passwordRef}
            error={errors.password}
            onFocus={() => clearError("password")}
          />
          <Button
            className="border-(--dark--card-hover) text-2xl text-(--white-text-color)"
            onClick={isSignup ? handleSignUp : handleSignIn}
          >
            {isSignup ? "SIGN UP" : "SIGN IN"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignupLogin;
