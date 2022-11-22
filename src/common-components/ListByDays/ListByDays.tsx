import {FlatList} from "react-native";
import {Transaction} from "../../custom-types/Transaction";

interface Props {
    transactions: Transaction[];

}
//
// export function ListByDays(props:Props){
//     const {transactions} = props;
//     return(
//         <FlatList data={transactions} renderItem={}/>
//     )
// }