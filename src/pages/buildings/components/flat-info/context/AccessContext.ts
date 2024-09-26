import { createContext } from "react";
import { EmptyFunction } from "utils/types";

interface IAccessContext {
  flatNumber: string;
  ownerId: number,
  reloadFlatInfo: EmptyFunction
}


export const AccessContext = createContext<IAccessContext>({
  flatNumber: "",
  ownerId: 0,
  reloadFlatInfo: () => {
  }
});
