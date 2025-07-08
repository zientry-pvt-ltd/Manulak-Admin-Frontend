import { useEffect, useRef, useState } from "react";

import { AppInput } from "@/components";
import type {
  EditableCellProps,
  ISelectOption,
} from "@/features/table/types/appConfig.type";

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
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<any>(getValue());
  const [multipleValue, setMultipleValue] =
    useState<ISelectOption[]>(getValue());
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setValue(getValue());
  }, [getValue]);

  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const removeItem = async (itemToRemove: ISelectOption) => {
    const newValue = multipleValue.filter(
      (item: ISelectOption) => item.value !== itemToRemove.value,
    );
    setMultipleValue(newValue);
    updateData(rowIndex, columnId, newValue);

    if (onSave) {
      setIsLoading(true);
      try {
        await onSave(itemToRemove);
      } catch (error) {
        console.error("Failed to remove item:", error);
        setMultipleValue(getValue());
        updateData(rowIndex, columnId, getValue());
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleAddItem = (selectedValue: ISelectOption) => {
    if (!multipleValue.includes(selectedValue)) {
      const newValue = [...multipleValue, selectedValue];
      setMultipleValue(newValue);
      updateData(rowIndex, columnId, newValue);
      onSave?.(selectedValue);
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
        {multipleValue?.map((item: any, i: number) => (
          <span
            key={i}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-100 rounded-full"
          >
            {item.label || item}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeItem(item);
              }}
              className="text-red-500 hover:text-red-700 cursor-pointer"
            >
              ×
            </button>
          </span>
        ))}

        {isEditing && (
          <div className="relative w-32">
            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="text-sm border px-2 py-1 w-full rounded"
              onBlur={() => setIsEditing(false)}
            />
            <div className="absolute left-0 right-0 bg-white shadow-md border rounded-md z-50 max-h-60 overflow-y-auto mt-1">
              {options
                .filter((option) =>
                  option.label.toLowerCase().includes(inputValue.toLowerCase()),
                )
                .filter(
                  (option) =>
                    !multipleValue.some((item) => item.value === option.value),
                )
                .map((option) => (
                  <div
                    key={option.value}
                    className="p-3 cursor-pointer text-sm border-b last:border-b-0 transition-colors"
                    onMouseDown={() => handleAddItem(option)}
                  >
                    {option.label}
                  </div>
                ))}
            </div>
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
