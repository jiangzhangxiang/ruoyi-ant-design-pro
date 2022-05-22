import { defineConfig } from 'umi';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  define: {
    REACT_APP_ENV: REACT_APP_ENV || 'dev',
  },
});
