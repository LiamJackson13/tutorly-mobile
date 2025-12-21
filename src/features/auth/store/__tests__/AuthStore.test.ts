import { useAuthStore } from "../AuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

describe("AuthStore", () => {
  beforeEach(() => {
    // Clear the store before each test
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
    });
    AsyncStorage.clear();
  });

  describe("Initial State", () => {
    it("should have null user initially", () => {
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
    });

    it("should not be authenticated initially", () => {
      const state = useAuthStore.getState();
      expect(state.isAuthenticated).toBe(false);
    });

    it("should have login and logout methods", () => {
      const state = useAuthStore.getState();
      expect(typeof state.login).toBe("function");
      expect(typeof state.logout).toBe("function");
    });
  });

  describe("Login Functionality", () => {
    it("should set user and authenticated state when logging in as student", () => {
      const mockUser = {
        id: "user-123",
        email: "student@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it("should set user and authenticated state when logging in as tutor", () => {
      const mockUser = {
        id: "user-456",
        email: "tutor@example.com",
        role: "tutor" as const,
        first_name: "Alice",
        last_name: "Smith",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it("should set user and authenticated state when logging in as parent", () => {
      const mockUser = {
        id: "user-789",
        email: "parent@example.com",
        role: "parent" as const,
        first_name: "Bob",
        last_name: "Johnson",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.isAuthenticated).toBe(true);
    });

    it("should handle login with only first_name", () => {
      const mockUser = {
        id: "user-101",
        email: "test@example.com",
        role: "student" as const,
        first_name: "SingleName",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.user?.last_name).toBeUndefined();
    });

    it("should handle login with optional phone number", () => {
      const mockUser = {
        id: "user-102",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
        phone: "+1234567890",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toEqual(mockUser);
      expect(state.user?.phone).toBe("+1234567890");
    });

    it("should handle login with first_name as 'User' default", () => {
      const mockUser = {
        id: "user-103",
        email: "test@example.com",
        role: "student" as const,
        first_name: "User" as const,
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user?.first_name).toBe("User");
    });

    it("should override previous user on new login", () => {
      const firstUser = {
        id: "user-1",
        email: "first@example.com",
        role: "student" as const,
        first_name: "First",
        last_name: "User",
      };

      const secondUser = {
        id: "user-2",
        email: "second@example.com",
        role: "tutor" as const,
        first_name: "Second",
        last_name: "User",
      };

      useAuthStore.getState().login(firstUser);
      expect(useAuthStore.getState().user).toEqual(firstUser);

      useAuthStore.getState().login(secondUser);
      expect(useAuthStore.getState().user).toEqual(secondUser);
      expect(useAuthStore.getState().user?.id).toBe("user-2");
    });
  });

  describe("Logout Functionality", () => {
    it("should clear user and set authenticated to false", () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
      };

      useAuthStore.getState().login(mockUser);
      expect(useAuthStore.getState().isAuthenticated).toBe(true);

      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    it("should handle logout when not logged in", () => {
      const initialState = useAuthStore.getState();
      expect(initialState.user).toBeNull();

      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });

    it("should handle multiple consecutive logouts", () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
      };

      useAuthStore.getState().login(mockUser);
      useAuthStore.getState().logout();
      useAuthStore.getState().logout();
      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe("Edge Cases", () => {
    it("should handle user with special characters in name", () => {
      const mockUser = {
        id: "user-special",
        email: "test@example.com",
        role: "student" as const,
        first_name: "José",
        last_name: "O'Brien-García",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user?.first_name).toBe("José");
      expect(state.user?.last_name).toBe("O'Brien-García");
    });

    it("should handle user with unicode characters in name", () => {
      const mockUser = {
        id: "user-unicode",
        email: "test@example.com",
        role: "student" as const,
        first_name: "李明",
        last_name: "王",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user?.first_name).toBe("李明");
      expect(state.user?.last_name).toBe("王");
    });

    it("should handle user with empty string last name", () => {
      const mockUser = {
        id: "user-empty",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user?.last_name).toBe("");
    });

    it("should handle very long email addresses", () => {
      const longEmail = "a".repeat(100) + "@example.com";
      const mockUser = {
        id: "user-long-email",
        email: longEmail,
        role: "tutor" as const,
        first_name: "Test",
        last_name: "User",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user?.email).toBe(longEmail);
    });

    it("should handle email with special characters", () => {
      const mockUser = {
        id: "user-special-email",
        email: "test+user.name@example.co.uk",
        role: "parent" as const,
        first_name: "Test",
        last_name: "User",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user?.email).toBe("test+user.name@example.co.uk");
    });

    it("should handle international phone numbers", () => {
      const mockUser = {
        id: "user-intl-phone",
        email: "test@example.com",
        role: "student" as const,
        first_name: "Test",
        last_name: "User",
        phone: "+44 20 7946 0958",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user?.phone).toBe("+44 20 7946 0958");
    });
  });

  describe("Role Transitions", () => {
    it("should allow changing roles between logins", () => {
      const studentUser = {
        id: "user-123",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
      };

      const tutorUser = {
        id: "user-123",
        email: "test@example.com",
        role: "tutor" as const,
        first_name: "John",
        last_name: "Doe",
      };

      useAuthStore.getState().login(studentUser);
      expect(useAuthStore.getState().user?.role).toBe("student");

      useAuthStore.getState().login(tutorUser);
      expect(useAuthStore.getState().user?.role).toBe("tutor");
    });

    it("should maintain all three role types correctly", () => {
      const roles = ["student", "tutor", "parent"] as const;

      roles.forEach((role) => {
        const mockUser = {
          id: `user-${role}`,
          email: `${role}@example.com`,
          role: role,
          first_name: "Test",
          last_name: "User",
        };

        useAuthStore.getState().login(mockUser);
        expect(useAuthStore.getState().user?.role).toBe(role);
      });
    });
  });

  describe("State Consistency", () => {
    it("should maintain consistency between user and isAuthenticated", () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
      };

      // After login, both should be set
      useAuthStore.getState().login(mockUser);
      const loginState = useAuthStore.getState();
      expect(loginState.user).not.toBeNull();
      expect(loginState.isAuthenticated).toBe(true);

      // After logout, both should be reset
      useAuthStore.getState().logout();
      const logoutState = useAuthStore.getState();
      expect(logoutState.user).toBeNull();
      expect(logoutState.isAuthenticated).toBe(false);
    });

    it("should update both user and isAuthenticated atomically on login", () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toBeTruthy();
      expect(state.isAuthenticated).toBe(true);
    });

    it("should update both user and isAuthenticated atomically on logout", () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
      };

      useAuthStore.getState().login(mockUser);
      useAuthStore.getState().logout();

      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
      expect(state.isAuthenticated).toBe(false);
    });
  });

  describe("User Object Structure", () => {
    it("should preserve all required user fields", () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toHaveProperty("id");
      expect(state.user).toHaveProperty("email");
      expect(state.user).toHaveProperty("role");
      expect(state.user).toHaveProperty("first_name");
      expect(state.user).toHaveProperty("last_name");
    });

    it("should preserve optional phone field when provided", () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
        phone: "+1234567890",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user).toHaveProperty("phone");
      expect(state.user?.phone).toBe("+1234567890");
    });

    it("should not have phone field when not provided", () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
      };

      useAuthStore.getState().login(mockUser);

      const state = useAuthStore.getState();
      expect(state.user?.phone).toBeUndefined();
    });
  });

  describe("Rapid State Changes", () => {
    it("should handle rapid login/logout cycles", () => {
      const mockUser = {
        id: "user-123",
        email: "test@example.com",
        role: "student" as const,
        first_name: "John",
        last_name: "Doe",
      };

      for (let i = 0; i < 10; i++) {
        useAuthStore.getState().login(mockUser);
        expect(useAuthStore.getState().isAuthenticated).toBe(true);

        useAuthStore.getState().logout();
        expect(useAuthStore.getState().isAuthenticated).toBe(false);
      }

      const finalState = useAuthStore.getState();
      expect(finalState.user).toBeNull();
      expect(finalState.isAuthenticated).toBe(false);
    });

    it("should handle rapid user switches", () => {
      const users = [
        {
          id: "user-1",
          email: "user1@example.com",
          role: "student" as const,
          first_name: "User",
          last_name: "One",
        },
        {
          id: "user-2",
          email: "user2@example.com",
          role: "tutor" as const,
          first_name: "User",
          last_name: "Two",
        },
        {
          id: "user-3",
          email: "user3@example.com",
          role: "parent" as const,
          first_name: "User",
          last_name: "Three",
        },
      ];

      users.forEach((user) => {
        useAuthStore.getState().login(user);
        expect(useAuthStore.getState().user?.id).toBe(user.id);
      });

      expect(useAuthStore.getState().user?.id).toBe("user-3");
    });
  });
});