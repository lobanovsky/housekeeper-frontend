import { createContext } from "react";
import { AreaVO } from "../backend/services/backend";

interface IAppContext {
  areas: AreaVO[];
}


export const DictionariesContext = createContext<IAppContext>({
  areas: []
});
