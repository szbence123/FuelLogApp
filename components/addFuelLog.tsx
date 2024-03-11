import { Fuel, Plus, Save, X } from "@tamagui/lucide-icons";
import {
  Adapt,
  Button,
  Dialog,
  Fieldset,
  Input,
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

export function FuelLog({ carId }) {
  return <AddFuelLog carId={carId} />;
}

function AddFuelLog({ carId }) {
  const [km, setKm] = useState("");
  const [all_km, setAllKm] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [amount, setAmount] = useState("");

  const addFuelLog = async () => {
    insertFuelInfo(
      moment().format("YYYY-MM-DD HH:MM"),
      parseFloat(km),
      parseFloat(all_km),
      parseFloat(price),
      location,
      parseFloat(amount),
      parseInt(carId)
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
        <View>
          <YStack gap={10}>
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
      }
    />
  );
}
