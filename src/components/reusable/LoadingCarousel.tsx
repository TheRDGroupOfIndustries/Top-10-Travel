import { CarouselItem } from "../ui/carousel";
import { Skeleton } from "../ui/skeleton";

const LoadingCarousel = () => {
  // must be used withint a carousel
  return (
    <>
      <div className="md:flex block m-auto">
        {Array.from({ length: 3 }).map((_, ind) => (
          <CarouselItem
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 m-auto"
            key={`loader-${ind}`}
          >
            <Skeleton className="w-[300px] h-[400px] rounded-xl bg-gray-400" />
          </CarouselItem>
        ))}
      </div>
    </>
  );
};
export default LoadingCarousel;
