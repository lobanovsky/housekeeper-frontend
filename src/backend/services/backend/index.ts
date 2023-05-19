/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

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

export class PaymentReportControllerService {
  /**
   * Find all outgoing payments by filter
   */
  findAllOutgoingPaymentsByFilter(
    params: {
      /** requestBody */
      body?: OutgoingPaymentsFilter;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/reports/outgoing-payments';

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
      configs.params = { pageNum: params['pageNum'], pageSize: params['pageSize'] };

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

export class FileControllerService {
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
  /**
   * Remove payments by file id
   */
  removePaymentsByFileId(
    params: {
      /**  */
      fileId: number;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/files/payments/{fileId}';
      url = url.replace('{fileId}', params['fileId'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

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
  makeRoomsReport(options: IRequestOptions = {}): Promise<any> {
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
}

export interface PagePaymentVO {
  /**  */
  totalPages?: number;

  /**  */
  totalElements?: number;

  /**  */
  size?: number;

  /**  */
  content?: PaymentVO[];

  /**  */
  number?: number;

  /**  */
  sort?: SortObject;

  /**  */
  pageable?: PageableObject;

  /**  */
  numberOfElements?: number;

  /**  */
  first?: boolean;

  /**  */
  last?: boolean;

  /**  */
  empty?: boolean;
}

export interface PageableObject {
  /**  */
  offset?: number;

  /**  */
  sort?: SortObject;

  /**  */
  paged?: boolean;

  /**  */
  unpaged?: boolean;

  /**  */
  pageNumber?: number;

  /**  */
  pageSize?: number;
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

export interface SortObject {
  /**  */
  empty?: boolean;

  /**  */
  unsorted?: boolean;

  /**  */
  sorted?: boolean;
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

export interface Link {
  /**  */
  href?: string;

  /**  */
  templated?: boolean;
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

export const PaymentService = new PaymentControllerService();
export const PaymentReportService = new PaymentReportControllerService();
export const FileService = new FileControllerService();
export const DecisionService = new DecisionControllerService();
export const DecisionReportService = new DecisionReportControllerService();
export const RoomReportService = new RoomReportControllerService();
	