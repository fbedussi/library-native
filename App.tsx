// require('dotenv').config()

import './i18n'

import { StatusBar } from 'expo-status-bar'
import React, { Suspense } from 'react'
import { StyleSheet, View } from 'react-native'
import { Provider as PaperProvider } from 'react-native-paper'
import { Provider } from 'react-redux'
import styled from 'styled-components/native'

import Routes from './Routes'
import store from './store'
import ErrorBoundary from './store/errors/ErrorBoundary'
import { CircularProgress } from './styleguide'

// const GlobalStyle = createGlobalStyle`
//     /* html,
//     body,
//     #root {
//         height: 100%;
// 				font-family: Avenir, Arial, sans-serif;
//     }

//     * {
//         margin: 0;
//         padding: 0;
// 				box-sizing: border-box;
//     }

//     button {
//       background-color: transparent;
//       border: none;
//       appearance: none;
//       font: inherit;
//     } */
// `;

const FullHeightContainer = styled.View`
	height: 100%;
`;

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        {/* <GlobalStyle /> */}
        <ErrorBoundary>
          <Suspense fallback={<CircularProgress />}>
            <FullHeightContainer>
              <Routes />
              {/* <NotificationArea /> */}
            </FullHeightContainer>
          </Suspense>
        </ErrorBoundary>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
