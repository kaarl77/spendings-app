import {useColorScheme} from "react-native";
import {ColorType, Palette, PaletteShade, Theme} from "./Colors";

const Colors: ColorType = {
  [Theme.light]: {
    [Palette.neutral]: {
      [PaletteShade._100]: "#fcfcfc",
      [PaletteShade._200]: "#E8E8E8",
      [PaletteShade._300]: "#D0D0D0",
      [PaletteShade._400]: "#B4B4B4",
      [PaletteShade._500]: "#949494",
      [PaletteShade._600]: "#6A6A6A",
      [PaletteShade._700]: "#5E5E5E",
      [PaletteShade._800]: "#525252",
      [PaletteShade._900]: "#434343",
      [PaletteShade._1000]: "#2F2F2F",
    },
    [Palette.primary]: {
      [PaletteShade._100]: "#F3F2FA",
      [PaletteShade._200]: "#ffffff",
      [PaletteShade._300]: "#ffffff",
      [PaletteShade._400]: "#AAA8E1",
      [PaletteShade._500]: "#837FD6",
      [PaletteShade._600]: "#4940CB",
      [PaletteShade._700]: "#4139B5",
      [PaletteShade._800]: "#38319D",
      [PaletteShade._900]: "#2E2880",
      [PaletteShade._1000]: "#201C5A",
    }
  },
  [Theme.dark]: {
    [Palette.neutral]: {
      [PaletteShade._100]: "#fcfcfc",
      [PaletteShade._200]: "#E8E8E8",
      [PaletteShade._300]: "#D0D0D0",
      [PaletteShade._400]: "#B4B4B4",
      [PaletteShade._500]: "#949494",
      [PaletteShade._600]: "#6A6A6A",
      [PaletteShade._700]: "#5E5E5E",
      [PaletteShade._800]: "#525252",
      [PaletteShade._900]: "#434343",
      [PaletteShade._1000]: "#2F2F2F",
    },
    [Palette.primary]: {
      [PaletteShade._100]: "#F3F2FA",
      [PaletteShade._200]: "#ffffff",
      [PaletteShade._300]: "#ffffff",
      [PaletteShade._400]: "#AAA8E1",
      [PaletteShade._500]: "#837FD6",
      [PaletteShade._600]: "#4940CB",
      [PaletteShade._700]: "#4139B5",
      [PaletteShade._800]: "#38319D",
      [PaletteShade._900]: "#2E2880",
      [PaletteShade._1000]: "#201C5A",
    }
  },
}


export function useVanguardTheme() {
  const scheme = useColorScheme();
  if (scheme === "light") {
    return Colors.ThemeLight;
  }
  return Colors.ThemeDark;

}