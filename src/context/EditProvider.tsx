import { createContext, useMemo, useRef, type ReactNode, type FC } from 'react';

import { IEditContext } from '@/types/interfaces/IEditContext';


export const EditContext = createContext<IEditContext | undefined>(
	undefined,
);

export const EditProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const editedCanvasElement = useRef<string>("");
	const memoRef = useMemo(() => {
		return { editedCanvasElement };
	}, [editedCanvasElement]);

	return (
		<EditContext.Provider value={memoRef}>
			{children}
		</EditContext.Provider>
	);
};
