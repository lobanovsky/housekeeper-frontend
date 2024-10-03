import React from "react";
import { EnumBuildingType } from "../backend/services/backend";
import { ParkingIcon } from "../icons/parking";
import { PlaygroundIcon } from "../icons/playground";
import { HomeOutlined } from "@ant-design/icons";

export const IS_DEBUG = process.env.NODE_ENV === "development";

export const SERVER_DATE_FORMAT = "YYYY-MM-DD";

type AreaInfo = {
  title: string,
  icon?: React.ReactNode
}


export const AreaNames: Record<number, AreaInfo> = {
  2: {
    title: "Подземный паркинг",
    icon: <ParkingIcon />
  },
  1: {
    title: "Дворовая территория",
    icon: <PlaygroundIcon />
  }
};

export const BuildingIcons: Record<EnumBuildingType, React.ReactNode> = {
  [EnumBuildingType.APARTMENT_BUILDING]: <HomeOutlined />,
  [EnumBuildingType.UNDERGROUND_PARKING]: <ParkingIcon />
};
