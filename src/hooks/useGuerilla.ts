import { GAME_TIMEZONE } from "@config/constants";
import { closestTo } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { useEffect, useState } from "react";

interface Guerilla {
	start: number[];
	end: number[];
	startDate?: Date;
	endDate?: Date;
}

type GuerillasList = Guerilla[];

const ONE_MINUTE = 60 * 1000;

const GUERILLAS: GuerillasList = [
	{
		start: [7, 0],
		end: [8, 0],
	},
	{
		start: [13, 0],
		end: [14, 0],
	},
	{
		start: [20, 0],
		end: [21, 0],
	},
	{
		start: [22, 0],
		end: [23, 0],
	},
];

function getNextGuerilla() {
	const now = new Date();

	const guerillas = GUERILLAS.map(guerilla => {
		let startDate = new Date();
		startDate.setHours(guerilla.start[0], guerilla.start[1], 0, 0);
		startDate = zonedTimeToUtc(startDate, GAME_TIMEZONE);

		let endDate = new Date();
		endDate.setHours(guerilla.end[0], guerilla.end[1], 0, 0);
		endDate = zonedTimeToUtc(endDate, GAME_TIMEZONE);

		// no more "about 4 hours ago"
		if (now > endDate) {
			startDate.setDate(startDate.getDate() + 1);
			endDate.setDate(endDate.getDate() + 1);
		}

		return {
			...guerilla,
			startDate,
			endDate,
		}
	})

	if (guerillas.every((guerilla) => guerilla.startDate)) {
		const now = new Date();
		const startDates = guerillas.map(
			(guerilla) => guerilla.startDate
		).filter((date) => now < date); // Filter past dates (i.e 1 minute ago)

		const nextGuerilla = closestTo(new Date(), startDates);
		return nextGuerilla
	}
}

export default function useGuerilla(): Date | null {
		const [nextGuerilla, setNextGuerilla] = useState<Date>(getNextGuerilla());

	useEffect(() => {
		const interval = setInterval(updateNextGuerilla, ONE_MINUTE);

		return () => clearInterval(interval);
	}, []);

	function updateNextGuerilla() {
		const next = getNextGuerilla()
		setNextGuerilla(next)
	}

	return nextGuerilla;
}