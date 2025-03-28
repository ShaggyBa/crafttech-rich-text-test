import {
  createContext,
  useMemo,
  type ReactNode,
  type FC,
  useState,
} from "react";
import { ICanvasContext } from "@/types/interfaces/Canvas/ICanvasContext";
import { IShape } from "@/types/interfaces/Shape/IShape";

export const CanvasElementsContext = createContext<ICanvasContext | undefined>(
  undefined
);

export const CanvasElementsProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [figures, setFigures] = useState<IShape[]>([]); // Здесь сохраняем массив ID фигур, добавляем/удаляем их
  const memoRef = useMemo(() => {
    return { figures, setFigures };
  }, [figures]);

  return (
    <CanvasElementsContext.Provider value={memoRef}>
      {children}
    </CanvasElementsContext.Provider>
  );
};
