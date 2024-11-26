import { RouterProvider } from "react-router-dom";
import root from "./router/root"
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="min-h-screen">
          <div className="container mx-auto text-center">
            <RouterProvider router={root}/>
            <h1 className="text-3xl font-bold text-gray-800">
            </h1>
          </div>
        </main>
        <Footer />
      </div>
    </Provider>
  );
}

export default App;