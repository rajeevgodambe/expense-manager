import commonStyles from "../../styles/commonStyles"
import NoData from '../../assets/svg/no_data.svg';
import ThemedText from "../text/ThemedText";
import { View } from "react-native";
import { FC } from "react";

interface EmptyProps {
    message: string
}

const Empty : React.FC<EmptyProps>  = ({message}) => {
    return (
        <View style={commonStyles.emptyContainer}>
            <NoData style={{width: 210, height: 210}} />
            <ThemedText style={commonStyles.emptyText}>{message}</ThemedText>
        </View>
    )
}

export {Empty}