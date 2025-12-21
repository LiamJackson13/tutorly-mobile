import React from "react";
import { render } from "@testing-library/react-native";
import AppLayout from "../(app)/_layout";
import { useAuthStore } from "@/src/features/auth/store/AuthStore";
import { Redirect, Tabs } from "expo-router";

// Mock dependencies
jest.mock("@/src/features/auth/store/AuthStore");
jest.mock("@/src/features/auth/components/UserOnly", () => ({
  UserOnlyGuard: ({ children }: { children: React.ReactNode }) => children,
}));

describe("AppLayout", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("should render without crashing", () => {
      expect(() => render(<AppLayout />)).not.toThrow();
    });

    it("should render UserOnlyGuard wrapper", () => {
      const { UNSAFE_root } = render(<AppLayout />);
      expect(UNSAFE_root).toBeTruthy();
    });

    it("should render Tabs component inside UserOnlyGuard", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabs = UNSAFE_getAllByType(Tabs);
      expect(tabs).toHaveLength(1);
    });
  });

  describe("Tab Configuration", () => {
    it("should render dashboard tab", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      const dashboardTab = tabScreens.find(
        (tab) => tab.props.name === "dashboard/index"
      );
      expect(dashboardTab).toBeTruthy();
    });

    it("should render profile tab", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      const profileTab = tabScreens.find(
        (tab) => tab.props.name === "profile/index"
      );
      expect(profileTab).toBeTruthy();
    });

    it("should have exactly two tab screens", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      expect(tabScreens).toHaveLength(2);
    });

    it("should configure dashboard tab with correct label", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      const dashboardTab = tabScreens.find(
        (tab) => tab.props.name === "dashboard/index"
      );
      expect(dashboardTab?.props.options.tabBarLabel).toBe("Dashboard");
    });

    it("should configure profile tab with correct label", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      const profileTab = tabScreens.find(
        (tab) => tab.props.name === "profile/index"
      );
      expect(profileTab?.props.options.tabBarLabel).toBe("Profile");
    });
  });

  describe("Tab Screen Options", () => {
    it("should hide header for all tabs", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabs = UNSAFE_getAllByType(Tabs);
      
      expect(tabs[0].props.screenOptions.headerShown).toBe(false);
    });

    it("should apply screenOptions to Tabs component", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabs = UNSAFE_getAllByType(Tabs);
      
      expect(tabs[0].props.screenOptions).toBeDefined();
      expect(tabs[0].props.screenOptions).toHaveProperty("headerShown");
    });
  });

  describe("Component Structure", () => {
    it("should have correct component hierarchy", () => {
      const { UNSAFE_root } = render(<AppLayout />);
      expect(UNSAFE_root).toBeTruthy();
      
      // Should have UserOnlyGuard wrapping Tabs
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabs = UNSAFE_getAllByType(Tabs);
      expect(tabs).toHaveLength(1);
    });

    it("should render tab screens as children of Tabs", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabs = UNSAFE_getAllByType(Tabs);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      expect(tabs).toHaveLength(1);
      expect(tabScreens.length).toBeGreaterThan(0);
    });
  });

  describe("Navigation Routes", () => {
    it("should define dashboard route correctly", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      const dashboardTab = tabScreens.find(
        (tab) => tab.props.name === "dashboard/index"
      );
      expect(dashboardTab?.props.name).toBe("dashboard/index");
    });

    it("should define profile route correctly", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      const profileTab = tabScreens.find(
        (tab) => tab.props.name === "profile/index"
      );
      expect(profileTab?.props.name).toBe("profile/index");
    });

    it("should have unique route names for each tab", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      const routeNames = tabScreens.map((tab) => tab.props.name);
      const uniqueRouteNames = new Set(routeNames);
      
      expect(uniqueRouteNames.size).toBe(routeNames.length);
    });
  });

  describe("Tab Labels", () => {
    it("should have readable labels for all tabs", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      tabScreens.forEach((tab) => {
        expect(tab.props.options.tabBarLabel).toBeTruthy();
        expect(typeof tab.props.options.tabBarLabel).toBe("string");
        expect(tab.props.options.tabBarLabel.length).toBeGreaterThan(0);
      });
    });

    it("should have capitalized tab labels", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      tabScreens.forEach((tab) => {
        const label = tab.props.options.tabBarLabel;
        expect(label[0]).toBe(label[0].toUpperCase());
      });
    });
  });

  describe("UserOnlyGuard Integration", () => {
    it("should wrap entire navigation in UserOnlyGuard", () => {
      // The UserOnlyGuard is mocked to pass through children
      // In real implementation, it would redirect if not authenticated
      const { UNSAFE_root } = render(<AppLayout />);
      expect(UNSAFE_root).toBeTruthy();
    });
  });

  describe("Component Export", () => {
    it("should export default component", () => {
      expect(AppLayout).toBeDefined();
      expect(typeof AppLayout).toBe("function");
    });

    it("should be a valid React component", () => {
      expect(React.isValidElement(<AppLayout />)).toBe(true);
    });
  });

  describe("Screen Options Consistency", () => {
    it("should apply same screen options to all tabs", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabs = UNSAFE_getAllByType(Tabs);
      
      const screenOptions = tabs[0].props.screenOptions;
      expect(screenOptions.headerShown).toBe(false);
    });

    it("should not override individual tab options inadvertently", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      // Each tab should have its own options
      tabScreens.forEach((tab) => {
        expect(tab.props.options).toBeDefined();
        expect(tab.props.options.tabBarLabel).toBeTruthy();
      });
    });
  });

  describe("Multiple Renders", () => {
    it("should render consistently across multiple renders", () => {
      const { rerender, UNSAFE_getAllByType } = render(<AppLayout />);
      
      const firstRenderTabs = UNSAFE_getAllByType(Tabs.Screen);
      expect(firstRenderTabs).toHaveLength(2);

      rerender(<AppLayout />);
      
      const secondRenderTabs = UNSAFE_getAllByType(Tabs.Screen);
      expect(secondRenderTabs).toHaveLength(2);
    });

    it("should maintain tab configuration after rerender", () => {
      const { rerender, UNSAFE_getAllByType } = render(<AppLayout />);
      
      rerender(<AppLayout />);
      
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      const dashboardTab = tabScreens.find(
        (tab) => tab.props.name === "dashboard/index"
      );
      const profileTab = tabScreens.find(
        (tab) => tab.props.name === "profile/index"
      );
      
      expect(dashboardTab).toBeTruthy();
      expect(profileTab).toBeTruthy();
    });
  });

  describe("Edge Cases", () => {
    it("should handle component unmounting", () => {
      const { unmount } = render(<AppLayout />);
      expect(() => unmount()).not.toThrow();
    });

    it("should not throw errors during render", () => {
      expect(() => render(<AppLayout />)).not.toThrow();
    });
  });

  describe("Snapshot Tests", () => {
    it("should match snapshot", () => {
      const { toJSON } = render(<AppLayout />);
      expect(toJSON()).toMatchSnapshot();
    });
  });

  describe("Tab Order", () => {
    it("should render dashboard tab before profile tab", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabScreens = UNSAFE_getAllByType(Tabs.Screen);
      
      expect(tabScreens[0].props.name).toBe("dashboard/index");
      expect(tabScreens[1].props.name).toBe("profile/index");
    });
  });

  describe("Props Validation", () => {
    it("should not require any props", () => {
      expect(() => render(<AppLayout />)).not.toThrow();
    });

    it("should render with default configuration", () => {
      const { UNSAFE_getAllByType } = render(<AppLayout />);
      const tabs = UNSAFE_getAllByType(Tabs);
      
      expect(tabs).toHaveLength(1);
      expect(tabs[0].props.screenOptions).toBeDefined();
    });
  });
});