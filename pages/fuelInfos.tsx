import {ScrollView, SizableText, Tabs} from "tamagui";
import FuelList from "../components/fuelList";
import {styles} from "../styles/global";
import {useState} from "react";
import Charts from "../components/chart";

export default function FuelInfosPage({route}) {
    const [selected, setSelected] = useState('tab1');
    return (
        <ScrollView>
            {
                <Tabs
                    defaultValue="tab1"
                    flexDirection="column"
                    orientation="horizontal"
                    width="100%"
                    borderWidth="$0.25"
                    borderColor="$borderColor"
                    padding={10}
                    >
                    <Tabs.List >
                        <Tabs.Tab 
                            onPress={()=>setSelected('tab1')}
                            backgroundColor={selected === 'tab1' ? styles.primary.backgroundColor : 'unset'}
                            value="tab1">
                            <SizableText
                                color={selected === 'tab1' ? 'white': 'black'}
                            >Lista</SizableText>
                        </Tabs.Tab>
                        <Tabs.Tab
                            onPress={()=>setSelected('tab2')}
                            backgroundColor={selected === 'tab2' ? styles.primary.backgroundColor : 'unset'}
                            value="tab2">
                            <SizableText
                                color={selected === 'tab2' ? 'white': 'black'}
                            >Diagram</SizableText>
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Content value="tab1">
                        <FuelList route={route}/>
                    </Tabs.Content>
                    <Tabs.Content value="tab2">
                        <Charts route={route} />
                    </Tabs.Content>
                </Tabs>
                
            }
            
            
        </ScrollView>
    )
}