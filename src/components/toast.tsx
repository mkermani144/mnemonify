"use client";

import { useTheme } from "next-themes";
import { Toaster } from "sonner";

export function Toast() {
  const theme = useTheme();
  return (
    <Toaster
      position="bottom-center"
      theme={(theme.theme as "light" | "dark" | "system") ?? "system"}
      toastOptions={{
        className: "!border-primary !text-primary",
      }}
    />
  );
}
