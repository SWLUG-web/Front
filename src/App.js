import { RouterProvider } from "react-router-dom";
import root from "./router/root"
import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <Header />
      <main className="min-h-screen">
        <div className="container mx-auto text-center">
        <RouterProvider router={root}/>
          <h1 className="text-3xl font-bold text-gray-800">
           
          </h1>
          {/* 이미지 섹션 추가 */}
         
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
