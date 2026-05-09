import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Garante que caminhos de assets sejam relativos para evitar erros 404 em hospedagens
})
