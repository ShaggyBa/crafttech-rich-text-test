import { createContext, useMemo, useRef, type ReactNode, type FC } from "react";

import { IControlContext } from "@/types/interfaces/Control/IControlContext";

export const ControlContext = createContext<IControlContext | undefined>(
  undefined
);

export const ControlProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const selectedControl = useRef<string>("");
  const memoRef = useMemo(() => {
    return { selectedControl };
  }, [selectedControl]);

  return (
    <ControlContext.Provider value={memoRef}>
      {children}
    </ControlContext.Provider>
  );
};
