import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// Добавил по уму алиасы
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@types": path.resolve(__dirname, "src/types"),
			"@components": path.resolve(__dirname, "src/components"),
		},
	},
});
