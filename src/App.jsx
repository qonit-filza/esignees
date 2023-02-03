import React from 'react';
import router from './routers';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import store from './stores';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
