import type { MantineColorsTuple } from '@mantine/core';
import {createTheme } from '@mantine/core';

const myColor: MantineColorsTuple = [ // grape color 
  '#ffeefe',
  '#f3ddf3',
  '#e1b9e1',
  '#d094cf',
  '#c173bf',
  '#b85fb6',
  '#b454b2',
  '#9e459d',
  '#8e3b8c',
  '#7d307b'
];

export const GRAPE_MANTINE_THEME = createTheme({
  colors: {
    myColor,
  },
  primaryColor: 'myColor',
});

