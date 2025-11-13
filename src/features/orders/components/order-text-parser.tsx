import { ClipboardPaste, Send } from "lucide-react";
import { useState } from "react";

import { AppButton, AppTextarea } from "@/components";

interface OrderItem {
  product: string;
  quantity: number;
  notes?: string;
}

interface ParsedOrder {
  items: OrderItem[];
  customerInfo?: string;
  totalItems: number;
}

export const OrderTextParser = () => {
  const [textMessage, setTextMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const parseTextMessage = (text: string): ParsedOrder => {
    const lines = text.split("\n").filter((line) => line.trim());
    const items: OrderItem[] = [];
    let customerInfo = "";

    lines.forEach((line) => {
      const match = line.match(/(\d+)\s*[x×]?\s*(.+?)(?:\s*[-–]\s*(.+))?$/i);

      if (match) {
        const quantity = parseInt(match[1]);
        const product = match[2].trim();
        const notes = match[3]?.trim();

        items.push({ product, quantity, notes });
      } else if (
        line.toLowerCase().includes("name:") ||
        line.toLowerCase().includes("customer:")
      ) {
        customerInfo = line;
      }
    });

    return {
      items,
      customerInfo,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    };
  };

  const handleSubmit = async () => {
    if (!textMessage.trim()) {
      setError("Please enter your order message");
      return;
    }

    setIsProcessing(true);
    setError("");

    setTimeout(() => {
      try {
        const parsed = parseTextMessage(textMessage);

        if (parsed.items.length === 0) {
          setError(
            'No items found. Try format like: "2x Pizza" or "3 Burgers"',
          );
        } else {
          setError("");
        }
      } catch (e) {
        setError("Failed to parse order. Please check your format.");
        console.error("Error parsing order:", e);
      }
      setIsProcessing(false);
    }, 800);
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTextMessage((prev) => prev + (prev ? "\n" : "") + text);
    } catch {
      setError("Failed to read clipboard. Please allow clipboard access.");
    }
  };

  return (
    <div className="w-full">
      <AppTextarea
        fullWidth
        value={textMessage}
        onChange={(e) => setTextMessage(e.target.value)}
        placeholder="Example:&#10;2x Margherita Pizza&#10;3 Coke - cold&#10;1x Garlic Bread&#10;&#10;Name: John Doe"
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
          disabled={isProcessing}
          variant="default"
          size="lg"
          Icon={Send}
          fullWidth
          isLoading={isProcessing}
        >
          Parse Order
        </AppButton>
      </div>
    </div>
  );
};
