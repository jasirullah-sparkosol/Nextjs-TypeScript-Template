// This is example of menu item without group for horizontal layout. There will be no children.
import { GiftOutlined } from '@ant-design/icons';

// third-party
import { FormattedMessage } from 'react-intl';

// type
import { NavItemType } from 'types/menu';

// ==============================|| MENU ITEMS - SAMPLE PAGE ||============================== //

const gift: NavItemType = {
    id: 'gifts',
    type: 'group',
    title: <FormattedMessage id="Gifts" />,
    url: '/gifts',
    icon: GiftOutlined
};

export default gift;
