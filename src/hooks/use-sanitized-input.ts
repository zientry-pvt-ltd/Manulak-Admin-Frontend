import { useCallback } from "react";

import type { SanitizerConfig } from "@/types";
import { createInputSanitizer } from "@/utils/Formatting";

export const useSanitizedInput = (config: SanitizerConfig) => {
  const sanitizer = createInputSanitizer(config);

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      e.currentTarget.value = sanitizer(e.currentTarget.value);
    },
    [sanitizer],
  );

  return { handleInput };
};
