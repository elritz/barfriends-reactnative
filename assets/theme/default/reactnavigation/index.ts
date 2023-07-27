import { DarkStyledTheme, LightStyledTheme } from "../styled";

export const LightReactNavigationTheme = {
  background: LightStyledTheme.palette.primary.background,
  primary: LightStyledTheme.palette.company.primary,
  card: LightStyledTheme.palette.secondary.background,
  text: LightStyledTheme.palette.primary.color,
  border: LightStyledTheme.palette.primary.color,
  notification: LightStyledTheme.palette.company.tertiary,
} as const;

export const DarkReactNavigationTheme = {
  background: DarkStyledTheme.palette.primary.background,
  primary: DarkStyledTheme.palette.company.primary,
  card: DarkStyledTheme.palette.secondary.background,
  text: DarkStyledTheme.palette.primary.color,
  border: DarkStyledTheme.palette.primary.color,
  notification: DarkStyledTheme.palette.company.tertiary,
} as const;
