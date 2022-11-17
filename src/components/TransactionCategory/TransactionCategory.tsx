import {TimePeriod} from "../../common-components/TimePeriod/TimePeriodSelector";
import {Transaction} from "../../custom-types/Transaction";
import {Text} from "../../vanguard/Text/Text";
import {useEffect, useState} from "react";
import {StyleSheet, View} from "react-native";
import {Category} from "../../custom-types/Category";
import {Spacer} from "../../vanguard/Spacer/Spacer";

interface Props {
    timePeriod: TimePeriod;
    transactions: Transaction[];
    totalSpent: number;
    totalOnPeriodChange: (resetValue: number) => void;
    nrOfCategories: number;
    categories: Category[];

}

export function TransactionCategory(props: Props) {
    const {timePeriod, transactions, totalSpent, totalOnPeriodChange, nrOfCategories, categories} = props;
    let x = 0;
    for (const element of transactions) {
        x += element.value;
    }
    totalOnPeriodChange(Number.parseFloat(Number.parseFloat(x.toString()).toFixed(2)));

    let categoriesTotalValues = new Array<number>(nrOfCategories);
    for (let i = 0; i < transactions.length; i++) {
        categoriesTotalValues[i] = 0;
    }
    //console.log(categoriesTotalValues);
    for (let i = 0; i < transactions.length; i++) {
        categoriesTotalValues[transactions[i].categoryId] += transactions[i].value;
    }

    let max1 = 0, max2 = 0, max3 = 0;
    let indexOfMax1 = 0, indexOfMax2 = 0, indexOfMax3 = 0;
    const categoriesCopy = categoriesTotalValues;

    max1 = Math.max(...categoriesCopy);
    indexOfMax1 = categoriesCopy.findIndex((nr) => nr === max1);
    let globalIndexofMax1 = categoriesTotalValues.findIndex((nr) => nr===max1);
    const NameOfCategoryMax1: string = categories[globalIndexofMax1].name;
    categoriesCopy.splice(indexOfMax1, 1);


    max2 = Math.max(...categoriesCopy);
    indexOfMax2 = categoriesCopy.findIndex((nr) => nr === max2);
    let globalIndexofMax2 = categoriesTotalValues.findIndex((nr) => nr===max2);
    const NameOfCategoryMax2: string = categories[globalIndexofMax2].name;
    categoriesCopy.splice(indexOfMax2, 1);

    max3 = Math.max(...categoriesCopy);
    indexOfMax3 = categoriesCopy.findIndex((nr) => nr === max3);
    let globalIndexofMax3 = categoriesTotalValues.findIndex((nr) => nr===max3);
    const NameOfCategoryMax3: string = categories[globalIndexofMax3].name;
    categoriesCopy.splice(indexOfMax3, 1);


    return (
        <View>
            <View style={styles.category}>
                <View>
                    <Text styleProp={styles.text}>{NameOfCategoryMax1}</Text>
                    <Text styleProp={styles.text}>{max1}</Text>
                </View>
            </View>
            <Spacer height={24}/>

            <View style={styles.category}>
                <View>
                    <Text styleProp={styles.text}>{NameOfCategoryMax2}</Text>
                    <Text styleProp={styles.text}>{max2}</Text>
                </View>
            </View>
            <Spacer height={24}/>

            <View style={styles.category}>
                <View>
                    <Text styleProp={styles.text}>{NameOfCategoryMax3}</Text>
                    <Text styleProp={styles.text}>{max3}</Text>
                </View>
            </View>
            <Spacer height={24}/>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        //backgroundColor: "violet",
    },
    category: {
        backgroundColor: "white",
        alignItems: "flex-start",
        position: "relative",
        flexDirection: "row",
        padding: 8,
        gap: 16,
    },
    percentage: {},
    text: {
        width: 241,
        height: 24,
        marginLeft: 64,
    }

})