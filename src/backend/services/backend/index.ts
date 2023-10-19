/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import {AxiosInstance, AxiosRequestConfig} from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {
  /** only in axios interceptor config*/
  loading?: boolean;
  showError?: boolean;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
  /** only in axios interceptor config*/
  loading: boolean;
  showError: boolean;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = {
    loading: serviceOptions.loading,
    showError: serviceOptions.showError,
    ...options,
    method,
    url
  };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class CounterpartyControllerService {
  /**
   *
   */
  update(
      params: {
        /**  */
        counterpartyId: number;
        /** requestBody */
        body?: CounterpartyRequest;
      } = {} as any,
      options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/counterparties/{counterpartyId}';
      url = url.replace('{counterpartyId}', params['counterpartyId'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }

  /**
   *
   */
  findAll(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/counterparties';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }

  /**
   *
   */
  create(
      params: {
        /** requestBody */
        body?: CounterpartyRequest;
      } = {} as any,
      options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/counterparties';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class RoomControllerService {
  /**
   * Get all rooms with filter
   */
  makeRoomsReport(
      params: {
        /**  */
        pageNum?: number;
        /**  */
      pageSize?: number;
      /** requestBody */
      body?: RoomFilter;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/rooms';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { pageNum: params['pageNum'], pageSize: params['pageSize'] };

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get all types of room
   */
  getRoomTypes(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/rooms/types';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class PaymentReportControllerService {
  /**
   * Export outgoing payments by filter to excel
   */
  exportOutgoingPayments(
      params: {
        /** requestBody */
        body?: OutgoingPaymentsFilter;
      } = {} as any,
      options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/payments/outgoing';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Export outgoing payments by filter to excel
   */
  exportOutgoingGroupingPayments(
      params: {
        /** requestBody */
        body?: OutgoingGropingPaymentsFilter;
      } = {} as any,
      options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/payments/outgoing/grouping';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Export incoming payments by filter to excel
   */
  exportIncomingPayments(
      params: {
        /** requestBody */
        body?: IncomingPaymentsFilter;
      } = {} as any,
      options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/payments/incoming';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Find payments from the company
   */
  findPaymentsFromCompany(
    params: {
      /** requestBody */
      body?: IncomingPaymentsFilter;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/counterparties/incoming-payments';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Getting taxable and tax-free payments for year (incoming payments)
   */
  findAnnualIncomingPayments(
    params: {
      /**  */
      year: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/incoming-payments/{year}';
      url = url.replace('{year}', params['year'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class PaymentControllerService {
  /**
   * Find outgoing payments with filter
   */
  findOutgoingPayments(
    params: {
      /**  */
      pageNum?: number;
      /**  */
      pageSize?: number;
      /** requestBody */
      body?: OutgoingPaymentsFilter;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/payments/outgoing';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = {pageNum: params['pageNum'], pageSize: params['pageSize']};

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Find outgoing payments with filter and grouping by counterparty
   */
  findOutgoingPaymentsGroupingByCounterparty(
      params: {
        /** requestBody */
        body?: OutgoingGropingPaymentsFilter;
      } = {} as any,
      options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/payments/outgoing/grouping';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Find incoming payments with filter
   */
  findIncomingPayments(
    params: {
      /**  */
      pageNum?: number;
      /**  */
      pageSize?: number;
      /** requestBody */
      body?: IncomingPaymentsFilter;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/payments/incoming';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { pageNum: params['pageNum'], pageSize: params['pageSize'] };

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Getting taxable and tax-free payments for year (incoming payments)
   */
  findAnnualIncomingPayments1(
    params: {
      /**  */
      year: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/payments/{year}/incoming';
      url = url.replace('{year}', params['year'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Find all deposits made (outgoing payments)
   */
  findAllDeposits(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/payments/deposits';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class LogEntryControllerService {
  /**
   * Get all log entries
   */
  findAllLogEntries(
      params: {
        /**  */
        pageNum?: number;
        /**  */
        pageSize?: number;
        /** requestBody */
        body?: LogEntryFilter;
      } = {} as any,
      options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/log-entries';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { pageNum: params['pageNum'], pageSize: params['pageSize'] };

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get all statuses of log entry
   */
  getLogEntryStatuses(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/log-entries/statuses';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get top by phone number
   */
  getTopByPhoneNumber(
      params: {
        /**  */
        gateId?: number;
        /**  */
        startDate?: string;
        /**  */
        endDate?: string;
      } = {} as any,
      options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/log-entries/phone-number/top';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { gateId: params['gateId'], startDate: params['startDate'], endDate: params['endDate'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get top by flat number
   */
  getTopByFlatNumber(
      params: {
        /**  */
        gateId?: number;
        /**  */
        startDate?: string;
        /**  */
        endDate?: string;
      } = {} as any,
      options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/log-entries/flat-number/top';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { gateId: params['gateId'], startDate: params['startDate'], endDate: params['endDate'] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get all access-methods of log entry
   */
  getLogEntryAccessMethods(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/log-entries/access-methods';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class FileControllerService {
  /**
   *
   */
  getAllFiles(
      params: {
        /**  */
        pageNum?: number;
        /**  */
        pageSize?: number;
        /** requestBody */
        body?: FileFilter;
      } = {} as any,
      options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { pageNum: params['pageNum'], pageSize: params['pageSize'] };

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get all types of files
   */
  getFileTypes(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/types';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Remove data (payments, log-entries etc.) by the file ids
   */
  remove(
      params: {
        /**  */
        fileIds: any | null[];
      } = {} as any,
      options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/{fileIds}';
      url = url.replace('{fileIds}', params['fileIds'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class FileImporterControllerService {
  /**
   * Import accounts from registry from *.xlsx
   */
  importAccountsFromRegistry(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/registry/importer';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Import payments from *.xlsx
   */
  importPayments(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/payments/importer';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Import accounts from "HOMEOWNER" from *.xlsx
   */
  importAccountsFromHomeowners(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/homeowner/accounts/importer';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Import eldes gate from *.log
   */
  importEldesGate(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/eldes-gate/importer';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Import water counters from *.xlsx
   */
  importWaterCounters(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/counters/water/importer';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Import counter values from *.xlsx
   */
  importValuesOfCounters(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/counters/counter-values/importer';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Import counterparties from *.xlsx
   */
  importCounterparties(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/counterparties/importer';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Import contacts from *.xlsx
   */
  importContacts(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/contacts/importer';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Import answers from *.xlsx
   */
  importAnswers(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/answers/importer';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class MailingControllerService {
  /**
   * Refusal Of Paper Receipts
   */
  sendEmails(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/emails/refusal-of-paper-receipts';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class DecisionControllerService {
  /**
   * Prepare decisions
   */
  makeBlankDecision(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/decisions';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Sent decisions to mail
   */
  sendDecisions(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/decisions/send';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

export class RoomReportControllerService {
  /**
   * Print rooms
   */
  makeRoomsReport1(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/rooms';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class DecisionReportControllerService {
  /**
   * Make decisions template
   */
  makeDecisionTemplate(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/decisions/templates/decisions';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Export all decisions
   */
  makeDecisionReport(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/decisions/decisions';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Print selected decisions
   */
  printSelectedDecisionsReport(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/decisions/decisions/selected-to-print';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Print not voted decisions
   */
  makeNotVotedDecisionsReport(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/decisions/decisions/not-voted';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class GateControllerService {
  /**
   * Get all gates
   */
  getAllGates(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/gates';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class ActuatorService {
  /**
   * Actuator root web endpoint
   */
  links(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/actuator';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Actuator web endpoint 'health'
   */
  health(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/actuator/health';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Actuator web endpoint 'health-path'
   */
  healthPath(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/actuator/health/**';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class AccountControllerService {
  /**
   * Find all accounts
   */
  findAllAccounts(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/accounts';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export interface CounterpartyRequest {
  /**  */
  originalName?: string;

  /**  */
  inn?: string;

  /**  */
  bank?: string;

  /**  */
  bik?: string;

  /**  */
  sign?: string;

  /**  */
  manualCreated?: boolean;
}

export interface CounterpartyResponse {
  /**  */
  id?: number;

  /**  */
  originalName?: string;

  /**  */
  inn?: string;

  /**  */
  bank?: string;

  /**  */
  bik?: string;

  /**  */
  sign?: string;

  /**  */
  createDate?: Date;
}

export interface RoomFilter {
  /**  */
  account?: string;

  /**  */
  type?: EnumRoomFilterType;

  /**  */
  number?: string;

  /**  */
  building?: string;

  /**  */
  street?: string;

  /**  */
  ownerName?: string;
}

export interface OwnerVO {
  /**  */
  fullName?: string;

  /**  */
  emails?: string[];

  /**  */
  phones?: string[];

  /**  */
  active?: boolean;

  /**  */
  dateOfLeft?: Date;
}

export interface PageRoomVO {
  /**  */
  totalPages?: number;

  /**  */
  totalElements?: number;

  /**  */
  pageable?: PageableObject;

  /**  */
  numberOfElements?: number;

  /**  */
  size?: number;

  /**  */
  content?: RoomVO[];

  /**  */
  number?: number;

  /**  */
  sort?: SortObject;

  /**  */
  first?: boolean;

  /**  */
  last?: boolean;

  /**  */
  empty?: boolean;
}

export interface PageableObject {
  /**  */
  paged?: boolean;

  /**  */
  unpaged?: boolean;

  /**  */
  pageNumber?: number;

  /**  */
  pageSize?: number;

  /**  */
  offset?: number;

  /**  */
  sort?: SortObject;
}

export interface RoomVO {
  /**  */
  id?: number;

  /**  */
  street?: string;

  /**  */
  building?: string;

  /**  */
  cadastreNumber?: string;

  /**  */
  account?: string;

  /**  */
  ownerName?: string;

  /**  */
  number?: string;

  /**  */
  certificate?: string;

  /**  */
  square?: number;

  /**  */
  percentage?: number;

  /**  */
  type?: EnumRoomVOType;

  /**  */
  owners?: OwnerVO[];

  /**  */
  tenants?: OwnerVO[];
}

export interface SortObject {
  /**  */
  unsorted?: boolean;

  /**  */
  sorted?: boolean;

  /**  */
  empty?: boolean;
}

export interface OutgoingPaymentsFilter {
  /**  */
  toName?: string;

  /**  */
  toInn?: string;

  /**  */
  purpose?: string;

  /**  */
  taxable?: boolean;

  /**  */
  startDate?: Date;

  /**  */
  endDate?: Date;
}

export interface OutgoingGropingPaymentsFilter {
  /**  */
  startDate?: Date;

  /**  */
  endDate?: Date;
}

export interface IncomingPaymentsFilter {
  /**  */
  fromName?: string;

  /**  */
  fromInn?: string;

  /**  */
  purpose?: string;

  /**  */
  taxable?: boolean;

  /**  */
  startDate?: Date;

  /**  */
  endDate?: Date;

  /**  */
  toAccounts?: string[];
}

export interface PagePaymentVO {
  /**  */
  totalPages?: number;

  /**  */
  totalElements?: number;

  /**  */
  pageable?: PageableObject;

  /**  */
  numberOfElements?: number;

  /**  */
  size?: number;

  /**  */
  content?: PaymentVO[];

  /**  */
  number?: number;

  /**  */
  sort?: SortObject;

  /**  */
  first?: boolean;

  /**  */
  last?: boolean;

  /**  */
  empty?: boolean;
}

export interface PaymentVO {
  /**  */
  uuid?: string;

  /**  */
  date?: Date;

  /**  */
  fromAccount?: string;

  /**  */
  fromInn?: string;

  /**  */
  fromName?: string;

  /**  */
  toAccount?: string;

  /**  */
  toInn?: string;

  /**  */
  toName?: string;

  /**  */
  outgoingSum?: number;

  /**  */
  incomingSum?: number;

  /**  */
  docNumber?: string;

  /**  */
  vo?: string;

  /**  */
  bik?: string;

  /**  */
  bankName?: string;

  /**  */
  purpose?: string;

  /**  */
  tag?: EnumPaymentVOTag;

  /**  */
  taxable?: boolean;

  /**  */
  deposit?: boolean;
}

export interface Counterparty {
  /**  */
  id?: number;

  /**  */
  uuid?: string;

  /**  */
  originalName?: string;

  /**  */
  name?: string;

  /**  */
  inn?: string;

  /**  */
  bank?: string;

  /**  */
  bik?: string;

  /**  */
  sign?: string;

  /**  */
  manualCreated?: boolean;

  /**  */
  createDate?: Date;
}

export interface GroupOfPayment {
  /**  */
  counterparty?: Counterparty;

  /**  */
  payments?: OutgoingPayment[];

  /**  */
  total?: number;
}

export interface OutgoingPayment {
  /**  */
  id?: number;

  /**  */
  uuid?: string;

  /**  */
  date?: Date;

  /**  */
  fromAccount?: string;

  /**  */
  fromInn?: string;

  /**  */
  fromName?: string;

  /**  */
  toAccount?: string;

  /**  */
  toInn?: string;

  /**  */
  toName?: string;

  /**  */
  sum?: number;

  /**  */
  docNumber?: string;

  /**  */
  vo?: string;

  /**  */
  bik?: string;

  /**  */
  bankName?: string;

  /**  */
  purpose?: string;

  /**  */
  createDate?: Date;

  /**  */
  source?: string;

  /**  */
  pack?: string;

  /**  */
  flagged?: EnumOutgoingPaymentFlagged;

  /**  */
  taxable?: boolean;

  /**  */
  deposit?: boolean;
}

export interface LogEntryFilter {
  /**  */
  gateId?: number;

  /**  */
  phoneNumber?: string;

  /**  */
  userName?: string;

  /**  */
  flatNumber?: string;

  /**  */
  status?: EnumLogEntryFilterStatus;

  /**  */
  method?: EnumLogEntryFilterMethod;

  /**  */
  startDate?: Date;

  /**  */
  endDate?: Date;
}

export interface LogEntryResponse {
  /**  */
  id?: number;

  /**  */
  dateTime?: Date;

  /**  */
  status?: string;

  /**  */
  userName?: string;

  /**  */
  flatNumber?: string;

  /**  */
  method?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  gateId?: number;

  /**  */
  gateName?: string;
}

export interface PageLogEntryResponse {
  /**  */
  totalPages?: number;

  /**  */
  totalElements?: number;

  /**  */
  pageable?: PageableObject;

  /**  */
  numberOfElements?: number;

  /**  */
  size?: number;

  /**  */
  content?: LogEntryResponse[];

  /**  */
  number?: number;

  /**  */
  sort?: SortObject;

  /**  */
  first?: boolean;

  /**  */
  last?: boolean;

  /**  */
  empty?: boolean;
}

export interface FileFilter {
  /**  */
  name?: string;

  /**  */
  fileType?: EnumFileFilterFileType;
}

export interface FileType {
  /**  */
  name?: string;

  /**  */
  description?: string;
}

export interface FileVO {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  size?: number;

  /**  */
  checksum?: string;

  /**  */
  type?: FileType;

  /**  */
  createDate?: Date;
}

export interface PageFileVO {
  /**  */
  totalPages?: number;

  /**  */
  totalElements?: number;

  /**  */
  pageable?: PageableObject;

  /**  */
  numberOfElements?: number;

  /**  */
  size?: number;

  /**  */
  content?: FileVO[];

  /**  */
  number?: number;

  /**  */
  sort?: SortObject;

  /**  */
  first?: boolean;

  /**  */
  last?: boolean;

  /**  */
  empty?: boolean;
}

export interface AccountRegistryResponse {
  /**  */
  fileName?: string;

  /**  */
  totalSize?: number;

  /**  */
  flatsWithCertSize?: number;

  /**  */
  garagesOrOfficesWithCertSize?: number;
}

export interface PaymentInfoResponse {
  /**  */
  fileName?: string;

  /**  */
  totalSize?: number;

  /**  */
  uniqTotalSize?: number;

  /**  */
  incomingSize?: number;

  /**  */
  outgoingSize?: number;

  /**  */
  incomingSum?: number;

  /**  */
  outgoingSum?: number;
}

export interface AccountHomeownersResponse {
  /**  */
  fileName?: string;

  /**  */
  roomSize?: number;

  /**  */
  ownerSize?: number;

  /**  */
  totalSquare?: number;

  /**  */
  totalPercentage?: number;
}

export interface EldesGateInfoResponse {
  /**  */
  fileName?: string;

  /**  */
  totalSize?: number;
}

export interface CounterInfoResponse {
  /**  */
  fileName?: string;

  /**  */
  totalSize?: number;
}

export interface CounterpartyInfoResponse {
  /**  */
  fileName?: string;

  /**  */
  size?: number;

  /**  */
  numberOfUnique?: number;
}

export interface ContactInfoResponse {
  /**  */
  fileName?: string;

  /**  */
  totalSize?: number;

  /**  */
  officeEmailSize?: number;

  /**  */
  flatEmailSize?: number;

  /**  */
  garageEmailSize?: number;
}

export interface AnswerInfoResponse {
  /**  */
  fileName?: string;

  /**  */
  totalSize?: number;
}

export interface DecisionResponse {
  /**  */
  totalSize?: number;

  /**  */
  square?: number;

  /**  */
  percentage?: number;
}

export interface MailingResponse {
  /**  */
  totalDecisions?: number;

  /**  */
  totalEmails?: number;

  /**  */
  sentDecisions?: number;

  /**  */
  sentEmail?: number;
}

export interface RoomTypeResponse {
  /**  */
  name?: string;

  /**  */
  description?: string;
}

export interface AnnualPaymentVO {
  /**  */
  year?: number;

  /**  */
  totalSum?: number;

  /**  */
  taxableSum?: number;

  /**  */
  taxFreeSum?: number;

  /**  */
  depositSum?: number;

  /**  */
  taxablePaymentsByMonths?: MonthPaymentVO[];

  /**  */
  taxFreePaymentsByMonths?: MonthPaymentVO[];

  /**  */
  depositsPaymentsByMonths?: MonthPaymentVO[];
}

export interface MonthPaymentVO {
  /**  */
  month?: EnumMonthPaymentVOMonth;

  /**  */
  numberOfMonth?: number;

  /**  */
  size?: number;

  /**  */
  totalSum?: number;

  /**  */
  payments?: PaymentVO[];
}

export interface DepositResponse {
  /**  */
  contractNumber?: string;

  /**  */
  payment?: PaymentVO;
}

export interface LogEntryStatusResponse {
  /**  */
  name?: string;

  /**  */
  description?: string;
}

export interface TopRatingResponse {
  /**  */
  count?: number;

  /**  */
  flatNumber?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  userName?: string;
}

export interface LogEntryAccessMethodResponse {
  /**  */
  name?: string;

  /**  */
  description?: string;
}

export interface GateResponse {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  phoneNumber?: string;

  /**  */
  imei?: string;
}

export interface FileTypeResponse {
  /**  */
  name?: string;

  /**  */
  description?: string;
}

export interface Link {
  /**  */
  href?: string;

  /**  */
  templated?: boolean;
}

export interface AccountResponse {
  /**  */
  account?: string;

  /**  */
  default?: boolean;

  /**  */
  special?: boolean;

  /**  */
  description?: string;
}
export enum EnumRoomFilterType {
  'FLAT' = 'FLAT',
  'GARAGE' = 'GARAGE',
  'OFFICE' = 'OFFICE'
}
export enum EnumRoomVOType {
  'FLAT' = 'FLAT',
  'GARAGE' = 'GARAGE',
  'OFFICE' = 'OFFICE'
}
export enum EnumPaymentVOTag {
  'RED' = 'RED',
  'ORANGE' = 'ORANGE',
  'YELLOW' = 'YELLOW',
  'GREEN' = 'GREEN',
  'BLUE' = 'BLUE',
  'PURPLE' = 'PURPLE',
  'GRAY' = 'GRAY',
  'BLACK' = 'BLACK',
  'WHITE' = 'WHITE'
}
export enum EnumOutgoingPaymentFlagged {
  'RED' = 'RED',
  'ORANGE' = 'ORANGE',
  'YELLOW' = 'YELLOW',
  'GREEN' = 'GREEN',
  'BLUE' = 'BLUE',
  'PURPLE' = 'PURPLE',
  'GRAY' = 'GRAY',
  'BLACK' = 'BLACK',
  'WHITE' = 'WHITE'
}
export enum EnumLogEntryFilterStatus {
  'OPENED' = 'OPENED',
  'AUTH_FAILED' = 'AUTH_FAILED',
  'NUM_DELETED' = 'NUM_DELETED',
  'USER_ADDED' = 'USER_ADDED',
  'UNDEFINED' = 'UNDEFINED'
}
export enum EnumLogEntryFilterMethod {
  'CALL' = 'CALL',
  'APP' = 'APP',
  'UNDEFINED' = 'UNDEFINED'
}
export enum EnumFileFilterFileType {
  'PAYMENTS' = 'PAYMENTS',
  'COUNTERPARTIES' = 'COUNTERPARTIES',
  'ROOMS' = 'ROOMS',
  'CONTACTS' = 'CONTACTS',
  'REGISTRIES' = 'REGISTRIES',
  'ACCOUNTS' = 'ACCOUNTS',
  'LOG_ENTRY' = 'LOG_ENTRY',
  'DECISIONS' = 'DECISIONS',
  'DECISION_ANSWERS' = 'DECISION_ANSWERS',
  'COUNTER_WATER_VALUES' = 'COUNTER_WATER_VALUES'
}
export enum EnumMonthPaymentVOMonth {
  'JANUARY' = 'JANUARY',
  'FEBRUARY' = 'FEBRUARY',
  'MARCH' = 'MARCH',
  'APRIL' = 'APRIL',
  'MAY' = 'MAY',
  'JUNE' = 'JUNE',
  'JULY' = 'JULY',
  'AUGUST' = 'AUGUST',
  'SEPTEMBER' = 'SEPTEMBER',
  'OCTOBER' = 'OCTOBER',
  'NOVEMBER' = 'NOVEMBER',
  'DECEMBER' = 'DECEMBER'
}


export interface TopResponse {
  count: number,
  id: number,
  flatNumber?: string,
  phoneNumber?: string,
  userName: string
};

export interface TopFilter {
  gateId?: number;
  startDate?: string;
  endDate?: string;
}


export const PaymentService = new PaymentControllerService();
export const PaymentReportService = new PaymentReportControllerService();
export const FileService = new FileControllerService();
export const DecisionService = new DecisionControllerService();
export const DecisionReportService = new DecisionReportControllerService();
export const RoomService = new RoomControllerService();
export const RoomReportService = new RoomReportControllerService();
export const GateService = new LogEntryControllerService();
export const AccountService = new AccountControllerService();
export const CounterpartyService = new CounterpartyControllerService();
