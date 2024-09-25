import { createContext } from "react";
import { AreaVO } from "backend/services/backend";
import { EmptyFunction } from "../../../../utils/types";

interface IAccessContext {
  areas: AreaVO[];
  flatNumber: string;
  ownerId: number,
  reloadFlatInfo: EmptyFunction
}


export const AccessContext = createContext<IAccessContext>({
  areas: [],
  flatNumber: "",
  ownerId: 0,
  reloadFlatInfo: () => {
  }
});
