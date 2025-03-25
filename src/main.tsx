import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import './index.css'
import App from './App.tsx'
import { SelectedProvider } from '@context/SelectProvider.tsx'
import { EditProvider } from '@context/EditProvider.tsx'
import { store } from '@store/store.ts';
import { ControlProvider } from './context/ControlProvider.tsx';



createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<ControlProvider>
				<SelectedProvider>
					<EditProvider>
						<App />
					</EditProvider>
				</SelectedProvider>
			</ControlProvider>
		</Provider >
	</StrictMode>,
)
