import { useEffect } from "react";

import { selectApp } from "@/store/selectors/appSelectors";
import { useAppSelector } from "@/store/utils";

export const useDynamicFavicon = () => {
  const { faviconUrl } = useAppSelector(selectApp);

  useEffect(() => {
    const updateFavicon = () => {
      let link: HTMLLinkElement | null =
        document.querySelector("link[rel*='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    };

    updateFavicon();
  }, [faviconUrl]);
};
