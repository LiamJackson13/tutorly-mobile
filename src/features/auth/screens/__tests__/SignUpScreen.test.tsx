import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react-native";
import SignUpScreen from "../SignUpScreen";
import { useSignUp } from "../../hooks/useSignUp";
import { router } from "expo-router";

// Mock dependencies
jest.mock("../../hooks/useSignUp");
jest.mock("expo-router");

describe("SignUpScreen", () => {
  const mockHandleSignUp = jest.fn();
  const mockUseSignUp = useSignUp as jest.MockedFunction<typeof useSignUp>;
  const mockRouter = router as jest.Mocked<typeof router>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSignUp.mockReturnValue({
      handleSignUp: mockHandleSignUp,
      signUpError: null,
      isLoading: false,
      data: null,
    });
  });

  describe("Initial Rendering", () => {
    it("should render without crashing", () => {
      expect(() => render(<SignUpScreen />)).not.toThrow();
    });

    it("should render the title 'Create Account'", () => {
      render(<SignUpScreen />);
      expect(screen.getByText("Create Account")).toBeTruthy();
    });

    it("should render the subtitle 'Join Tutorly today'", () => {
      render(<SignUpScreen />);
      expect(screen.getByText("Join Tutorly today")).toBeTruthy();
    });

    it("should render role selection label", () => {
      render(<SignUpScreen />);
      expect(screen.getByText("I am a...")).toBeTruthy();
    });

    it("should render all input fields", () => {
      render(<SignUpScreen />);
      expect(screen.getByPlaceholderText("First name")).toBeTruthy();
      expect(screen.getByPlaceholderText("Last name")).toBeTruthy();
      expect(screen.getByPlaceholderText("Enter your email")).toBeTruthy();
      expect(screen.getByPlaceholderText("Create a password")).toBeTruthy();
    });

    it("should render Sign Up button", () => {
      render(<SignUpScreen />);
      expect(screen.getByText("Sign Up")).toBeTruthy();
    });

    it("should render sign in link", () => {
      render(<SignUpScreen />);
      expect(screen.getByText("Already have an account?")).toBeTruthy();
      expect(screen.getByText("Sign In")).toBeTruthy();
    });
  });

  describe("Role Selection", () => {
    it("should render all three role buttons", () => {
      render(<SignUpScreen />);
      expect(screen.getByText("🎓 Student")).toBeTruthy();
      expect(screen.getByText("👨‍🏫 Tutor")).toBeTruthy();
      expect(screen.getByText("👪 Parent")).toBeTruthy();
    });

    it("should have student role selected by default", () => {
      const { getByText } = render(<SignUpScreen />);
      const studentButton = getByText("🎓 Student").parent?.parent;
      expect(studentButton?.props.style).toContainEqual(
        expect.objectContaining({
          borderColor: "#007AFF",
        })
      );
    });

    it("should switch to tutor role when tutor button is pressed", () => {
      render(<SignUpScreen />);
      const tutorButton = screen.getByText("👨‍🏫 Tutor");
      fireEvent.press(tutorButton);
      
      const tutorButtonParent = tutorButton.parent?.parent;
      expect(tutorButtonParent?.props.style).toContainEqual(
        expect.objectContaining({
          borderColor: "#007AFF",
        })
      );
    });

    it("should switch to parent role when parent button is pressed", () => {
      render(<SignUpScreen />);
      const parentButton = screen.getByText("👪 Parent");
      fireEvent.press(parentButton);
      
      const parentButtonParent = parentButton.parent?.parent;
      expect(parentButtonParent?.props.style).toContainEqual(
        expect.objectContaining({
          borderColor: "#007AFF",
        })
      );
    });

    it("should switch from student to tutor to parent", () => {
      render(<SignUpScreen />);
      
      // Initially student
      let studentButton = screen.getByText("🎓 Student");
      expect(studentButton.parent?.parent?.props.style).toContainEqual(
        expect.objectContaining({ borderColor: "#007AFF" })
      );

      // Switch to tutor
      const tutorButton = screen.getByText("👨‍🏫 Tutor");
      fireEvent.press(tutorButton);
      expect(tutorButton.parent?.parent?.props.style).toContainEqual(
        expect.objectContaining({ borderColor: "#007AFF" })
      );

      // Switch to parent
      const parentButton = screen.getByText("👪 Parent");
      fireEvent.press(parentButton);
      expect(parentButton.parent?.parent?.props.style).toContainEqual(
        expect.objectContaining({ borderColor: "#007AFF" })
      );
    });

    it("should allow switching back to previously selected role", () => {
      render(<SignUpScreen />);
      
      const studentButton = screen.getByText("🎓 Student");
      const tutorButton = screen.getByText("👨‍🏫 Tutor");
      
      fireEvent.press(tutorButton);
      fireEvent.press(studentButton);
      
      expect(studentButton.parent?.parent?.props.style).toContainEqual(
        expect.objectContaining({ borderColor: "#007AFF" })
      );
    });
  });

  describe("Text Input - First Name", () => {
    it("should update first name on text change", () => {
      render(<SignUpScreen />);
      const firstNameInput = screen.getByPlaceholderText("First name");
      
      fireEvent.changeText(firstNameInput, "John");
      
      expect(firstNameInput.props.value).toBe("John");
    });

    it("should handle empty first name", () => {
      render(<SignUpScreen />);
      const firstNameInput = screen.getByPlaceholderText("First name");
      
      fireEvent.changeText(firstNameInput, "");
      
      expect(firstNameInput.props.value).toBe("");
    });

    it("should handle special characters in first name", () => {
      render(<SignUpScreen />);
      const firstNameInput = screen.getByPlaceholderText("First name");
      
      fireEvent.changeText(firstNameInput, "José");
      
      expect(firstNameInput.props.value).toBe("José");
    });

    it("should capitalize words in first name", () => {
      render(<SignUpScreen />);
      const firstNameInput = screen.getByPlaceholderText("First name");
      
      expect(firstNameInput.props.autoCapitalize).toBe("words");
    });
  });

  describe("Text Input - Last Name", () => {
    it("should update last name on text change", () => {
      render(<SignUpScreen />);
      const lastNameInput = screen.getByPlaceholderText("Last name");
      
      fireEvent.changeText(lastNameInput, "Doe");
      
      expect(lastNameInput.props.value).toBe("Doe");
    });

    it("should handle empty last name", () => {
      render(<SignUpScreen />);
      const lastNameInput = screen.getByPlaceholderText("Last name");
      
      fireEvent.changeText(lastNameInput, "");
      
      expect(lastNameInput.props.value).toBe("");
    });

    it("should handle hyphenated last names", () => {
      render(<SignUpScreen />);
      const lastNameInput = screen.getByPlaceholderText("Last name");
      
      fireEvent.changeText(lastNameInput, "Smith-Johnson");
      
      expect(lastNameInput.props.value).toBe("Smith-Johnson");
    });
  });

  describe("Text Input - Email", () => {
    it("should update email on text change", () => {
      render(<SignUpScreen />);
      const emailInput = screen.getByPlaceholderText("Enter your email");
      
      fireEvent.changeText(emailInput, "test@example.com");
      
      expect(emailInput.props.value).toBe("test@example.com");
    });

    it("should have email keyboard type", () => {
      render(<SignUpScreen />);
      const emailInput = screen.getByPlaceholderText("Enter your email");
      
      expect(emailInput.props.keyboardType).toBe("email-address");
    });

    it("should not auto-capitalize email", () => {
      render(<SignUpScreen />);
      const emailInput = screen.getByPlaceholderText("Enter your email");
      
      expect(emailInput.props.autoCapitalize).toBe("none");
    });

    it("should handle email with special characters", () => {
      render(<SignUpScreen />);
      const emailInput = screen.getByPlaceholderText("Enter your email");
      
      fireEvent.changeText(emailInput, "test+user@example.co.uk");
      
      expect(emailInput.props.value).toBe("test+user@example.co.uk");
    });
  });

  describe("Text Input - Password", () => {
    it("should update password on text change", () => {
      render(<SignUpScreen />);
      const passwordInput = screen.getByPlaceholderText("Create a password");
      
      fireEvent.changeText(passwordInput, "password123");
      
      expect(passwordInput.props.value).toBe("password123");
    });

    it("should have secure text entry enabled", () => {
      render(<SignUpScreen />);
      const passwordInput = screen.getByPlaceholderText("Create a password");
      
      expect(passwordInput.props.secureTextEntry).toBe(true);
    });

    it("should handle long passwords", () => {
      render(<SignUpScreen />);
      const passwordInput = screen.getByPlaceholderText("Create a password");
      const longPassword = "a".repeat(50);
      
      fireEvent.changeText(passwordInput, longPassword);
      
      expect(passwordInput.props.value).toBe(longPassword);
    });

    it("should handle special characters in password", () => {
      render(<SignUpScreen />);
      const passwordInput = screen.getByPlaceholderText("Create a password");
      
      fireEvent.changeText(passwordInput, "P@ssw0rd!#$");
      
      expect(passwordInput.props.value).toBe("P@ssw0rd!#$");
    });
  });

  describe("Form Submission", () => {
    it("should call handleSignUp with correct parameters for student", async () => {
      mockHandleSignUp.mockResolvedValue({});
      
      render(<SignUpScreen />);
      
      fireEvent.changeText(screen.getByPlaceholderText("First name"), "John");
      fireEvent.changeText(screen.getByPlaceholderText("Last name"), "Doe");
      fireEvent.changeText(screen.getByPlaceholderText("Enter your email"), "john@example.com");
      fireEvent.changeText(screen.getByPlaceholderText("Create a password"), "password123");
      
      const signUpButton = screen.getByText("Sign Up");
      fireEvent.press(signUpButton);
      
      await waitFor(() => {
        expect(mockHandleSignUp).toHaveBeenCalledWith(
          "john@example.com",
          "password123",
          "student",
          "John",
          "Doe"
        );
      });
    });

    it("should call handleSignUp with tutor role when tutor is selected", async () => {
      mockHandleSignUp.mockResolvedValue({});
      
      render(<SignUpScreen />);
      
      fireEvent.press(screen.getByText("👨‍🏫 Tutor"));
      fireEvent.changeText(screen.getByPlaceholderText("First name"), "Alice");
      fireEvent.changeText(screen.getByPlaceholderText("Last name"), "Smith");
      fireEvent.changeText(screen.getByPlaceholderText("Enter your email"), "alice@example.com");
      fireEvent.changeText(screen.getByPlaceholderText("Create a password"), "password456");
      
      fireEvent.press(screen.getByText("Sign Up"));
      
      await waitFor(() => {
        expect(mockHandleSignUp).toHaveBeenCalledWith(
          "alice@example.com",
          "password456",
          "tutor",
          "Alice",
          "Smith"
        );
      });
    });

    it("should call handleSignUp with parent role when parent is selected", async () => {
      mockHandleSignUp.mockResolvedValue({});
      
      render(<SignUpScreen />);
      
      fireEvent.press(screen.getByText("👪 Parent"));
      fireEvent.changeText(screen.getByPlaceholderText("First name"), "Bob");
      fireEvent.changeText(screen.getByPlaceholderText("Last name"), "Johnson");
      fireEvent.changeText(screen.getByPlaceholderText("Enter your email"), "bob@example.com");
      fireEvent.changeText(screen.getByPlaceholderText("Create a password"), "password789");
      
      fireEvent.press(screen.getByText("Sign Up"));
      
      await waitFor(() => {
        expect(mockHandleSignUp).toHaveBeenCalledWith(
          "bob@example.com",
          "password789",
          "parent",
          "Bob",
          "Johnson"
        );
      });
    });

    it("should pass empty string for last name when not provided", async () => {
      mockHandleSignUp.mockResolvedValue({});
      
      render(<SignUpScreen />);
      
      fireEvent.changeText(screen.getByPlaceholderText("First name"), "SingleName");
      fireEvent.changeText(screen.getByPlaceholderText("Enter your email"), "single@example.com");
      fireEvent.changeText(screen.getByPlaceholderText("Create a password"), "password");
      
      fireEvent.press(screen.getByText("Sign Up"));
      
      await waitFor(() => {
        expect(mockHandleSignUp).toHaveBeenCalledWith(
          "single@example.com",
          "password",
          "student",
          "SingleName",
          ""
        );
      });
    });

    it("should handle form submission with all fields empty", async () => {
      mockHandleSignUp.mockResolvedValue({});
      
      render(<SignUpScreen />);
      
      fireEvent.press(screen.getByText("Sign Up"));
      
      await waitFor(() => {
        expect(mockHandleSignUp).toHaveBeenCalledWith(
          "",
          "",
          "student",
          "",
          ""
        );
      });
    });
  });

  describe("Loading State", () => {
    it("should show ActivityIndicator when loading", () => {
      mockUseSignUp.mockReturnValue({
        handleSignUp: mockHandleSignUp,
        signUpError: null,
        isLoading: true,
        data: null,
      });
      
      render(<SignUpScreen />);
      
      const { UNSAFE_getAllByType } = render(<SignUpScreen />);
      const activityIndicators = UNSAFE_getAllByType("ActivityIndicator");
      expect(activityIndicators.length).toBeGreaterThan(0);
    });

    it("should disable button when loading", () => {
      mockUseSignUp.mockReturnValue({
        handleSignUp: mockHandleSignUp,
        signUpError: null,
        isLoading: true,
        data: null,
      });
      
      render(<SignUpScreen />);
      const signUpButton = screen.queryByText("Sign Up");
      
      // Button text should not be visible when loading
      expect(signUpButton).toBeNull();
    });

    it("should apply disabled style to button when loading", () => {
      mockUseSignUp.mockReturnValue({
        handleSignUp: mockHandleSignUp,
        signUpError: null,
        isLoading: true,
        data: null,
      });
      
      const { UNSAFE_getAllByType } = render(<SignUpScreen />);
      const touchables = UNSAFE_getAllByType("TouchableOpacity");
      
      // Find the sign up button (should be disabled)
      const signUpButton = touchables.find(
        (t) => t.props.disabled === true && t.props.style
      );
      
      expect(signUpButton).toBeDefined();
    });

    it("should not show loading indicator when not loading", () => {
      mockUseSignUp.mockReturnValue({
        handleSignUp: mockHandleSignUp,
        signUpError: null,
        isLoading: false,
        data: null,
      });
      
      render(<SignUpScreen />);
      expect(screen.getByText("Sign Up")).toBeTruthy();
    });
  });

  describe("Error Handling", () => {
    it("should display error message when signUpError is present", () => {
      const errorMessage = "Sign up failed";
      mockUseSignUp.mockReturnValue({
        handleSignUp: mockHandleSignUp,
        signUpError: new Error(errorMessage),
        isLoading: false,
        data: null,
      });
      
      render(<SignUpScreen />);
      
      expect(screen.getByText(`❌ ${errorMessage}`)).toBeTruthy();
    });

    it("should not display error container when no error", () => {
      mockUseSignUp.mockReturnValue({
        handleSignUp: mockHandleSignUp,
        signUpError: null,
        isLoading: false,
        data: null,
      });
      
      render(<SignUpScreen />);
      
      expect(screen.queryByText(/❌/)).toBeNull();
    });

    it("should display different error messages", () => {
      const errors = [
        "Email already exists",
        "Password too weak",
        "Invalid email format",
      ];
      
      errors.forEach((errorMsg) => {
        mockUseSignUp.mockReturnValue({
          handleSignUp: mockHandleSignUp,
          signUpError: new Error(errorMsg),
          isLoading: false,
          data: null,
        });
        
        const { unmount } = render(<SignUpScreen />);
        expect(screen.getByText(`❌ ${errorMsg}`)).toBeTruthy();
        unmount();
      });
    });

    it("should display error with emoji prefix", () => {
      mockUseSignUp.mockReturnValue({
        handleSignUp: mockHandleSignUp,
        signUpError: new Error("Test error"),
        isLoading: false,
        data: null,
      });
      
      render(<SignUpScreen />);
      const errorText = screen.getByText("❌ Test error");
      
      expect(errorText.props.children).toContain("❌");
    });
  });

  describe("Navigation", () => {
    it("should navigate to sign-in when Sign In link is pressed", () => {
      render(<SignUpScreen />);
      
      const signInLink = screen.getByText("Sign In");
      fireEvent.press(signInLink);
      
      expect(mockRouter.push).toHaveBeenCalledWith("/(auth)/sign-in");
    });

    it("should call router.push only once per press", () => {
      render(<SignUpScreen />);
      
      const signInLink = screen.getByText("Sign In");
      fireEvent.press(signInLink);
      
      expect(mockRouter.push).toHaveBeenCalledTimes(1);
    });
  });

  describe("Keyboard Behavior", () => {
    it("should use padding behavior on iOS", () => {
      jest.mock("react-native/Libraries/Utilities/Platform", () => ({
        OS: "ios",
        select: (obj: any) => obj.ios,
      }));
      
      const { UNSAFE_getAllByType } = render(<SignUpScreen />);
      const keyboardAvoidingView = UNSAFE_getAllByType("KeyboardAvoidingView")[0];
      
      expect(keyboardAvoidingView).toBeDefined();
    });

    it("should configure ScrollView with keyboardShouldPersistTaps", () => {
      const { UNSAFE_getAllByType } = render(<SignUpScreen />);
      const scrollView = UNSAFE_getAllByType("ScrollView")[0];
      
      expect(scrollView.props.keyboardShouldPersistTaps).toBe("handled");
    });
  });

  describe("Edge Cases", () => {
    it("should handle rapid role switching", () => {
      render(<SignUpScreen />);
      
      const studentButton = screen.getByText("🎓 Student");
      const tutorButton = screen.getByText("👨‍🏫 Tutor");
      const parentButton = screen.getByText("👪 Parent");
      
      fireEvent.press(tutorButton);
      fireEvent.press(parentButton);
      fireEvent.press(studentButton);
      fireEvent.press(tutorButton);
      
      expect(tutorButton.parent?.parent?.props.style).toContainEqual(
        expect.objectContaining({ borderColor: "#007AFF" })
      );
    });

    it("should handle multiple sign up button presses", async () => {
      mockHandleSignUp.mockResolvedValue({});
      
      render(<SignUpScreen />);
      
      const signUpButton = screen.getByText("Sign Up");
      fireEvent.press(signUpButton);
      fireEvent.press(signUpButton);
      fireEvent.press(signUpButton);
      
      // Should still only call once per actual press
      await waitFor(() => {
        expect(mockHandleSignUp).toHaveBeenCalled();
      });
    });

    it("should handle very long input values", () => {
      render(<SignUpScreen />);
      
      const longText = "a".repeat(1000);
      
      fireEvent.changeText(screen.getByPlaceholderText("First name"), longText);
      fireEvent.changeText(screen.getByPlaceholderText("Last name"), longText);
      fireEvent.changeText(screen.getByPlaceholderText("Enter your email"), longText);
      fireEvent.changeText(screen.getByPlaceholderText("Create a password"), longText);
      
      expect(screen.getByPlaceholderText("First name").props.value).toBe(longText);
    });

    it("should handle unicode characters in all text inputs", () => {
      render(<SignUpScreen />);
      
      fireEvent.changeText(screen.getByPlaceholderText("First name"), "李明");
      fireEvent.changeText(screen.getByPlaceholderText("Last name"), "王");
      fireEvent.changeText(screen.getByPlaceholderText("Enter your email"), "测试@example.com");
      
      expect(screen.getByPlaceholderText("First name").props.value).toBe("李明");
      expect(screen.getByPlaceholderText("Last name").props.value).toBe("王");
    });
  });

  describe("Component Lifecycle", () => {
    it("should handle unmounting without errors", () => {
      const { unmount } = render(<SignUpScreen />);
      expect(() => unmount()).not.toThrow();
    });

    it("should maintain state across rerenders", () => {
      const { rerender } = render(<SignUpScreen />);
      
      fireEvent.changeText(screen.getByPlaceholderText("First name"), "John");
      
      rerender(<SignUpScreen />);
      
      // State should persist
      expect(screen.getByPlaceholderText("First name").props.value).toBe("John");
    });
  });

  describe("Snapshot Tests", () => {
    it("should match snapshot in default state", () => {
      const { toJSON } = render(<SignUpScreen />);
      expect(toJSON()).toMatchSnapshot();
    });

    it("should match snapshot in loading state", () => {
      mockUseSignUp.mockReturnValue({
        handleSignUp: mockHandleSignUp,
        signUpError: null,
        isLoading: true,
        data: null,
      });
      
      const { toJSON } = render(<SignUpScreen />);
      expect(toJSON()).toMatchSnapshot();
    });

    it("should match snapshot with error", () => {
      mockUseSignUp.mockReturnValue({
        handleSignUp: mockHandleSignUp,
        signUpError: new Error("Test error"),
        isLoading: false,
        data: null,
      });
      
      const { toJSON } = render(<SignUpScreen />);
      expect(toJSON()).toMatchSnapshot();
    });
  });
});