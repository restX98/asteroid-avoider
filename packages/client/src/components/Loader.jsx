import { useEffect, Suspense } from "react";
import { useProgress, Html } from "@react-three/drei";

import { Progress } from "@/components/ui/progress";

const ProgressBar = ({ progress }) => {
  return (
    <Html fullscreen={true} className="flex justify-center items-center">
      <Progress value={progress} className="lg:w-1/3 md:w-2/3 w-4/5" />
    </Html>
  );
};

function Loader({ children, setIsLoaded }) {
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
}

export default Loader;
