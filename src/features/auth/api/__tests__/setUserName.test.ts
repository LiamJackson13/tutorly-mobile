import { supabase } from "@/src/utils/supabase";
import { setUserName } from "../setUserName";

// Mock the supabase module
jest.mock("@/src/utils/supabase");

describe("setUserName", () => {
  const mockUser = {
    id: "test-user-id-123",
    email: "test@example.com",
  };

  const mockUpdatedData = {
    id: "test-user-id-123",
    first_name: "John",
    last_name: "Doe",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Happy Path", () => {
    it("should successfully update user name with both first and last name", async () => {
      // Mock successful auth and update
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const mockFrom = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: mockUpdatedData,
                error: null,
              }),
            }),
          }),
        }),
      });

      (supabase.from as jest.Mock) = mockFrom;

      const result = await setUserName("John", "Doe");

      expect(supabase.auth.getUser).toHaveBeenCalledTimes(1);
      expect(mockFrom).toHaveBeenCalledWith("users");
      expect(result).toEqual(mockUpdatedData);
    });

    it("should successfully update user name with only first name", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const mockUpdatedDataFirstOnly = {
        id: "test-user-id-123",
        first_name: "Jane",
        last_name: undefined,
      };

      const mockFrom = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: mockUpdatedDataFirstOnly,
                error: null,
              }),
            }),
          }),
        }),
      });

      (supabase.from as jest.Mock) = mockFrom;

      const result = await setUserName("Jane");

      expect(result).toEqual(mockUpdatedDataFirstOnly);
    });

    it("should handle empty string for last name", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const mockFrom = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: { ...mockUpdatedData, last_name: "" },
                error: null,
              }),
            }),
          }),
        }),
      });

      (supabase.from as jest.Mock) = mockFrom;

      const result = await setUserName("John", "");

      expect(result).toBeDefined();
    });
  });

  describe("Error Handling", () => {
    it("should throw error when auth.getUser returns an error", async () => {
      const authError = new Error("Authentication failed");
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: null },
        error: authError,
      });

      await expect(setUserName("John", "Doe")).rejects.toThrow(
        "Authentication failed"
      );
    });

    it("should throw error when no authenticated user exists", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: null },
        error: null,
      });

      await expect(setUserName("John", "Doe")).rejects.toThrow(
        "No authenticated user"
      );
    });

    it("should throw error when database update fails", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const dbError = new Error("Database update failed");
      const mockFrom = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: null,
                error: dbError,
              }),
            }),
          }),
        }),
      });

      (supabase.from as jest.Mock) = mockFrom;

      await expect(setUserName("John", "Doe")).rejects.toThrow(
        "Database update failed"
      );
    });

    it("should throw error when user ID is missing", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: { id: undefined, email: "test@example.com" } },
        error: null,
      });

      const mockFrom = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: null,
                error: new Error("User ID is required"),
              }),
            }),
          }),
        }),
      });

      (supabase.from as jest.Mock) = mockFrom;

      await expect(setUserName("John")).rejects.toThrow();
    });
  });

  describe("Edge Cases", () => {
    it("should handle special characters in names", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const specialCharsData = {
        id: "test-user-id-123",
        first_name: "José",
        last_name: "O'Brien-Smith",
      };

      const mockFrom = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: specialCharsData,
                error: null,
              }),
            }),
          }),
        }),
      });

      (supabase.from as jest.Mock) = mockFrom;

      const result = await setUserName("José", "O'Brien-Smith");

      expect(result).toEqual(specialCharsData);
    });

    it("should handle very long names", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const longName = "A".repeat(100);
      const longNameData = {
        id: "test-user-id-123",
        first_name: longName,
        last_name: longName,
      };

      const mockFrom = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: longNameData,
                error: null,
              }),
            }),
          }),
        }),
      });

      (supabase.from as jest.Mock) = mockFrom;

      const result = await setUserName(longName, longName);

      expect(result).toEqual(longNameData);
    });

    it("should handle unicode characters in names", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const unicodeData = {
        id: "test-user-id-123",
        first_name: "李明",
        last_name: "王",
      };

      const mockFrom = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: unicodeData,
                error: null,
              }),
            }),
          }),
        }),
      });

      (supabase.from as jest.Mock) = mockFrom;

      const result = await setUserName("李明", "王");

      expect(result).toEqual(unicodeData);
    });

    it("should handle names with only whitespace", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const whitespaceData = {
        id: "test-user-id-123",
        first_name: "   ",
        last_name: "   ",
      };

      const mockFrom = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: whitespaceData,
                error: null,
              }),
            }),
          }),
        }),
      });

      (supabase.from as jest.Mock) = mockFrom;

      const result = await setUserName("   ", "   ");

      expect(result).toEqual(whitespaceData);
    });
  });

  describe("Database Interaction", () => {
    it("should call update with correct parameters", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const mockUpdate = jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          select: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockUpdatedData,
              error: null,
            }),
          }),
        }),
      });

      const mockFrom = jest.fn().mockReturnValue({
        update: mockUpdate,
      });

      (supabase.from as jest.Mock) = mockFrom;

      await setUserName("John", "Doe");

      expect(mockFrom).toHaveBeenCalledWith("users");
      expect(mockUpdate).toHaveBeenCalledWith({
        first_name: "John",
        last_name: "Doe",
      });
    });

    it("should filter by correct user ID", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const mockEq = jest.fn().mockReturnValue({
        select: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: mockUpdatedData,
            error: null,
          }),
        }),
      });

      const mockFrom = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: mockEq,
        }),
      });

      (supabase.from as jest.Mock) = mockFrom;

      await setUserName("John", "Doe");

      expect(mockEq).toHaveBeenCalledWith("id", mockUser.id);
    });

    it("should request single record return", async () => {
      (supabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
        error: null,
      });

      const mockSingle = jest.fn().mockResolvedValue({
        data: mockUpdatedData,
        error: null,
      });

      const mockFrom = jest.fn().mockReturnValue({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: mockSingle,
            }),
          }),
        }),
      });

      (supabase.from as jest.Mock) = mockFrom;

      await setUserName("John", "Doe");

      expect(mockSingle).toHaveBeenCalledTimes(1);
    });
  });
});