'use client';

import { ReactNode, useEffect } from 'react';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';

// project import
import Drawer from './Drawer';
import Header from './Header';
// @ts-ignore
import Footer from './Footer';
import HorizontalBar from './Drawer/HorizontalBar';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { handlerDrawerOpen } from 'store/reducers/menu';

import { MenuOrientation } from 'config';
import useConfig from 'hooks/useConfig';

// third-party
import { useDispatch } from 'react-redux';

interface Props {
    children: ReactNode;
}

// ==============================|| MAIN LAYOUT ||============================== //

export default function DashboardLayout({ children }: Props) {
    const dispatch = useDispatch();
    const downXL = useMediaQuery((theme: Theme) => theme.breakpoints.down('xl'));
    const downLG = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));

    const { container, miniDrawer, menuOrientation } = useConfig();

    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

    // set media wise responsive drawer
    useEffect(() => {
        if (!miniDrawer) {
            dispatch(handlerDrawerOpen(!downXL));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [downXL]);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Header />
            {!isHorizontal ? <Drawer /> : <HorizontalBar />}
            <Box component="main" sx={{ width: 'calc(100% - 260px)', flexGrow: 1, p: { xs: 2, sm: 3 } }}>
                <Toolbar sx={{ mt: isHorizontal ? 8 : 'inherit' }} />
                <Container
                    maxWidth={container ? 'xl' : false}
                    sx={{
                        ...(container && { px: { xs: 0, sm: 2 } }),
                        position: 'relative',
                        minHeight: 'calc(100vh - 110px)',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <Breadcrumbs />
                    {children}
                    {/*<Footer />*/}
                </Container>
            </Box>
        </Box>
    );
}
