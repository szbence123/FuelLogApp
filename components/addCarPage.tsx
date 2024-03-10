import {Car, Fuel, Plus, Save, X} from '@tamagui/lucide-icons'
import {
    Adapt,
    Button, ButtonIcon,
    Dialog,
    Fieldset,
    Input,
    Label, Separator,
    Sheet,
    Unspaced,
    XStack, YStack,
} from 'tamagui'
import {useState} from "react";
import {insertCar} from "../db/cars";
import {styles} from "../styles/global";
import Modal from "./modal";
import {View} from "react-native";

export default function AddCarPage({ refetch, last=false, isEdit = false}) {
    const [carName, setCarName] = useState('');
    const [regNumber, setRegNumber] = useState('');


    const addCar = () => {
        if (carName != '' && regNumber != '') {
            insertCar(carName, regNumber);
            refetch();
        } 
        else {
            alert('Nem lehet üres')
        }
        
    }
    
    return (
        <Modal title="Autó hozzáadása" openBtn={
            <Button size={80} alignSelf="center" icon={Plus} />
        } body = {
            <View>
                <YStack gap={10}>
                    <Fieldset horizontal>
                        <Input onChangeText={setCarName} flex={1} id="name" placeholder="Név" />
                    </Fieldset>
                    <Fieldset horizontal>
                        <Input onChangeText={setRegNumber} flex={1} id="regNumber" placeholder="Rendszám" />
                    </Fieldset>
                </YStack>
                <Separator margin={30}/>
                <XStack alignSelf="flex-end" gap={4}>
                    <Dialog.Close displayWhenAdapted asChild>
                        <Button theme="active"  aria-label="Close">
                            Mégsem
                        </Button>
                    </Dialog.Close>

                    <Dialog.Close displayWhenAdapted asChild>
                        <Button onPress={addCar} icon={Save} theme="active"  aria-label="Close" style={styles.primary}>
                            Mentés
                        </Button>
                    </Dialog.Close>
                </XStack>
            </View>
        } />
    )
}