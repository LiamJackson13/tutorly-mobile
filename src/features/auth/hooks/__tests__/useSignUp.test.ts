import { renderHook, act, waitFor } from "@testing-library/react-native";
import { useSignUp } from "../useSignUp";
import { signUp } from "../../api/signUp";
import { setUserRole } from "../../api/setUserRole";
import { setUserName } from "../../api/setUserName";
import { createStudent } from "../../api/createStudent";
import { createTutor } from "../../api/createTutor";
import { createParent } from "../../api/createParent";
import { useAuthStore } from "../../store/AuthStore";

// Mock all dependencies
jest.mock("../../api/signUp");
jest.mock("../../api/setUserRole");
jest.mock("../../api/setUserName");
jest.mock("../../api/createStudent");
jest.mock("../../api/createTutor");
jest.mock("../../api/createParent");
jest.mock("../../store/AuthStore");

describe("useSignUp", () => {
  const mockLoginUser = jest.fn();
  const mockSignUpResult = {
    user: {
      id: "test-user-id-123",
      email: "test@example.com",
    },
    session: {
      access_token: "test-token",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue(mockLoginUser);
  });

  describe("Initial State", () => {
    it("should initialize with correct default values", () => {
      const { result } = renderHook(() => useSignUp());

      expect(result.current.data).toBeNull();
      expect(result.current.signUpError).toBeNull();
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("Student Sign Up - Happy Path", () => {
    it("should successfully sign up a student with first and last name", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createStudent as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useSignUp());

      let signUpResult;
      await act(async () => {
        signUpResult = await result.current.handleSignUp(
          "student@example.com",
          "password123",
          "student",
          "John",
          "Doe"
        );
      });

      expect(signUp).toHaveBeenCalledWith("student@example.com", "password123");
      expect(setUserRole).toHaveBeenCalledWith("student");
      expect(setUserName).toHaveBeenCalledWith("John", "Doe");
      expect(createStudent).toHaveBeenCalledTimes(1);
      expect(createTutor).not.toHaveBeenCalled();
      expect(createParent).not.toHaveBeenCalled();
      expect(mockLoginUser).toHaveBeenCalledWith({
        id: mockSignUpResult.user.id,
        email: "student@example.com",
        role: "student",
        first_name: "John",
        last_name: "Doe",
      });
      expect(result.current.data).toEqual(mockSignUpResult);
      expect(result.current.signUpError).toBeNull();
      expect(result.current.isLoading).toBe(false);
      expect(signUpResult).toEqual(mockSignUpResult);
    });

    it("should successfully sign up a student with only first name", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createStudent as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        await result.current.handleSignUp(
          "student@example.com",
          "password123",
          "student",
          "Jane",
          ""
        );
      });

      expect(setUserName).toHaveBeenCalledWith("Jane", "");
      expect(mockLoginUser).toHaveBeenCalledWith({
        id: mockSignUpResult.user.id,
        email: "student@example.com",
        role: "student",
        first_name: "Jane",
        last_name: "",
      });
    });
  });

  describe("Tutor Sign Up - Happy Path", () => {
    it("should successfully sign up a tutor", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createTutor as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        await result.current.handleSignUp(
          "tutor@example.com",
          "password123",
          "tutor",
          "Alice",
          "Smith"
        );
      });

      expect(signUp).toHaveBeenCalledWith("tutor@example.com", "password123");
      expect(setUserRole).toHaveBeenCalledWith("tutor");
      expect(setUserName).toHaveBeenCalledWith("Alice", "Smith");
      expect(createTutor).toHaveBeenCalledTimes(1);
      expect(createStudent).not.toHaveBeenCalled();
      expect(createParent).not.toHaveBeenCalled();
      expect(mockLoginUser).toHaveBeenCalledWith({
        id: mockSignUpResult.user.id,
        email: "tutor@example.com",
        role: "tutor",
        first_name: "Alice",
        last_name: "Smith",
      });
    });
  });

  describe("Parent Sign Up - Happy Path", () => {
    it("should successfully sign up a parent", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createParent as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        await result.current.handleSignUp(
          "parent@example.com",
          "password123",
          "parent",
          "Bob",
          "Johnson"
        );
      });

      expect(signUp).toHaveBeenCalledWith("parent@example.com", "password123");
      expect(setUserRole).toHaveBeenCalledWith("parent");
      expect(setUserName).toHaveBeenCalledWith("Bob", "Johnson");
      expect(createParent).toHaveBeenCalledTimes(1);
      expect(createStudent).not.toHaveBeenCalled();
      expect(createTutor).not.toHaveBeenCalled();
      expect(mockLoginUser).toHaveBeenCalledWith({
        id: mockSignUpResult.user.id,
        email: "parent@example.com",
        role: "parent",
        first_name: "Bob",
        last_name: "Johnson",
      });
    });
  });

  describe("Loading State", () => {
    it("should set isLoading to true during sign up process", async () => {
      let resolveSignUp: (value: any) => void;
      const signUpPromise = new Promise((resolve) => {
        resolveSignUp = resolve;
      });

      (signUp as jest.Mock).mockReturnValue(signUpPromise);

      const { result } = renderHook(() => useSignUp());

      act(() => {
        result.current.handleSignUp(
          "test@example.com",
          "password123",
          "student",
          "Test",
          "User"
        );
      });

      // Check loading state is true while promise is pending
      await waitFor(() => {
        expect(result.current.isLoading).toBe(true);
      });

      // Resolve the promise
      act(() => {
        resolveSignUp!(mockSignUpResult);
      });

      // Mock remaining calls
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createStudent as jest.Mock).mockResolvedValue({});

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it("should set isLoading to false after successful sign up", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createStudent as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        await result.current.handleSignUp(
          "test@example.com",
          "password123",
          "student",
          "Test",
          "User"
        );
      });

      expect(result.current.isLoading).toBe(false);
    });

    it("should set isLoading to false after failed sign up", async () => {
      (signUp as jest.Mock).mockRejectedValue(new Error("Sign up failed"));

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        try {
          await result.current.handleSignUp(
            "test@example.com",
            "password123",
            "student",
            "Test",
            "User"
          );
        } catch (error) {
          // Expected error
        }
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe("Error Handling", () => {
    it("should handle signUp API failure", async () => {
      const signUpError = new Error("Sign up failed");
      (signUp as jest.Mock).mockRejectedValue(signUpError);

      const { result } = renderHook(() => useSignUp());

      await expect(
        act(async () => {
          await result.current.handleSignUp(
            "test@example.com",
            "password123",
            "student",
            "Test",
            "User"
          );
        })
      ).rejects.toThrow("Sign up failed");

      expect(result.current.signUpError).toEqual(signUpError);
      expect(result.current.isLoading).toBe(false);
      expect(mockLoginUser).not.toHaveBeenCalled();
    });

    it("should handle missing user in signUp result", async () => {
      (signUp as jest.Mock).mockResolvedValue({ user: null });

      const { result } = renderHook(() => useSignUp());

      await expect(
        act(async () => {
          await result.current.handleSignUp(
            "test@example.com",
            "password123",
            "student",
            "Test",
            "User"
          );
        })
      ).rejects.toThrow("Sign Up failed - no user returned");

      expect(result.current.signUpError).toEqual(
        new Error("Sign Up failed - no user returned")
      );
    });

    it("should handle setUserRole failure", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      const roleError = new Error("Failed to set user role");
      (setUserRole as jest.Mock).mockRejectedValue(roleError);

      const { result } = renderHook(() => useSignUp());

      await expect(
        act(async () => {
          await result.current.handleSignUp(
            "test@example.com",
            "password123",
            "student",
            "Test",
            "User"
          );
        })
      ).rejects.toThrow("Failed to set user role");

      expect(result.current.signUpError).toEqual(roleError);
      expect(mockLoginUser).not.toHaveBeenCalled();
    });

    it("should handle setUserName failure", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      const nameError = new Error("Failed to set user name");
      (setUserName as jest.Mock).mockRejectedValue(nameError);

      const { result } = renderHook(() => useSignUp());

      await expect(
        act(async () => {
          await result.current.handleSignUp(
            "test@example.com",
            "password123",
            "student",
            "Test",
            "User"
          );
        })
      ).rejects.toThrow("Failed to set user name");

      expect(result.current.signUpError).toEqual(nameError);
      expect(mockLoginUser).not.toHaveBeenCalled();
    });

    it("should handle createStudent failure", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      const studentError = new Error("Failed to create student");
      (createStudent as jest.Mock).mockRejectedValue(studentError);

      const { result } = renderHook(() => useSignUp());

      await expect(
        act(async () => {
          await result.current.handleSignUp(
            "test@example.com",
            "password123",
            "student",
            "Test",
            "User"
          );
        })
      ).rejects.toThrow("Failed to create student");

      expect(result.current.signUpError).toEqual(studentError);
      expect(mockLoginUser).not.toHaveBeenCalled();
    });

    it("should handle createTutor failure", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      const tutorError = new Error("Failed to create tutor");
      (createTutor as jest.Mock).mockRejectedValue(tutorError);

      const { result } = renderHook(() => useSignUp());

      await expect(
        act(async () => {
          await result.current.handleSignUp(
            "test@example.com",
            "password123",
            "tutor",
            "Test",
            "User"
          );
        })
      ).rejects.toThrow("Failed to create tutor");

      expect(result.current.signUpError).toEqual(tutorError);
    });

    it("should handle createParent failure", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      const parentError = new Error("Failed to create parent");
      (createParent as jest.Mock).mockRejectedValue(parentError);

      const { result } = renderHook(() => useSignUp());

      await expect(
        act(async () => {
          await result.current.handleSignUp(
            "test@example.com",
            "password123",
            "parent",
            "Test",
            "User"
          );
        })
      ).rejects.toThrow("Failed to create parent");

      expect(result.current.signUpError).toEqual(parentError);
    });

    it("should clear previous error on new sign up attempt", async () => {
      (signUp as jest.Mock).mockRejectedValueOnce(new Error("First error"));

      const { result } = renderHook(() => useSignUp());

      // First attempt - should fail
      await act(async () => {
        try {
          await result.current.handleSignUp(
            "test@example.com",
            "password123",
            "student",
            "Test",
            "User"
          );
        } catch (error) {
          // Expected
        }
      });

      expect(result.current.signUpError).toBeTruthy();

      // Second attempt - should succeed
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createStudent as jest.Mock).mockResolvedValue({});

      await act(async () => {
        await result.current.handleSignUp(
          "test@example.com",
          "password123",
          "student",
          "Test",
          "User"
        );
      });

      expect(result.current.signUpError).toBeNull();
    });
  });

  describe("Edge Cases", () => {
    it("should handle special characters in email", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createStudent as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        await result.current.handleSignUp(
          "test+user@example.co.uk",
          "password123",
          "student",
          "Test",
          "User"
        );
      });

      expect(signUp).toHaveBeenCalledWith(
        "test+user@example.co.uk",
        "password123"
      );
    });

    it("should handle special characters in names", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createStudent as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        await result.current.handleSignUp(
          "test@example.com",
          "password123",
          "student",
          "José",
          "O'Brien-García"
        );
      });

      expect(setUserName).toHaveBeenCalledWith("José", "O'Brien-García");
      expect(mockLoginUser).toHaveBeenCalledWith({
        id: mockSignUpResult.user.id,
        email: "test@example.com",
        role: "student",
        first_name: "José",
        last_name: "O'Brien-García",
      });
    });

    it("should handle empty string for last name", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createStudent as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        await result.current.handleSignUp(
          "test@example.com",
          "password123",
          "student",
          "SingleName",
          ""
        );
      });

      expect(setUserName).toHaveBeenCalledWith("SingleName", "");
    });

    it("should handle very long passwords", async () => {
      const longPassword = "a".repeat(1000);
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createStudent as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        await result.current.handleSignUp(
          "test@example.com",
          longPassword,
          "student",
          "Test",
          "User"
        );
      });

      expect(signUp).toHaveBeenCalledWith("test@example.com", longPassword);
    });
  });

  describe("Sequential Execution", () => {
    it("should execute API calls in correct order", async () => {
      const callOrder: string[] = [];

      (signUp as jest.Mock).mockImplementation(async () => {
        callOrder.push("signUp");
        return mockSignUpResult;
      });

      (setUserRole as jest.Mock).mockImplementation(async () => {
        callOrder.push("setUserRole");
        return {};
      });

      (setUserName as jest.Mock).mockImplementation(async () => {
        callOrder.push("setUserName");
        return {};
      });

      (createStudent as jest.Mock).mockImplementation(async () => {
        callOrder.push("createStudent");
        return {};
      });

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        await result.current.handleSignUp(
          "test@example.com",
          "password123",
          "student",
          "Test",
          "User"
        );
      });

      expect(callOrder).toEqual([
        "signUp",
        "setUserRole",
        "setUserName",
        "createStudent",
      ]);
    });

    it("should not call role-specific creation if setUserRole fails", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockRejectedValue(
        new Error("Role setting failed")
      );

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        try {
          await result.current.handleSignUp(
            "test@example.com",
            "password123",
            "student",
            "Test",
            "User"
          );
        } catch (error) {
          // Expected
        }
      });

      expect(createStudent).not.toHaveBeenCalled();
      expect(createTutor).not.toHaveBeenCalled();
      expect(createParent).not.toHaveBeenCalled();
    });

    it("should not call loginUser if any API call fails", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createStudent as jest.Mock).mockRejectedValue(
        new Error("Student creation failed")
      );

      const { result } = renderHook(() => useSignUp());

      await act(async () => {
        try {
          await result.current.handleSignUp(
            "test@example.com",
            "password123",
            "student",
            "Test",
            "User"
          );
        } catch (error) {
          // Expected
        }
      });

      expect(mockLoginUser).not.toHaveBeenCalled();
    });
  });

  describe("Multiple Sign Up Attempts", () => {
    it("should handle multiple sequential sign ups", async () => {
      (signUp as jest.Mock).mockResolvedValue(mockSignUpResult);
      (setUserRole as jest.Mock).mockResolvedValue({});
      (setUserName as jest.Mock).mockResolvedValue({});
      (createStudent as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useSignUp());

      // First sign up
      await act(async () => {
        await result.current.handleSignUp(
          "user1@example.com",
          "password123",
          "student",
          "User",
          "One"
        );
      });

      expect(result.current.data).toEqual(mockSignUpResult);

      // Second sign up
      await act(async () => {
        await result.current.handleSignUp(
          "user2@example.com",
          "password456",
          "tutor",
          "User",
          "Two"
        );
      });

      expect(signUp).toHaveBeenCalledTimes(2);
      expect(result.current.data).toEqual(mockSignUpResult);
    });
  });
});