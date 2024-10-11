import React, { useCallback } from 'react';
import Loading from 'components/loading';
import useRemoteData from 'hooks/use-remote-data';
import { GateService, LogEntryOverview, LogEntryResponse } from 'backend/services/backend';
import { dateTimeRenderer } from 'utils/renderers';
import './styles.scss';

const renderDateValue = ({
                           dateTime = '',
                           gateName = ''
                         }: LogEntryResponse = {
  dateTime: '',
  id: 0,
  gateId: 0
}) => (
  <span className={`date ${!dateTime ? 'empty' : ''}`}>
  {dateTime ? dateTimeRenderer(dateTime) : ' - '}
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
          <div className="field last-entry">
            <span className="label">Последний заезд:</span>
            {renderDateValue(log?.lastLogEntry)}
          </div>
          <div className="field last-entries">
            <div className="label">История въездов:</div>
            {(log?.lastLogEntries || []).map((entry) => <div key={entry.id}>{renderDateValue(entry)}</div>)}
          </div>
          <div className="field first-entry">
            <span className="label">Первый заезд:</span>
            {renderDateValue(log?.firstLogEntry)}
          </div>
        </>
      )}
    </div>
  );
}
