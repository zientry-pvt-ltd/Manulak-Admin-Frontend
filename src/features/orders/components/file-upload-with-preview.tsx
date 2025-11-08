import { FileText, Image, X } from "lucide-react";
import React, { useRef } from "react";
import { toast } from "sonner";

import { AppButton, AppIconButton, AppText } from "@/components";

interface FileUploadWithPreviewProps {
  file: File | null;
  // eslint-disable-next-line no-unused-vars
  onFileChange: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
  maxSizeMB?: number;
  supportedFormatsText?: string;
  className?: string;
}

export const FileUploadWithPreview: React.FC<FileUploadWithPreviewProps> = ({
  file,
  onFileChange,
  accept = ".pdf,.jpg,.jpeg,.png",
  disabled = false,
  maxSizeMB,
  supportedFormatsText = "Supported formats: PDF, JPG, PNG",
  className = "",
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (maxSizeMB && selectedFile.size > maxSizeMB * 1024 * 1024) {
        toast.error(`File size exceeds ${maxSizeMB}MB limit`);
        return;
      }
      onFileChange(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number): string => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className={className}>
      {file ? (
        <div className="flex items-center justify-between rounded-md border p-2 max-w-xs">
          <div className="flex items-center space-x-3">
            {/* File Icon */}
            <div className="flex h-10 w-10 items-center justify-center bg-accent rounded-sm">
              {file.type.startsWith("image/") ? (
                <Image className="h-6 w-6 text-blue-500" />
              ) : (
                <FileText className="h-6 w-6 text-amber-500" />
              )}
            </div>

            <div className="flex flex-col">
              <AppText
                variant="caption"
                size="text-sm"
                className="w-52 truncate"
              >
                {file.name}
              </AppText>
              <AppText variant="caption" size="text-xs" color="muted">
                {formatFileSize(file.size)} MB
              </AppText>
            </div>
          </div>

          <AppIconButton
            Icon={X}
            onClick={handleRemoveFile}
            aria-label="Remove file"
            rounded="full"
            size="sm"
            variant={"outline"}
          />
        </div>
      ) : (
        <div className="h-36 border rounded-lg flex justify-center items-center flex-col">
          <input
            type="file"
            accept={accept}
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
            disabled={disabled}
          />
          <AppText variant="caption" size="text-xs">
            {supportedFormatsText}
          </AppText>
          <AppButton
            variant="outline"
            size="sm"
            className="m-2"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            Choose File
          </AppButton>
        </div>
      )}
    </div>
  );
};
