import { bfsCompanyColors } from '@constants/theme/barfriends'
import * as colors from '@constants/theme/colors'
import { DefaultTheme } from 'styled-components/native'
import { darkCompanyColors, lightCompanyColors } from "../colors";

export const LightStyledTheme: DefaultTheme = {
  theme: "light",
  palette: {
    bfscompany: {
      ...bfsCompanyColors,
    },
    company: {
      ...lightCompanyColors,
    },
    background: {
      paper: colors.grey[50],
    },
    primary: {
      background: colors.grey[200],
      color: colors.grey[700],
    },
    secondary: {
      background: colors.grey[300],
      color: colors.grey[600],
    },
    tertiary: {
      background: colors.grey[300],
      color: colors.grey[600],
    },
  },
} as const;

export const DarkStyledTheme: DefaultTheme = {
  theme: "dark",
  palette: {
    bfscompany: {
      ...bfsCompanyColors,
    },
    company: {
      ...darkCompanyColors,
    },
    background: {
      paper: colors.grey[900],
    },
    primary: {
      background: colors.grey[900],
      color: colors.grey[300],
    },
    secondary: {
      background: colors.grey[800],
      color: colors.grey[300],
    },
    tertiary: {
      background: colors.grey[300],
      color: colors.grey[800],
    },
  },
} as const;
