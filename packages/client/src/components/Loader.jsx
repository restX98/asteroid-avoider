import { useEffect, Suspense } from "react";
import { useProgress, Html } from "@react-three/drei";

import { Progress } from "@/components/ui/progress";
import { AsteroidIcon } from "@/components/icons/AsteroidIcon";

const ProgressBar = ({ progress }) => {
  return (
    <Html
      fullscreen={true}
      className="flex flex-col justify-center items-center gap-y-5"
    >
      <div className="flex lg:gap-x-3 md:gap-x-3 gap-x-2 lg:text-4xl md:text-4xl text-2xl">
        <AsteroidIcon
          className="lg:h-10 md:h-10 h-8"
          fillColor="#4A4A4A"
          strokeColor="black"
        />
        <span className="text-nowrap">ASTEROID AVOIDER</span>
        <AsteroidIcon
          className="lg:h-10 md:h-10 h-8"
          fillColor="#4A4A4A"
          strokeColor="black"
        />
      </div>
      <Progress value={progress} className="lg:w-1/3 md:w-2/3 w-4/5" />
    </Html>
  );
};

const Loader = ({ children, setIsLoaded }) => {
  const { progress } = useProgress();

  useEffect(() => {
    if (progress >= 100) {
      setIsLoaded(true);
    }
  }, [progress]);

  return (
    <Suspense fallback={<ProgressBar progress={progress} />}>
      {children}
    </Suspense>
  );
};

export default Loader;
