import {Check} from "@tamagui/lucide-icons";
import SelectMenu from "./select";
import {useEffect, useState} from "react";
import {SelectItem} from "../typedefs/props";

export default function YearSelector({selectedYear, setSelectedYear}) {
    const [years, setYears] = useState([])
    
    useEffect(()=> {
        let yrs: SelectItem[] = []
        for (let i = (new Date).getFullYear(); i >= 2006; i--) {
            console.log(i)
            yrs.push({
                name: i.toString(),
                value: i.toString()
            })
        }
        setYears(yrs)
    }, [])
    
    return (
        <SelectMenu selected={selectedYear} setSelected={setSelectedYear} title="Évek" items={years} default={(new Date().getFullYear()).toString()} />
    )
} 