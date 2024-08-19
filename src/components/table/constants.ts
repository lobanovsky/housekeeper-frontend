import { PaginationConfig } from "antd/es/pagination/Pagination";

export const SUMM_REGEX = /^(\d{1,15})([.,]\d{1,2})?$/;

export const TotalRenderer = (total: number, range: [number, number]) => `${range[0]}-${range[1]} из ${total}`;

export const TablePaginationConfig: PaginationConfig = {
  size: "small",
  hideOnSinglePage: false,
  position: "top",
  // position: ["topRight" as PaginationPosition],
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 50, 100],
  locale: { items_per_page: "/ стр" },
  showTotal: TotalRenderer
};
