import { Fuel, Plus, Save, X } from "@tamagui/lucide-icons";
import {
  Button,
  Dialog,
  Fieldset,
  Input,
  Select,
  Separator,
  XStack,
  YStack
} from "tamagui";
import { useState } from "react";
import { insertCar } from "../db/cars";
import { styles } from "../styles/global";
import Modal from "./modal";
import { View } from "react-native";
import SelectMenu from "./select";
import { SelectItem } from "../typedefs/props";
import { useQuery } from "react-query";
import { getAllFuelTypes } from "../db/fuelTypes";
import { FuelType } from "../typedefs/fuelTypes";
import LoadingCard from "./loadingCard";

export default function AddCarPage({ refetch, last = false, isEdit = false }) {
  const [carName, setCarName] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState();

  const addCar = () => {
    if (carName != "" && regNumber != "" && selectedFuelType) {
      insertCar(carName, regNumber, selectedFuelType);
      refetch();
    } else {
      alert("Nem lehet üres");
    }
  };

  const { data: fuelTypes, isLoading } = useQuery<FuelType[]>({
    queryKey: "fuelTypes",
    queryFn: async (): Promise<FuelType[]> => {
      return await getAllFuelTypes();
    }
  });

  return (
    <Modal
      title="Autó hozzáadása"
      openBtn={
        <Button
          margin="auto"
          size={80}
          alignSelf="center"
          icon={Plus}
          backgroundColor={styles.primary.backgroundColor}
          color={styles.primary.color}
          borderRadius={30}
          height={50}
          width={50}
        />
      }
      body={
        !isLoading ? (
          <View>
            <YStack gap={10}>
              <Fieldset horizontal>
                <Input
                  onChangeText={setCarName}
                  flex={1}
                  id="name"
                  placeholder="Név"
                />
              </Fieldset>
              <Fieldset horizontal>
                <Input
                  onChangeText={setRegNumber}
                  flex={1}
                  id="regNumber"
                  placeholder="Rendszám"
                />
              </Fieldset>
              <Fieldset horizontal>
                <SelectMenu
                  selected={selectedFuelType}
                  setSelected={setSelectedFuelType}
                  title="Alapértelmezett üzemanyag"
                  items={fuelTypes.map((f: FuelType): SelectItem => {
                    return {
                      value: f.id.toString(),
                      name: f.name,
                      icon: (
                        <Select.Icon
                          borderRadius={40}
                          backgroundColor={f.color}
                          padding={5}
                        >
                          <Fuel color="white" />
                        </Select.Icon>
                      )
                    };
                  })}
                />
              </Fieldset>
            </YStack>
            <Separator margin={30} />
            <XStack alignSelf="flex-end" gap={4}>
              <Dialog.Close displayWhenAdapted asChild>
                <Button theme="active" aria-label="Close">
                  Mégsem
                </Button>
              </Dialog.Close>
              <Dialog.Close displayWhenAdapted asChild>
                <Button
                  onPress={addCar}
                  icon={Save}
                  theme="active"
                  aria-label="Close"
                  style={styles.primary}
                >
                  Mentés
                </Button>
              </Dialog.Close>
            </XStack>
          </View>
        ) : (
          <LoadingCard />
        )
      }
    />
  );
}
