/* eslint-disable no-unused-vars */
interface ColumnResizerProps {
  isResizing: boolean;
  onMouseDown: (event: React.MouseEvent) => void;
  onTouchStart: (event: React.TouchEvent) => void;
}

const ColumnResizer = ({
  isResizing,
  onMouseDown,
  onTouchStart,
}: ColumnResizerProps) => (
  <div
    className={`absolute right-0 top-0 h-full w-1 cursor-col-resize bg-gray-300 opacity-0 group-hover:opacity-100 ${
      isResizing ? "opacity-100 bg-blue-500" : ""
    }`}
    onMouseDown={onMouseDown}
    onTouchStart={onTouchStart}
  />
);

export default ColumnResizer;
