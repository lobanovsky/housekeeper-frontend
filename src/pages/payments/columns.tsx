import { dateTimeRenderer, summRenderer } from "utils/utils";
import { ColumnsType, ColumnType } from "antd/es/table";
import { CheckCircleFilled, CloseCircleFilled, EditOutlined } from "@ant-design/icons";
import { EnumPaymentVOType, PaymentVO } from "../../backend/services/backend";
import { Button, Typography } from "antd";
import { showPaymentEditModal } from "./edit-modal";

interface PaymentColumnType<T> extends ColumnType<T> {
  outgoing?: boolean;
}

const copyableRenderer = (v: string | number) => <Typography.Text copyable>{String(v)}</Typography.Text>;

export const accountNumberRenderer = (accountNumber: string = "") => {
  const groups = [];

  let startIndex = 0;

  for (startIndex = 0; startIndex <= accountNumber.length; startIndex += 4) {
    groups.push(accountNumber.substring(startIndex, startIndex + 4));
  }

  return groups.length ? groups.join(" ") : accountNumber;
};

const personalAccountRenderer = (accountNumber: string = "") => accountNumber.length ?
  `${accountNumber.substring(0, 4)} ${accountNumber.substring(4, 50)}` : "";


const commonPaymentColumns = ({ reloadTable }: { reloadTable?: () => void }): PaymentColumnType<PaymentVO>[] => [
  {
    dataIndex: "date",
    title: "Дата",
    render: dateTimeRenderer
  },
  {
    dataIndex: "fromInn",
    title: "ИНН отправителя",
    outgoing: false,
    render: copyableRenderer
  },
  {
    dataIndex: "fromName",
    title: "Отправитель",
    outgoing: false,
    render: copyableRenderer
  },
  {
    dataIndex: "toInn",
    title: "ИНН получателя",
    outgoing: true,
    render: copyableRenderer
  },
  {
    dataIndex: "toName",
    title: "Получатель",
    outgoing: true,
    render: copyableRenderer
  },
  {
    dataIndex: "bankName",
    title: "Банк",
    render: copyableRenderer
  },
  {
    dataIndex: "toAccount",
    title: "Счёт поступления",
    outgoing: false,
    render: (toAccount = "", record) =>
      <div>
        {toAccount ? <Typography.Text copyable={{ text: toAccount }}>
          {accountNumberRenderer(toAccount)}
        </Typography.Text> : " - "}
        <Button
          size="small"
          className="edit-btn"
          onClick={() => {
            showPaymentEditModal({ payment: record, onSuccess: reloadTable });
          }}>
          <EditOutlined />
        </Button>
      </div>
  },
  {
    dataIndex: "incomingSum",
    title: "Сумма",
    render: (sum: number) => <Typography.Text copyable={{ text: String(sum) }}>{summRenderer(sum)}</Typography.Text>
  },
  {
    dataIndex: "purpose",
    title: "Назначение платежа"
  },
  {
    dataIndex: "account",
    title: "Тип платежа",
    outgoing: false,
    render: (account: string, payment: PaymentVO) => {
      const { type, typeName, typeColor, bankName = "" } = payment;
      const isUnknownSource = type === EnumPaymentVOType.UNKNOWN_ACCOUNT || type === EnumPaymentVOType.UNKNOWN;
      const iconStyle = { color: typeColor, marginRight: 4 };
      return type ? <div className={`payment-type ${type}`}>
        {isUnknownSource ? <CloseCircleFilled style={iconStyle} /> : <CheckCircleFilled style={iconStyle} />}
        {type === EnumPaymentVOType.ACCOUNT || type === EnumPaymentVOType.MANUAL_ACCOUNT ? `Л/с ${personalAccountRenderer(account)}` :
          (isUnknownSource ? "не определён" : typeName)}
      </div> : "";
    }
  }
];

export const getPaymentColumns = ({ isOutgoing, reloadTable }: {
  isOutgoing: boolean,
  reloadTable?: () => void
}): ColumnsType<PaymentVO> => {
  const commonColumns = commonPaymentColumns({ reloadTable });
  const result = commonColumns.filter(({ outgoing }) => typeof outgoing !== "boolean" || outgoing === isOutgoing);
  return result.map(({ outgoing, ...column }) => ({
    ...(column as ColumnType<PaymentVO>),
    className: column.dataIndex as string
  }));
};
