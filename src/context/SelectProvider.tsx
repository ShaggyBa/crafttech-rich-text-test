import { createContext, useMemo, useRef, type ReactNode, type FC } from 'react';

import type { ISelectedContextType } from '@/types/interfaces/ISelectedContext';


export const SelectedContext = createContext<ISelectedContextType | undefined>(
	undefined,
);

export const SelectedProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const selectetedElementsRef = useRef<string[]>([]);
	const memoRef = useMemo(() => {
		return { selectetedElementsRef };
	}, [selectetedElementsRef]);

	return (
		<SelectedContext.Provider value={memoRef}>
			{children}
		</SelectedContext.Provider>
	);
};
