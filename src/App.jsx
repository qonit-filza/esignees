import React from 'react';
import router from './routers';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import store from './stores';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <ToastContainer
        hideProgressBar
        newestOnTop
        position="bottom-right"
        autoClose={3000}
      />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
