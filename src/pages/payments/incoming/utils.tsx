import { Select } from 'antd';
import React from 'react';
import { AccountResponse, PaymentTypeResponse } from '../../../backend/services/backend';
import { accountNumberRenderer } from '../../../utils/renderers';

export const createAccountOptions = (accounts: AccountResponse[]): React.ReactNode[] => accounts.map(
  ({
     account = '',
     description = '',
     special = false
   }) => (
    <Select.Option
      id={account}
      value={account}
      key={account}
    >
        <span className={`account ${special ? 'special' : ''}`}>
            <span className="account-number">{accountNumberRenderer(account)}</span>
          {`(${description})`}
        </span>
    </Select.Option>
  )
);

export const createPaymentTypeOptions = (paymentTypes: PaymentTypeResponse[]) => paymentTypes.map(
  ({
     type = '',
     description = '',
     color = 'black'
   }) => (
    <Select.Option
      id={type}
      value={type}
      key={type}
      color={color}
    >
      <span style={{ color: color || 'inherit' }}>{description}</span>
    </Select.Option>
  )
);
