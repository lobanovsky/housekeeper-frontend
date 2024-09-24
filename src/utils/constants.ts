import React from "react";
import { EnumAreaType } from "../backend/services/backend";

export const IS_DEBUG = process.env.NODE_ENV === "development";

export const SERVER_DATE_FORMAT = "YYYY-MM-DD";
type AreaInfo = {
  title: string,
  icon?: React.ReactNode
}


export const AreaNames: Record<EnumAreaType, AreaInfo> = {
  [EnumAreaType.UNDERGROUND_PARKING_AREA]: {
    title: "Подземный паркинг",
    icon: ""
  },
  [EnumAreaType.YARD_AREA]: {
    title: "Дворовая территория"
  }
};
