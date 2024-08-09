import Icon from '@ant-design/icons';

const BuildingSvg = () => <svg
    // enableBackground='new 0 0 64 64'
    viewBox='0 0 24 24'
    // stroke="currentColor"
    // fill='#42c3cf'
    fill='currentColor'
    width='1em'
    height='1em'
    // strokeLinecap="round"
    // strokeLinejoin="round"
    // strokeWidth="2"
>
    <g id="office">
        <path d="M12.5,13h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,12.5,13Z"/>
        <path d="M12.5,9h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,12.5,9Z"/>
        <path d="M12.5,5h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,12.5,5Z"/>
        <path d="M8.5,13h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,8.5,13Z"/>
        <path d="M8.5,9h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,8.5,9Z"/>
        <path d="M8.5,5h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,8.5,5Z"/>
        <path d="M16.5,13h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,16.5,13Z"/>
        <path d="M16.5,9h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,16.5,9Z"/>
        <path d="M16.5,5h-1a1,1,0,0,0,0,2h1A1,1,0,0,0,16.5,5Z"/>
        <path
            d="M22,21H21V2a1,1,0,0,0-1-1H4A1,1,0,0,0,3,2V21H2a1,1,0,0,0,0,2H22A1,1,0,0,0,22,21ZM10,21V19h4v2Zm6,0V18a1,1,0,0,0-1-1H9a1,1,0,0,0-1,1v3H5V3H19V21Z"/>
    </g>
</svg>

export const BuildingIcon = (props: any) => <Icon component={BuildingSvg} {...props} />;


