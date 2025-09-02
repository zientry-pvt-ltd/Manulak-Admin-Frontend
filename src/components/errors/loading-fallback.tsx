import { AppLinearProgress } from "@/components";

const LoadingFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AppLinearProgress label="Loading..." />
    </div>
  );
};

export default LoadingFallback;
