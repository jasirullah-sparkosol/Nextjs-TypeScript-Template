// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project import
// @ts-ignore
import Search from './Search';
// @ts-ignore
import Message from './Message';
// @ts-ignore
import Profile from './Profile';
// @ts-ignore
import FullScreen from './FullScreen';
// @ts-ignore
import Notification from './Notification';
// @ts-ignore
import MobileSection from './MobileSection';

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';
import DrawerHeader from 'layout/DashboardLayout/Drawer/DrawerHeader';

// ==============================|| HEADER - CONTENT ||============================== //

export default function HeaderContent() {
    const { menuOrientation } = useConfig();

    const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

    // eslint-disable-next-line react-hooks/exhaustive-deps

    return (
        <>
            {menuOrientation === MenuOrientation.HORIZONTAL && !downLG && <DrawerHeader open={true} />}
            {/*{!downLG && <Search />}*/}
            {downLG && <Box sx={{ width: '100%', ml: 1 }} />}

            {/*<Notification />*/}
            {/*<Message />*/}
            {/*{!downLG && <FullScreen />}*/}
            {/*{!downLG && <Profile />}*/}
            {/*{downLG && <MobileSection />}*/}
        </>
    );
}
