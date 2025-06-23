import { useMemo } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import AppRoot from "@/app/routes/app/root";
import { paths } from "@/config/paths";
import { ProtectedRoute } from "@/lib/auth";

// eslint-disable-next-line react-refresh/only-export-components
export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: async () => {
        const mod = await import("./routes/landing");
        return { Component: mod.default };
      },
    },
    {
      path: paths.auth.login.path,
      lazy: async () => {
        const mod = await import("./routes/auth/login");
        return { Component: mod.default };
      },
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      children: [
        {
          path: paths.app.dashboard.path,
          lazy: async () => {
            const mod = await import("./routes/app/dashboard");
            return { Component: mod.default };
          },
        },
        {
          path: paths.app.products.path,
          lazy: async () => {
            const mod = await import("./routes/app/products");
            return { Component: mod.default };
          },
        },
        {
          path: paths.app.stocks.path,
          lazy: async () => {
            const mod = await import("./routes/app/stocks");
            return { Component: mod.default };
          },
        },
      ],
    },
    {
      path: "*",
      lazy: async () => {
        const mod = await import("./routes/not-found");
        return { Component: mod.default };
      },
    },
  ]);

export const AppRouter = () => {
  const router = useMemo(() => createAppRouter(), []);
  return <RouterProvider router={router} />;
};
