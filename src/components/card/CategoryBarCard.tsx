import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Card from "../../components/card/Card";
import ThemedText from "../../components/text/ThemedText";

import { BarChart } from "react-native-chart-kit";
import { useTheme } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;

interface CategoryBarCardProps {
    title?: string;
}


const CategoryBarCard: React.FC<CategoryBarCardProps> = ({
    title = "Expenses by Category",
}) => {
    const { colors } = useTheme();
    const data = {
        labels: ["Food", "Rent", "Shop", "Tran"],
        datasets: [
            {
                data: [300, 1200, 450, 180],
            },
        ],
    };

    return (
        <Card style={{ flexDirection: 'column' }}>
            <ThemedText style={styles.title}>{title}</ThemedText>

            <BarChart
                style={{ marginVertical: 8, backgroundColor: "transparent" }}
                data={data}
                width={screenWidth - 60}
                height={220}
                chartConfig={{
                    //  backgroundColor: "#e26a00",
                    backgroundGradientFrom: colors.card,
                    backgroundGradientTo: colors.card,
                    fillShadowGradient: "#4f8ef7",
                    fillShadowGradientOpacity: 1,
                    color: () => `rgba(79, 142, 247, 1)`,
                    barPercentage: 0.8,
                    propsForBackgroundLines: {
                        strokeWidth: 0, // <-- hides grid lines
                    },
                }}
                fromZero
                showValuesOnTopOfBars
            />
        </Card>
    );
};

export default CategoryBarCard;

const styles = StyleSheet.create({

    title: {
        fontSize: 16,
        fontWeight: "700",
        marginBottom: 12,
    },
});
