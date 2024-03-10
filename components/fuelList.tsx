import {Button, Card, H1, H2, Paragraph, Separator, XStack} from "tamagui";
import {Text} from "react-native";
import {getAllFuelInfo, removeFuelInfo} from "../db/fuelinfo";
import {Trash} from "@tamagui/lucide-icons";
import {useQuery} from "react-query";
import {FuelInfoModel} from "../typedefs/cars";

export default function FuelList({route}) {
    const {data, isLoading, refetch} = useQuery({
        queryKey: 'getAllFuelInfo',
        queryFn: async ()=> {
            return await getAllFuelInfo(route.params.carId)
        }
    })
    return (
        isLoading || !data ? <Text>Loading...</Text>
            :
            data.map((fuelInfo:FuelInfoModel) => (
                <Card  size="$4"  style={{borderRadius: 50, margin: 10}}>
                    <Card.Header padded>
                        <H2>{fuelInfo.amount} l - {fuelInfo.price} Ft</H2>
                        <H2 textAlign="right" color="gray">{fuelInfo.date}</H2>
                        
                        <Paragraph theme="alt2">Km óra állás: <Text style={{fontFamily: 'InterBold'}}>{fuelInfo.km} km</Text></Paragraph>
                        <Paragraph theme="alt2">Össz km: <Text style={{fontFamily: 'InterBold'}}>{fuelInfo.all_km} km</Text></Paragraph><Paragraph theme="alt2">Hely: <Text style={{fontFamily: 'InterBold'}}>{fuelInfo.location}</Text></Paragraph>
                        <XStack justifyContent="flex-end">
                            <Button style={{}} onPress={()=>removeFuelInfo(fuelInfo.id, refetch)} color="red" icon={Trash}>
                                Törlés
                            </Button>
                        </XStack>
                    </Card.Header>
                </Card>
            ))
    )
} 