import { Fuel, Save } from "@tamagui/lucide-icons";
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
import { styles } from "../styles/global";
import Modal from "./modal";
import { View } from "react-native";
import { useState } from "react";
import { insertFuelInfo } from "../db/fuelinfo";
import moment from "moment";
import SelectMenu from "./select";
import { FuelType } from "../typedefs/fuelTypes";
import { getAllFuelTypes } from "../db/fuelTypes";
import { useQuery } from "react-query";
import { SelectItem } from "../typedefs/props";
import LoadingCard from "./loadingCard";

export function FuelLog({ carId, fuelTypeId }) {
  return <AddFuelLog carId={carId} fuelTypeId={fuelTypeId} />;
}

function AddFuelLog({ carId, fuelTypeId }) {
  const [km, setKm] = useState("");
  const [all_km, setAllKm] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedFuelType, setSelectedFuelType] = useState(
    fuelTypeId.toString()
  );

  const { data: fuelTypes, isLoading } = useQuery<FuelType[]>({
    queryKey: "fuelTypes",
    queryFn: async (): Promise<FuelType[]> => {
      return await getAllFuelTypes();
    }
  });

  const addFuelLog = async () => {
    insertFuelInfo(
      moment().format("YYYY-MM-DD HH:MM"),
      parseFloat(km),
      parseFloat(all_km),
      parseFloat(price),
      location,
      parseFloat(amount),
      parseInt(carId),
      parseFloat(selectedFuelType)
    );
  };

  return (
    <Modal
      title="Tankolás hozzáadása"
      openBtn={
        <Button
          style={styles.primary}
          width="100%"
          alignSelf="center"
          icon={Fuel}
        >
          Tankolás hozzáadása
        </Button>
      }
      body={
        !isLoading && fuelTypes ? (
          <View>
            <YStack gap={10}>
              <Fieldset horizontal>
                <SelectMenu
                  selected={selectedFuelType}
                  setSelected={setSelectedFuelType}
                  title="Üzemanyag típusa"
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
              <Fieldset horizontal>
                <Input
                  onChangeText={setPrice}
                  flex={1}
                  id="price"
                  placeholder="Fizetve (Ft)"
                />
              </Fieldset>
              <Fieldset horizontal>
                <Input
                  onChangeText={setAmount}
                  flex={1}
                  id="amount"
                  placeholder="Tankolt mennyiség"
                />
              </Fieldset>
              <Fieldset horizontal>
                <Input
                  onChangeText={setKm}
                  flex={1}
                  id="km"
                  placeholder="Km óra állás (nullázás óta)"
                />
              </Fieldset>
              <Fieldset horizontal>
                <Input
                  onChangeText={setAllKm}
                  flex={1}
                  id="allkm"
                  placeholder="Össz. km"
                />
              </Fieldset>
              <Fieldset horizontal>
                <Input
                  onChangeText={setLocation}
                  flex={1}
                  id="location"
                  placeholder="Tankolás helye"
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
                  onPress={() => addFuelLog()}
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
