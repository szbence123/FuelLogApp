import { Dimensions, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { styles } from "../styles/global";
import { useQuery } from "react-query";
import { getAllFuelPricesForChart } from "../db/fuelinfo";
import { H1, ScrollView, YStack } from "tamagui";
import moment from "moment";
import YearSelector from "./yearSelector";
import { useEffect, useState } from "react";

export default function Charts({ route, selectedYear }) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getAllFuelInfo"],
    queryFn: async () => {
      let cc = await getAllFuelPricesForChart(route.params.carId, selectedYear);
      console.log(cc);
      return cc;
    }
  });

  useEffect(() => {
    refetch();
  }, [selectedYear]);
  return (
    <ScrollView>
      <YStack padding={10} width="100%">
        <H1>Tankolások</H1>
        <ScrollView horizontal>
          <LineChart
            data={{
              labels:
                data && selectedYear
                  ? data.map((fi) => moment(fi.date).format("MM-DD"))
                  : [],
              datasets: [
                {
                  data:
                    data && selectedYear
                      ? data.map((fi) => fi.price / 1000)
                      : []
                }
              ]
            }}
            width={Dimensions.get("window").width} // from react-native
            height={220}
            yAxisLabel=""
            yAxisSuffix="k Ft"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "white",
              backgroundGradientFrom: "white",
              backgroundGradientTo: "white",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => styles.primary.backgroundColor,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {},
              propsForDots: {
                r: "3",
                strokeWidth: "1",
                stroke: "none"
              }
            }}
            bezier
            style={{
              marginVertical: 8
            }}
          />
        </ScrollView>
      </YStack>
    </ScrollView>
  );
}
