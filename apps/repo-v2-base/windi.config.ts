import { defineConfig } from 'vite-plugin-windicss';
import colors from 'windicss/colors';

export default defineConfig({
  theme: {
    // 响应式布局断点
    extend: {
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1600px',
      },
      colors: {
        gray: colors.coolGray,
        blue: colors.sky,
        red: colors.rose,
        pink: colors.fuchsia,
      },
    },
    // plugins: [
    //   plugin(({ addComponents }) => {
    //     const buttons = {
    //       '.btn': {
    //         padding: '.5rem 1rem',
    //         borderRadius: '.25rem',
    //         fontWeight: '600',
    //       },
    //       '.btn-blue': {
    //         backgroundColor: '#3490dc',
    //         color: '#fff',
    //         '&:hover': {
    //           backgroundColor: '#2779bd',
    //         },
    //       },
    //       '.btn-red': {
    //         backgroundColor: '#e3342f',
    //         color: '#fff',
    //         '&:hover': {
    //           backgroundColor: '#cc1f1a',
    //         },
    //       },
    //     };
    //     addComponents(buttons);
    //   }),
    // ],
  },
});
