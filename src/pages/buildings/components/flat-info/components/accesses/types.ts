import { CarVO } from "backend/services/backend";

export interface CarValues extends CarVO {
  isNew?: boolean;
}
