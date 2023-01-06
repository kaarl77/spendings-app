import React from 'react'
import {StyleSheet, View, ViewStyle} from "react-native";
import {useVanguardTheme} from "../../theming/colors/useVanguardTheme";
import {Spacings} from "../../theming/spacings/Spacings";
import Constants from 'expo-constants';

interface Props {
  styleProp?: ViewStyle;
  children: React.ReactNode;
  hasSafePadding?: boolean
}

export function Screen(props: Props) {
  const {styleProp, children, hasSafePadding = true} = props;
  /**
   * Styles
   */
  const {PaletteNeutral} = useVanguardTheme()

  const contentStyle = {
    ...styles.content,
    ...styleProp,
  }
  const containerStyle = {
    backgroundColor: PaletteNeutral["100"],
    ...styles.container,
    paddingTop: hasSafePadding ? Constants.statusBarHeight : 0,
  }

  return <View style={containerStyle}>
    <View style={contentStyle}>
      {children}
    </View>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacings["--3x"],
  }
})