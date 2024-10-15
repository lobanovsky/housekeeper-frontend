import React, { useCallback } from 'react';
import Loading from 'components/loading';
import useRemoteData from 'hooks/use-remote-data';
import { GateService, LogEntryOverview, LogEntryResponse } from 'backend/services/backend';
import './styles.scss';
import dayjs from 'dayjs';

const today = dayjs();
const isOutdatedEntry = (dateTime: string = '') => {
  const monthDif = dateTime ? today.diff(dateTime, 'month') : 0;
  return dateTime && monthDif > 3;
};

const renderDateValue = ({
                           dateTime = '',
                           gateName = ''
                         }: LogEntryResponse = {
  dateTime: '',
  id: 0,
  gateId: 0
}, checkForOutdated = false) => (
  <span className={`date ${!dateTime ? 'empty' : ''} ${checkForOutdated && isOutdatedEntry(dateTime) ? 'outdated' : ''}`}>
  {dateTime ? dayjs(dateTime)
    .format('LLL') : ' - '}
    {!!(dateTime && gateName) && ` (${gateName})`}
  </span>
);

export function CarGateLogs({ phoneNumber }: { phoneNumber: string }) {
  const logsLoader = useCallback(() => GateService.getLastByPhoneNumber({ phoneNumber }), [phoneNumber]);
  const [log, isLoading] = useRemoteData<LogEntryOverview>(logsLoader, { defaultShowLoading: true });

  return (
    <div className="car-logs">
      {isLoading && <Loading />}
      {!isLoading && (
        <>
          {/* <div className="field last-entry"> */}
          {/*   <span className="label">Последний заезд:</span> */}
          {/*   {renderDateValue(log?.lastLogEntry, true)} */}
          {/* </div> */}
          <div className="field last-entries">
            <div className="label">История въездов:</div>
            {(log?.lastLogEntries || []).map((entry, index) => (
              <div
                key={entry.id}
                className={index === 0 ? 'last-entry' : ''}
              >
                {renderDateValue(entry)}
              </div>
            ))}
          </div>
          <div className="field first-entry">
            <span className="label">Первый заезд:</span>
            {renderDateValue(log?.firstLogEntry)}
          </div>
          <div className="field total">
            <span className="label">Всего заездов:</span>
            {log?.totalSize || 0}
          </div>
        </>
      )}
    </div>
  );
}
