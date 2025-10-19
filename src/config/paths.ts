export const paths = {
  home: {
    path: "/",
    getHref: () => "/",
  },

  auth: {
    register: {
      path: "/auth/register",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
    login: {
      path: "/auth/login",
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""}`,
    },
  },

  app: {
    root: {
      path: "/app",
      getHref: () => "/app",
    },
    dashboard: {
      path: "",
      getHref: () => "/app",
    },
    products: {
      path: "products",
      getHref: () => "/app/products",
    },
    stocks: {
      path: "stocks",
      getHref: () => "/app/stocks",
    },
    sales: {
      path: "sales",
      getHref: () => "/app/sales",
    },
    billCalculation: {
      path: "bill-calculation",
      getHref: () => "/app/bill-calculation",
    },
    settings: {
      path: "settings",
      getHref: () => "/app/settings",
    },
    discussions: {
      path: "discussions",
      getHref: () => "/app/discussions",
    },
    discussion: {
      path: "discussions/:discussionId",
      getHref: (id: string) => `/app/discussions/${id}`,
    },
    orders: {
      path: "orders",
      getHref: () => "/app/orders",
    },
  },
} as const;
