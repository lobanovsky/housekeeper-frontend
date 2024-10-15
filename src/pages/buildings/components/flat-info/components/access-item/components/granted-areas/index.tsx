import React, { useMemo } from 'react';
import { AreaResponse } from 'backend/services/backend';
import { AreaNames } from 'utils/constants';
import './styles.scss';

const compareAreas = ({ areaId: id1 = 0 }: AreaResponse, { areaId: id2 = 0 }: AreaResponse) => id1 - id2;

export function AccessAreas({ areas }: { areas: AreaResponse[] }) {
  const sortedAreas = useMemo(
    () => areas.sort(compareAreas),
    [areas.length]
  );

  return (
    <div className="access-item-areas">
      {sortedAreas.map(
        ({
           areaId = 0,
           places = []
         }) => (
          <div key={areaId} className={`access-area type-${areaId}`}>
            <div className="icon">
              {AreaNames[areaId]?.icon || String(areaId)}
            </div>
            <div className="places">
              {places.map((place) => <div className="place" key={place}>{place}</div>)}
            </div>
            {/* {!!access.tenant && <span className="tenant-icon"><LetterAIcon /></span>} */}
          </div>
        )
      )}
    </div>
  );
}
