import React from 'react'
import {SafeAreaView, ViewStyle, StyleSheet, View} from "react-native";

interface Props {
    styleProp?: ViewStyle;
    children: React.ReactNode;
}

export function Screen(props: Props) {
    const {styleProp, children} = props;
    /**
     * Styles
     */

    const style = {
        ...styles.content,
        ...styleProp,
    }

    return <SafeAreaView style={styles.container}>
        <View style={style}>
            {children}
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: "violet",
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
        backgroundColor: 'violet'
    }
})