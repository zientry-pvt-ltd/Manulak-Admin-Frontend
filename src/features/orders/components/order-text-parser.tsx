import { ClipboardPaste, Send } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { AppButton, AppTextarea } from "@/components";
import { useCreateOrderByMessageMutation } from "@/services/orders";
import { normalizeError } from "@/utils/error-handler";

export const OrderTextParser = () => {
  const [textMessage, setTextMessage] = useState("");
  const [error, setError] = useState("");

  const [createOrderByMessage, { isLoading }] =
    useCreateOrderByMessageMutation();

  const handleSubmit = useCallback(async () => {
    if (!textMessage.trim()) {
      setError("Please enter your order message");
      return;
    }
    try {
      await createOrderByMessage({ orderMessage: textMessage }).unwrap();
      toast.success("Order created successfully");
      setTextMessage("");
      setError("");
    } catch (error) {
      const message = normalizeError(error);
      toast.error(message.message || "Failed to create order from message");
      console.error("Order creation error:", error);
    }
  }, [textMessage, createOrderByMessage]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextMessage(e.target.value);
      if (error) {
        setError("");
      }
    },
    [error],
  );

  const handlePaste = useCallback(async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTextMessage((prev) => prev + (prev ? "\n" : "") + text);
    } catch {
      setError("Failed to read clipboard. Please allow clipboard access.");
    }
  }, []);

  return (
    <div className="w-full">
      <AppTextarea
        fullWidth
        value={textMessage}
        onChange={handleChange}
        placeholder="Example:&#10;නම: Piyath&#10;ලිපිනය: 22, Read Avenue, Colombo&#10;දුරකථන අංකය: 0712617261&#10;තැපැල් කේතය: 11550&#10;ගෙවූ මුදල: 1776.95&#10;ගෙවූ දිනය: 2025-10-15&#10;SLIP අංකය: SLIP767612&#10;නිෂ්පාදන: 74a9eaee-fd46-4f68-8436-8806fc0cef84 x24"
        className="h-64 p-3 resize-none font-mono text-sm"
        label="Enter your order details"
        error={error}
      />

      <div className="mt-4 flex flex-col gap-y-4">
        <AppButton
          onClick={handlePaste}
          variant="outline"
          Icon={ClipboardPaste}
          fullWidth
          size="lg"
        >
          Paste
        </AppButton>
        <AppButton
          onClick={handleSubmit}
          disabled={isLoading}
          variant="default"
          size="lg"
          Icon={Send}
          fullWidth
          isLoading={isLoading}
        >
          Parse Order
        </AppButton>
      </div>
    </div>
  );
};
