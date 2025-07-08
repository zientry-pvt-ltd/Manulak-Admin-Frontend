import { useEffect, useState } from "react";

import { AppInput } from "@/components";
import type { EditableCellProps } from "@/features/table/types/appConfig.type";

const EditableCell = <TData,>({
  getValue,
  rowIndex,
  columnId,
  updateData,
  onSave,
  type = "text",
  options = [],
  disabled = false,
}: EditableCellProps<TData>) => {
  const [value, setValue] = useState<any>(getValue());
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  const removeItem = async (itemToRemove: any) => {
    const newValue = value.filter((item: any) => item !== itemToRemove);
    setValue(newValue);
    updateData(rowIndex, columnId, newValue);

    if (onSave) {
      setIsLoading(true);
      try {
        await onSave(newValue);
      } catch (error) {
        console.error("Failed to remove item:", error);
        setValue(getValue());
        updateData(rowIndex, columnId, getValue());
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddItem = (selectedValue: any) => {
    if (!value.includes(selectedValue)) {
      const newValue = [...value, selectedValue];
      setValue(newValue);
      updateData(rowIndex, columnId, newValue);
      onSave?.(newValue);
    }
    setInputValue("");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const newValue =
      type === "number" ? Number(e.target.value) : e.target.value;
    setValue(newValue);
  };

  const handleBlur = async () => {
    if (value !== getValue()) {
      updateData(rowIndex, columnId, value);

      if (onSave) {
        setIsLoading(true);
        try {
          await onSave(value);
        } catch (error) {
          console.error("Failed to save:", error);
          // Revert on error
          setValue(getValue());
          updateData(rowIndex, columnId, getValue());
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  // If disabled, just show the value as text
  if (disabled) {
    return <span className="text-sm">{String(value)}</span>;
  }

  if (type === "multi-select") {
    return (
      <div
        className="min-h-[40px] flex flex-wrap gap-2 items-center"
        onClick={() => setIsEditing(true)}
      >
        {value?.map((item: any, i: number) => (
          <span
            key={i}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 rounded-full"
          >
            {item}
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent triggering edit mode
                removeItem(item);
              }}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </span>
        ))}

        {isEditing && (
          <div className="relative w-32">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-sm border px-2 py-1 w-full rounded"
              onBlur={() => setTimeout(() => setIsEditing(false), 200)}
            />
            {options
              .filter(
                (o) =>
                  o.label.toLowerCase().includes(inputValue.toLowerCase()) &&
                  !value.includes(o.value),
              )
              .slice(0, 5)
              .map((option) => (
                <div
                  key={option.value}
                  className="absolute left-0 right-0 bg-white border border-t-0 shadow-sm cursor-pointer text-sm px-2 py-1 hover:bg-blue-100 z-10"
                  onMouseDown={() => handleAddItem(option.value)}
                >
                  {option.label}
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }

  if (type === "select") {
    return (
      <select
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLoading}
        className="w-full p-1 border rounded text-sm"
      >
        <option value="">Select...</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <AppInput
      size="sm"
      type={type}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
      disabled={isLoading}
      className={isLoading ? "opacity-50" : ""}
    />
  );
};

export default EditableCell;
