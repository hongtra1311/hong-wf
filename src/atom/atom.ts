import { atom } from "jotai";
import { FullWeatherData } from "../types/weather";

export const membersAtom = atom<FullWeatherData[]>([]);

export const latAtom = atom<number>();
export const lonAtom = atom<number>();
