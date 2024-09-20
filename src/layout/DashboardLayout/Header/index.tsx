import { ReactNode, useMemo } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

// project import
import AppBarStyled from './AppBarStyled';
import HeaderContent from './HeaderContent';
import IconButton from 'components/@extended/IconButton';
import { handlerDrawerOpen } from 'store/reducers/menu';

import { DRAWER_WIDTH, MINI_DRAWER_WIDTH, MenuOrientation, ThemeMode } from 'config';
import useConfig from 'hooks/useConfig';

// assets
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';

// types
import { RootStateProps } from 'types/root';
import { MenuProps } from 'types/menu';

// third-party
import { useDispatch, useSelector } from 'react-redux';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //

export default function Header() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const downLG = useMediaQuery(theme.breakpoints.down('lg'));
    const { mode, menuOrientation } = useConfig();

    const menuMaster = useSelector<RootStateProps, MenuProps>((state) => state.menu);

    const drawerOpen = menuMaster.isDashboardDrawerOpened;

    const isHorizontal = menuOrientation === MenuOrientation.HORIZONTAL && !downLG;

    // header content
    const headerContent = useMemo(() => <HeaderContent />, []);

    const iconBackColor = mode === ThemeMode.DARK ? 'background.default' : 'grey.100';

    // common header
    const mainHeader: ReactNode = (
        <Toolbar>
            {!isHorizontal ? (
                <IconButton
                    aria-label="open drawer"
                    onClick={() => dispatch(handlerDrawerOpen(!drawerOpen))}
                    edge="start"
                    color="secondary"
                    variant="light"
                    sx={{
                        color: 'text.primary',
                        bgcolor: drawerOpen ? 'transparent' : iconBackColor,
                        ml: { xs: 0, lg: -2 }
                    }}>
                    {!drawerOpen ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                </IconButton>
            ) : null}
            {headerContent}
        </Toolbar>
    );

    // app-bar params
    const appBar: AppBarProps = {
        position: 'fixed',
        color: 'inherit',
        elevation: 0,
        sx: {
            borderBottom: '1px solid',
            borderBottomColor: 'divider',
            zIndex: 1200,
            width: isHorizontal
                ? '100%'
                : {
                      xs: '100%',
                      lg: drawerOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : `calc(100% - ${MINI_DRAWER_WIDTH}px)`
                  }
        }
    };

    return (
        <>
            {!downLG ? (
                <AppBarStyled open={drawerOpen} {...appBar}>
                    {mainHeader}
                </AppBarStyled>
            ) : (
                <AppBar {...appBar}>{mainHeader}</AppBar>
            )}
        </>
    );
}
