import { makeVar } from "@apollo/client"
import { Code_FragmentFragment } from "@graphql/generated"

export enum MeReactiveVarient {
  Light = 'light',
  Dark = 'dark',
}

export type ColorSchemeName = 'light' | 'dark' | null | undefined


export const ThemeReactiveVar = makeVar<ColorSchemeName>(MeReactiveVarient.Dark)