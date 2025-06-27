import { AppImage } from "@/components";

const ShowcaseImage = () => {
  const unsplashUrl =
    "https://images.unsplash.com/photo-1750101272014-88d4acf3da24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA==";

  return (
    <div className="flex flex-wrap gap-6 p-6 rounded-xl">
      {/* Default size (sm) */}
      <div className="flex flex-col items-center">
        <AppImage imageUrl={unsplashUrl} size="sm" />
        <span className="mt-2 text-sm">Size: sm</span>
      </div>

      {/* Medium size with rounded-2xl */}
      <div className="flex flex-col items-center">
        <AppImage imageUrl={unsplashUrl} size="md" rounded="rounded-2xl" />
        <span className="mt-2 text-sm">Size: md, rounded-2xl</span>
      </div>

      {/* Large size with rounded-none */}
      <div className="flex flex-col items-center">
        <AppImage imageUrl={unsplashUrl} size="lg" rounded="rounded-none" />
        <span className="mt-2 text-sm">Size: lg, no rounding</span>
      </div>

      {/* Custom width/height override */}
      <div className="flex flex-col items-center">
        <AppImage
          imageUrl={unsplashUrl}
          width={120}
          height={80}
          rounded="rounded-2xl"
        />
        <span className="mt-2 text-sm">Custom 120×80</span>
      </div>

      {/* Image with fallback (broken URL) */}
      <div className="flex flex-col items-center">
        <AppImage imageUrl="https://broken-url.xyz/not-found.jpg" size="md" />
        <span className="mt-2 text-sm">Fallback image (broken URL)</span>
      </div>
    </div>
  );
};

export default ShowcaseImage;
