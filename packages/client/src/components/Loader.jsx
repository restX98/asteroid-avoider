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
      <div className="flex gap-x-3 text-4xl">
        <AsteroidIcon
          className="h-10"
          fillColor="#4A4A4A"
          strokeColor="black"
        />
        <span>ASTEROID AVOIDER</span>
        <AsteroidIcon
          className="h-10"
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
