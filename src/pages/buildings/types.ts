import { FloorResponse, RoomVO } from '../../backend/services/backend';
import { FloorNumberProps } from './components/building-scheme/colors';

export interface FloorsWithNumbers extends Omit<FloorResponse, 'rooms'>, FloorNumberProps {
  rooms: RoomVO[][];
}
