import { useRef, useEffect } from "react";

const Disposable = ({ children }) => {
  const localRef = useRef();

  useEffect(() => {
    return () => {
      localRef?.current?.traverse((child) => {
        if (child.isMesh) {
          child.geometry.dispose();
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => mat.dispose());
          } else {
            child.material.dispose();
          }
        }
      });
    };
  }, [localRef]);

  return <group ref={localRef}>{children}</group>;
};

export default Disposable;
