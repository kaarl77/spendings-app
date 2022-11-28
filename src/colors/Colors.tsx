export enum PaletteShade {
    _100 = "100",
    _200 = "200",
    _300 = "300",
    _400 = "400",
    _500 = "500",
    _600 = "600",
    _700 = "700",
    _800 = "800",
    _900 = "900",
    _1000 = "1000",
}
export type PaletteType = Record<PaletteShade, string>;

export enum Palette {
    neutral = "PaletteNeutral",
    primary = "PalettePrimary",
}
export type ThemeType = Record<Palette, PaletteType>;


export enum Theme {
    dark = "ThemeDark",
    light = "ThemeLight",
}

export type ColorType = Record<Theme, ThemeType>;

