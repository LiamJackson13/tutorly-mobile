import React from "react";
import { render, screen } from "@testing-library/react-native";
import ParentQuickStats from "../ParentQuickStats";

describe("ParentQuickStats", () => {
  describe("Rendering", () => {
    it("should render without crashing", () => {
      render(<ParentQuickStats />);
    });

    it("should render the title 'Quick Stats'", () => {
      render(<ParentQuickStats />);
      const title = screen.getByText("Quick Stats");
      expect(title).toBeTruthy();
    });

    it("should have correct title styling", () => {
      render(<ParentQuickStats />);
      const title = screen.getByText("Quick Stats");
      expect(title.props.style).toMatchObject({
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
      });
    });
  });

  describe("Stats Display", () => {
    it("should display 'Sessions This Month' stat", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText("Sessions This Month: 8");
      expect(stat).toBeTruthy();
    });

    it("should display 'Homework Completion Rate' stat", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText("Homework Completion Rate: 92%");
      expect(stat).toBeTruthy();
    });

    it("should display 'Attendance Rate' stat", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText("Attendance Rate: 95%");
      expect(stat).toBeTruthy();
    });

    it("should display 'Payment Status' stat", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText("Payment Status: Up to Date");
      expect(stat).toBeTruthy();
    });
  });

  describe("Component Structure", () => {
    it("should render all four stats", () => {
      const { getAllByText } = render(<ParentQuickStats />);
      
      const stats = [
        "Sessions This Month: 8",
        "Homework Completion Rate: 92%",
        "Attendance Rate: 95%",
        "Payment Status: Up to Date",
      ];

      stats.forEach((stat) => {
        expect(screen.getByText(stat)).toBeTruthy();
      });
    });

    it("should render stats in correct order", () => {
      const { UNSAFE_getAllByType } = render(<ParentQuickStats />);
      const texts = UNSAFE_getAllByType("Text");
      
      // First text should be the title
      expect(texts[0].props.children).toBe("Quick Stats");
      
      // Following texts should be the stats in order
      expect(texts[1].props.children).toBe("Sessions This Month: 8");
      expect(texts[2].props.children).toBe("Homework Completion Rate: 92%");
      expect(texts[3].props.children).toBe("Attendance Rate: 95%");
      expect(texts[4].props.children).toBe("Payment Status: Up to Date");
    });

    it("should have a root View container", () => {
      const { UNSAFE_getByType } = render(<ParentQuickStats />);
      const container = UNSAFE_getByType("View");
      expect(container).toBeTruthy();
    });
  });

  describe("Stat Values", () => {
    it("should display correct session count", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText(/Sessions This Month: \d+/);
      expect(stat.props.children).toBe("Sessions This Month: 8");
    });

    it("should display homework completion as percentage", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText(/Homework Completion Rate: \d+%/);
      expect(stat.props.children).toBe("Homework Completion Rate: 92%");
    });

    it("should display attendance as percentage", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText(/Attendance Rate: \d+%/);
      expect(stat.props.children).toBe("Attendance Rate: 95%");
    });

    it("should display payment status as text", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText(/Payment Status:/);
      expect(stat.props.children).toContain("Up to Date");
    });
  });

  describe("Content Validation", () => {
    it("should display numeric session value", () => {
      render(<ParentQuickStats />);
      const sessionText = screen.getByText("Sessions This Month: 8");
      expect(sessionText.props.children).toMatch(/\d+/);
    });

    it("should display percentage values with % symbol", () => {
      render(<ParentQuickStats />);
      const homeworkRate = screen.getByText("Homework Completion Rate: 92%");
      const attendanceRate = screen.getByText("Attendance Rate: 95%");
      
      expect(homeworkRate.props.children).toContain("%");
      expect(attendanceRate.props.children).toContain("%");
    });

    it("should have descriptive labels for each stat", () => {
      render(<ParentQuickStats />);
      
      expect(screen.getByText(/Sessions This Month:/)).toBeTruthy();
      expect(screen.getByText(/Homework Completion Rate:/)).toBeTruthy();
      expect(screen.getByText(/Attendance Rate:/)).toBeTruthy();
      expect(screen.getByText(/Payment Status:/)).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should render text components accessible to screen readers", () => {
      const { getAllByText } = render(<ParentQuickStats />);
      const textElements = getAllByText(/.+/);
      
      expect(textElements.length).toBeGreaterThan(0);
      textElements.forEach((element) => {
        expect(element).toBeTruthy();
      });
    });

    it("should have meaningful text content for all stats", () => {
      render(<ParentQuickStats />);
      
      const sessionsStat = screen.getByText("Sessions This Month: 8");
      const homeworkStat = screen.getByText("Homework Completion Rate: 92%");
      const attendanceStat = screen.getByText("Attendance Rate: 95%");
      const paymentStat = screen.getByText("Payment Status: Up to Date");
      
      expect(sessionsStat.props.children).toBeTruthy();
      expect(homeworkStat.props.children).toBeTruthy();
      expect(attendanceStat.props.children).toBeTruthy();
      expect(paymentStat.props.children).toBeTruthy();
    });
  });

  describe("Snapshot Tests", () => {
    it("should match snapshot", () => {
      const { toJSON } = render(<ParentQuickStats />);
      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe("Component Export", () => {
    it("should export default component", () => {
      expect(ParentQuickStats).toBeDefined();
      expect(typeof ParentQuickStats).toBe("function");
    });
  });

  describe("Data Consistency", () => {
    it("should display consistent session count format", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText("Sessions This Month: 8");
      expect(stat.props.children).toMatch(/^Sessions This Month: \d+$/);
    });

    it("should display homework rate in consistent format", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText("Homework Completion Rate: 92%");
      expect(stat.props.children).toMatch(
        /^Homework Completion Rate: \d+%$/
      );
    });

    it("should display attendance rate in consistent format", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText("Attendance Rate: 95%");
      expect(stat.props.children).toMatch(/^Attendance Rate: \d+%$/);
    });

    it("should display payment status in consistent format", () => {
      render(<ParentQuickStats />);
      const stat = screen.getByText("Payment Status: Up to Date");
      expect(stat.props.children).toMatch(/^Payment Status: .+$/);
    });
  });

  describe("Multiple Renders", () => {
    it("should render consistently across multiple renders", () => {
      const { rerender } = render(<ParentQuickStats />);
      const firstRender = screen.getByText("Quick Stats");
      expect(firstRender).toBeTruthy();

      rerender(<ParentQuickStats />);
      const secondRender = screen.getByText("Quick Stats");
      expect(secondRender).toBeTruthy();

      expect(screen.getByText("Sessions This Month: 8")).toBeTruthy();
    });

    it("should maintain all stats after rerender", () => {
      const { rerender } = render(<ParentQuickStats />);
      
      expect(screen.getByText("Sessions This Month: 8")).toBeTruthy();
      expect(screen.getByText("Homework Completion Rate: 92%")).toBeTruthy();
      expect(screen.getByText("Attendance Rate: 95%")).toBeTruthy();
      expect(screen.getByText("Payment Status: Up to Date")).toBeTruthy();

      rerender(<ParentQuickStats />);
      
      expect(screen.getByText("Sessions This Month: 8")).toBeTruthy();
      expect(screen.getByText("Homework Completion Rate: 92%")).toBeTruthy();
      expect(screen.getByText("Attendance Rate: 95%")).toBeTruthy();
      expect(screen.getByText("Payment Status: Up to Date")).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("should handle component unmounting", () => {
      const { unmount } = render(<ParentQuickStats />);
      expect(() => unmount()).not.toThrow();
    });

    it("should not throw errors during render", () => {
      expect(() => render(<ParentQuickStats />)).not.toThrow();
    });
  });

  describe("Text Content Integrity", () => {
    it("should not have empty text nodes", () => {
      const { UNSAFE_getAllByType } = render(<ParentQuickStats />);
      const textComponents = UNSAFE_getAllByType("Text");
      
      textComponents.forEach((textComponent) => {
        expect(textComponent.props.children).toBeTruthy();
        expect(textComponent.props.children).not.toBe("");
      });
    });

    it("should have exactly 5 text components (title + 4 stats)", () => {
      const { UNSAFE_getAllByType } = render(<ParentQuickStats />);
      const textComponents = UNSAFE_getAllByType("Text");
      
      expect(textComponents).toHaveLength(5);
    });
  });

  describe("Component Props", () => {
    it("should render without requiring any props", () => {
      expect(() => render(<ParentQuickStats />)).not.toThrow();
    });
  });
});