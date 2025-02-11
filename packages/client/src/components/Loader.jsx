import { Suspense } from "react";
import { useProgress, Html } from "@react-three/drei";
import { useEffect } from "react";

const ProgressBar = ({ progress }) => {
  return (
    <Html fullscreen={true} style={styles.container}>
      <div style={styles.progressBarContainer}>
        <div
          style={{
            width: `${progress}%`,
            ...styles.progressBar,
          }}
        />
      </div>
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

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContainer: {
    width: "30%",
    height: "0.5rem",
    backgroundColor: "#4a5568",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#3b82f6",
    transition: "width 0.2s",
  },
};

export default Loader;
