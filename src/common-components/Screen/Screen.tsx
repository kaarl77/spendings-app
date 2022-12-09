import React from 'react'
import {Platform, SafeAreaView, StyleSheet, View, ViewStyle} from "react-native";
import {useVanguardTheme} from "../../theming/colors/useVanguardTheme";
import {Spacings} from "../../theming/spacings/Spacings";

interface Props {
  styleProp?: ViewStyle;
  children: React.ReactNode;
}

export function Screen(props: Props) {
  const {styleProp, children} = props;
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
  }

  return <SafeAreaView style={containerStyle}>
    <View style={contentStyle}>
      {children}
    </View>
  </SafeAreaView>
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