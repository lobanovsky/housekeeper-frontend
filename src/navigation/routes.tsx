import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    BankOutlined,
    CloudUploadOutlined,
    DashboardOutlined,
    DollarOutlined,
    GroupOutlined,
    HomeOutlined,
    SettingOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-dom';
import {GateIcon} from 'icons/gate';
import {showPaymentsImportModal} from 'pages/payments/import';
import {showGatesImportModal} from 'pages/gates/import';
import {ExpenseIcon} from "../icons/expense";


export const NavigationItems: any = [
    {
        key: '/rooms',
        icon: <HomeOutlined/>,
        title: 'Помещения',
        label: <Link to='/rooms'>Помещения</Link>
    },
    {
        key: '/counters',
        icon: <DashboardOutlined/>,
        title: 'Счётчики',
        label: <Link to='/counters'>Счётчики</Link>
    },
    {

        key: '/gates-home',
        icon: <GateIcon/>,
        label: 'Шлагбаумы',

        children: [
            {
                key: '/gates',
                icon: <GateIcon/>,
                title: 'Шлагбаумы',
                label: <Link to='/gates'>Шлагбаумы</Link>,
            },
            {
                key: '/import-gates',
                icon: <CloudUploadOutlined/>,
                title: 'Загрузить файл с шлагбаумами',
                onClick: showGatesImportModal,
                label: 'Загрузить файл с шлагбаумами'
            },

        ]
    },

    {
        key: '/payments',
        icon: <DollarOutlined/>,
        label: 'Платежи',
        children: [
            {
                key: '/payments-incoming',
                icon: <ArrowDownOutlined/>,
                title: 'Входящие платежи',
                label: <Link to='/payments-incoming'>Входящие платежи</Link>
            },
            {
                key: '/payments-outgoing',
                icon: <ArrowUpOutlined/>,
                title: 'Исходящие платежи',
                label: <Link to='/payments-outgoing'>Исходящие платежи</Link>
            },
            {
                key: '/import-payments',
                icon: <CloudUploadOutlined/>,
                title: 'Загрузить файл с платежами',
                onClick: showPaymentsImportModal,
                label: 'Загрузить файл с платежами'
            }
        ]
    },
    {
        key: '/expenses',
        icon: <ExpenseIcon/>,
        title: 'Траты',
        label: <Link to='/expenses'>Траты</Link>
    },
    {

        key: '/admin',
        icon: <SettingOutlined/>,
        label: 'Администрирование',

        children: [
            {
                key: '/uploaded-files',
                icon: <GroupOutlined/>,
                title: 'Загруженные файлы',
                label: <Link to='/uploaded-files'>Загруженные файлы</Link>,
            },
            {
                key: '/counterparties',
                icon: <BankOutlined/>,
                title: 'Компании-поставщики',
                label: <Link to='/counterparties'>Компании-поставщики</Link>,
            }
        ]
    },
]


export const getNavigationItemByPathname = (pathname: string, item = {
    key: '',
    children: []
}): any => {
    let result = null;

    if (pathname == item.key) {
        result = item;
        // @ts-ignore
    } else if ((item.children || []).length) {
        // @ts-ignore
        const children = item.children || [];
        for (let i = 0; i <= children.length && !result; i++) {
            result = getNavigationItemByPathname(pathname, children[i]);
        }
    }

    return result

}
