"use client";

import { ReactNode } from "react";

// next
import { SessionProvider } from "next-auth/react";

// project import
import ThemeCustomization from "themes";

import Locales from "components/Locales";
import ScrollTop from "components/ScrollTop";
// import RTLLayout from 'components/RTLLayout';
import Snackbar from "components/@extended/Snackbar";
import Notistack from "components/third-party/Notistack";
import { ReduxPersisted } from "../store";

// import { ConfigProvider } from 'contexts/ConfigContext';

// ==============================|| APP - THEME, ROUTER, LOCAL ||============================== //

export default function ProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <ReduxPersisted>
      {/*<ConfigProvider>*/}
      <ThemeCustomization>
        {/* <RTLLayout> */}
        <Locales>
          <ScrollTop>
            <SessionProvider refetchInterval={0}>
              <Notistack>
                <Snackbar />
                {children}
              </Notistack>
            </SessionProvider>
          </ScrollTop>
        </Locales>
        {/* </RTLLayout> */}
      </ThemeCustomization>
      {/* </ConfigProvider> */}
    </ReduxPersisted>
  );
}
