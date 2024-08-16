/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import { AxiosInstance, AxiosRequestConfig } from "axios";

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

export class RepairControllerService {
  /**
   *
   */
  updateUuid(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repairs/update-uuid';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  removeDuplicates(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repairs/remove-duplicates';

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   *
   */
  getSumOfPayments(
    params: {
      /** requestBody */
      body?: RangeRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/repairs/sum-of-payments';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
}

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
  /**
   * Get all rooms by building id
   */
  getBuildingStructure(
    params: {
      /**  */
      buildingId: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/rooms/building-structure/{buildingId}';
      url = url.replace('{buildingId}', params['buildingId'] + '');

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

export class RegistryControllerService {
  /**
   * Check and create new registry for special account
   */
  getSpecialRegistry(
    params: {
      /**  */
      useInactiveAccount?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/registries/special-account';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { useInactiveAccount: params["useInactiveAccount"] };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check and create new registry for manual account
   */
  getManualRegistry(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/registries/manual-account';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check and create new registry for manual account
   */
  getCustomRegistry(
    params: {
      /**  */
      sum?: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/registries/custom-account';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { sum: params["sum"] };

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Check and create new registry for account
   */
  getRegistry(
    params: {
      /**  */
      useInactiveAccount?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/registries/account';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);
      configs.params = { useInactiveAccount: params["useInactiveAccount"] };

      let data = null;

      configs.data = data;

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
      configs.params = { pageNum: params["pageNum"], pageSize: params["pageSize"] };

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
   * Set the manual account for the payment
   */
  setManualAccountForPayment(
    params: {
      /**  */
      id: number;
      /** requestBody */
      body?: ManualAccountRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/payments/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('patch', 'application/json', url, options);

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
   * Find all payment types
   */
  findAllPaymentTypes(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/payments/types';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Find all payments grouped by {groupBy}
   */
  findAllGroupingPaymentBy(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/payments/group-by';

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

export class AccessControllerService {
  /**
   * Create the area access by the phone number (Were? -> Area, Who? -> Room)
   */
  createAccess(
    params: {
      /** requestBody */
      body?: AccessRequest;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/access/areas';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get the access by the room id
   */
  findByRoom(
    params: {
      /**  */
      roomId: number;
      /**  */
      active?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/access/rooms/{room-id}';
      url = url.replace('{room-id}', params['roomId'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { active: params["active"] };

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * Get the access by the phone number
   */
  findByPhone(
    params: {
      /**  */
      phoneNumber: string;
      /**  */
      active?: boolean;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/access/phones/{phone-number}';
      url = url.replace('{phone-number}', params['phoneNumber'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);
      configs.params = { active: params["active"] };

      /** 适配ios13，get请求不允许带body */

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
   * Export all decisions
   */
  makeDecisionReport(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/decisions';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
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
   * Print selected decisions
   */
  printSelectedDecisionsReport(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/decisions/selected-to-print';

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
      let url = basePath + '/reports/decisions/not-voted';

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

export class BuildingControllerService {
  /**
   *
   */
  findAll1(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/buildings';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class AreaControllerService {
  /**
   *
   */
  findAll2(options: IRequestOptions = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/areas';

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
  name?: string;

  /**  */
  inn?: string;
}

export interface CounterpartyResponse {
  /**  */
  id?: number;

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
  createDate: string;
}

export interface RoomFilter {
  /**  */
  account?: string;

  /**  */
  type?: EnumRoomFilterType;

  /**  */
  number?: string;

  /**  */
  building?: number;

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
  dateOfLeft: string;
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
  building?: number;

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
  typeDescription?: string;

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
  startDate: string;

  /**  */
  endDate: string;
}

export interface OutgoingGropingPaymentsFilter {
  /**  */
  startDate: string;

  /**  */
  endDate: string;

  /**  */
  groupBy?: EnumOutgoingGropingPaymentsFilterGroupBy;
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
  startDate: string;

  /**  */
  endDate: string;

  /**  */
  toAccounts?: string[];

  /**  */
  type?: EnumIncomingPaymentsFilterType;

  /**  */
  sum?: number;
}

export interface RangeRequest {
  /**  */
  startDate: string;

  /**  */
  endDate: string;

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
  id?: number;

  /**  */
  uuid?: string;

  /**  */
  date: string;

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
  account?: string;

  /**  */
  updateAccountDateTime: string;

  /**  */
  type?: EnumPaymentVOType;

  /**  */
  typeColor?: string;

  /**  */
  typeName?: string;
}

export interface GroupOfPayment {
  /**  */
  name?: string;

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
  date: string;

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
  createDate: string;

  /**  */
  source?: string;

  /**  */
  pack?: string;

  /**  */
  comment?: string;
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
  startDate: string;

  /**  */
  endDate: string;
}

export interface LogEntryResponse {
  /**  */
  id?: number;

  /**  */
  dateTime: string;

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
  createDate: string;
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

export interface AccessRequest {
  /**  */
  phoneNumbers?: string[];

  /**  */
  areas?: number[];

  /**  */
  rooms?: Room[];

  /**  */
  tenant?: boolean;
}

export interface Room {
  /**  */
  buildingId?: number;

  /**  */
  roomIds?: number[];
}

export interface ManualAccountRequest {
  /**  */
  account?: string;
}

export interface IncomingPayment {
  /**  */
  id?: number;

  /**  */
  uuid?: string;

  /**  */
  date: string;

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
  createDate: string;

  /**  */
  source?: string;

  /**  */
  pack?: string;

  /**  */
  account?: string;

  /**  */
  updateAccountDateTime: string;

  /**  */
  type?: EnumIncomingPaymentType;

  /**  */
  comment?: string;
}

export interface RoomTypeResponse {
  /**  */
  name?: string;

  /**  */
  description?: string;
}

export interface FloorResponse {
  /**  */
  floor?: number;

  /**  */
  rooms?: RoomVO[];
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

export interface PaymentTypeResponse {
  /**  */
  type?: string;

  /**  */
  description?: string;

  /**  */
  color?: string;
}

export interface GroupPaymentByResponse {
  /**  */
  type?: string;

  /**  */
  description?: string;
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

export interface Building {
  /**  */
  id?: number;

  /**  */
  createDate: string;

  /**  */
  active?: boolean;

  /**  */
  name?: string;

  /**  */
  numberOfApartments?: number;

  /**  */
  numberOfApartmentsPerFloor?: number;

  /**  */
  type?: EnumBuildingType;
}

export interface Area {
  /**  */
  id?: number;

  /**  */
  createDate: string;

  /**  */
  active?: boolean;

  /**  */
  name?: string;

  /**  */
  description?: string;

  /**  */
  type?: EnumAreaType;
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

export interface AccessInfoVO {
  /**  */
  id?: number;

  /**  */
  phoneNumber?: string;

  /**  */
  areas?: AreaVO[];

  /**  */
  rooms?: RoomVO[];
}

export interface AreaVO {
  /**  */
  id?: number;

  /**  */
  name?: string;

  /**  */
  type?: string;
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
export enum EnumOutgoingGropingPaymentsFilterGroupBy {
  'COUNTERPARTY' = 'COUNTERPARTY',
  'CATEGORY' = 'CATEGORY'
}
export enum EnumIncomingPaymentsFilterType {
  'SBER_REGISTRY' = 'SBER_REGISTRY',
  'VTB_REGISTRY' = 'VTB_REGISTRY',
  'DEPOSIT_PERCENTAGES' = 'DEPOSIT_PERCENTAGES',
  'DEPOSIT_REFUND' = 'DEPOSIT_REFUND',
  'TAXABLE' = 'TAXABLE',
  'ACCOUNT' = 'ACCOUNT',
  'UNKNOWN_ACCOUNT' = 'UNKNOWN_ACCOUNT',
  'SUBSIDY' = 'SUBSIDY',
  'SUBSIDY_FOR_CAPITAL_REPAIR' = 'SUBSIDY_FOR_CAPITAL_REPAIR',
  'UNKNOWN' = 'UNKNOWN',
  'MANUAL_ACCOUNT' = 'MANUAL_ACCOUNT',
  'RECOGNIZED' = 'RECOGNIZED'
}
export enum EnumPaymentVOType {
  'SBER_REGISTRY' = 'SBER_REGISTRY',
  'VTB_REGISTRY' = 'VTB_REGISTRY',
  'DEPOSIT_PERCENTAGES' = 'DEPOSIT_PERCENTAGES',
  'DEPOSIT_REFUND' = 'DEPOSIT_REFUND',
  'TAXABLE' = 'TAXABLE',
  'ACCOUNT' = 'ACCOUNT',
  'UNKNOWN_ACCOUNT' = 'UNKNOWN_ACCOUNT',
  'SUBSIDY' = 'SUBSIDY',
  'SUBSIDY_FOR_CAPITAL_REPAIR' = 'SUBSIDY_FOR_CAPITAL_REPAIR',
  'UNKNOWN' = 'UNKNOWN',
  'MANUAL_ACCOUNT' = 'MANUAL_ACCOUNT',
  'RECOGNIZED' = 'RECOGNIZED'
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
export enum EnumIncomingPaymentType {
  'SBER_REGISTRY' = 'SBER_REGISTRY',
  'VTB_REGISTRY' = 'VTB_REGISTRY',
  'DEPOSIT_PERCENTAGES' = 'DEPOSIT_PERCENTAGES',
  'DEPOSIT_REFUND' = 'DEPOSIT_REFUND',
  'TAXABLE' = 'TAXABLE',
  'ACCOUNT' = 'ACCOUNT',
  'UNKNOWN_ACCOUNT' = 'UNKNOWN_ACCOUNT',
  'SUBSIDY' = 'SUBSIDY',
  'SUBSIDY_FOR_CAPITAL_REPAIR' = 'SUBSIDY_FOR_CAPITAL_REPAIR',
  'UNKNOWN' = 'UNKNOWN',
  'MANUAL_ACCOUNT' = 'MANUAL_ACCOUNT',
  'RECOGNIZED' = 'RECOGNIZED'
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
export enum EnumBuildingType {
  'APARTMENT_BUILDING' = 'APARTMENT_BUILDING',
  'UNDERGROUND_PARKING' = 'UNDERGROUND_PARKING'
}
export enum EnumAreaType {
  'YARD_AREA' = 'YARD_AREA',
  'UNDERGROUND_PARKING_AREA' = 'UNDERGROUND_PARKING_AREA'
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
export const BuildingService = new BuildingControllerService();
export const AccessService = new AccessControllerService();
export const AreaService = new AreaControllerService();
