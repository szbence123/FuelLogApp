import SelectMenu from "./select";
import { useEffect, useState } from "react";
import { SelectItem } from "../types/props";

export default function YearSelector({ selectedYear, setSelectedYear }) {
	const [years, setYears] = useState([]);

	useEffect(() => {
		let yrs: SelectItem[] = [];
		yrs.push({
			name: "Összes",
			value: "összes"
		});
		for (let i = new Date().getFullYear(); i >= 2006; i--) {
			yrs.push({
				name: i.toString(),
				value: i.toString()
			});
		}
		setYears(yrs);
	}, []);

	return <SelectMenu selected={selectedYear} setSelected={setSelectedYear} title="Évek" items={years} />;
}
