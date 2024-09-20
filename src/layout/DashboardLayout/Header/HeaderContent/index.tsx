// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';

// project import
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Search from './Search';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Message from './Message';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Profile from './Profile';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import FullScreen from './FullScreen';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Notification from './Notification';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
