import {
  Button,
  Input,
  ScrollView,
  SizableText,
  Tabs,
  Text,
  View,
  XStack,
  YStack
} from "tamagui";
import FuelList from "../components/fuelList";
import { styles } from "../styles/global";
import { useState } from "react";
import Charts from "../components/chart";
import YearSelector from "../components/yearSelector";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { Filter } from "@tamagui/lucide-icons";

export default function FuelInfosPage({ route }) {
  const [selected, setSelected] = useState("tab1");
  const [showStartDatePicker, setStartShowDatePicker] = useState(false);
  const [showEndDatePicker, setEndShowDatePicker] = useState(false);

  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [startDate, setStartDate] = useState(
    new Date(parseInt(selectedYear), 0, 1)
  );
  const [endDate, setEndDate] = useState(
    new Date(parseInt(selectedYear), 11, 31)
  );
  const openStartPicker = () => {
    setStartShowDatePicker(true);
  };
  const openEndPicker = () => {
    setEndShowDatePicker(true);
  };

  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setEndDate(currentDate);
    setEndShowDatePicker(false);
  };

  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartDate(currentDate);
    setStartShowDatePicker(false);
  };

  return (
    <View>
      <Tabs
        defaultValue="tab1"
        flexDirection="column"
        orientation="horizontal"
        width="100%"
        borderWidth="$0.25"
        borderColor="$borderColor"
        padding={10}
      >
        <YStack paddingBottom={10} gap={5}>
          <XStack gap={10}>
            <Tabs.List>
              <Tabs.Tab
                onPress={() => setSelected("tab1")}
                backgroundColor={
                  selected === "tab1" ? styles.primary.backgroundColor : "unset"
                }
                value="tab1"
              >
                <SizableText color={selected === "tab1" ? "white" : "black"}>
                  Lista
                </SizableText>
              </Tabs.Tab>
              <Tabs.Tab
                onPress={() => setSelected("tab2")}
                backgroundColor={
                  selected === "tab2" ? styles.primary.backgroundColor : "unset"
                }
                value="tab2"
              >
                <SizableText color={selected === "tab2" ? "white" : "black"}>
                  Diagram
                </SizableText>
              </Tabs.Tab>
            </Tabs.List>
            <YearSelector
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          </XStack>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onStartChange}
              accentColor={styles.primary.backgroundColor}
            />
          )}
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={onEndChange}
              accentColor={styles.primary.backgroundColor}
            />
          )}
          <XStack
            gap={10}
            alignItems="center"
            justifyContent="space-between"
            height={60}
          >
            <YStack flex={1}>
              <Button height={20} icon={Filter}>
                Kezdődátum:
              </Button>
              <Input
                flex={1}
                value={moment(startDate).format("YYYY-MM-DD")}
                onPressIn={() => openStartPicker()}
              />
            </YStack>
            <YStack flex={1}>
              <Button height={20} icon={Filter}>
                Végdátum:
              </Button>
              <Input
                flex={1}
                value={moment(endDate).format("YYYY-MM-DD")}
                onPressIn={() => openEndPicker()}
              />
            </YStack>
          </XStack>
        </YStack>

        <Tabs.Content value="tab1">
          <ScrollView>
            <FuelList
              start={moment(startDate).format("YYYY-MM-DD")}
              end={moment(endDate).format("YYYY-MM-DD")}
              selectedYear={selectedYear}
              route={route}
            />
          </ScrollView>
        </Tabs.Content>
        <Tabs.Content value="tab2">
          <ScrollView>
            <Charts selectedYear={selectedYear} route={route} />
          </ScrollView>
        </Tabs.Content>
      </Tabs>
    </View>
  );
}
