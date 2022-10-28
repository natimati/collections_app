import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from '@mui/material';
import { theme } from './style';
import 'react-quill/dist/quill.snow.css';
import { UserContextProvider } from './context/UserContext.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch } from 'react-instantsearch-hooks-web';

const queryClient = new QueryClient();
const searchClient = algoliasearch('3HS4PEGVGR', 'e3e770b80eb60161a13626152506a67c');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserContextProvider>
          <QueryClientProvider client={queryClient}>
            <InstantSearch searchClient={searchClient} indexName="items">
              <App />
            </InstantSearch>
          </QueryClientProvider>
        </UserContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
