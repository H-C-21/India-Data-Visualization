
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import RootLayout from './pages/RootLayout';
import MainMap from './pages/MainMap';
let data1 = require('./Data/Map_fin.json');

const router = createBrowserRouter([
  { path: '/',
    element: <RootLayout/>,
    children:[{ 
      index: true,
      element: <MainMap/>
    }

    ] 
  }
]
);


function App() {
 try{ 
  if(!localStorage.getItem('map')){
    localStorage.setItem('map', JSON.stringify(data1))                                                                            
  }}catch(err){
      localStorage.setItem('map', '')
  }

  return (
    <RouterProvider router = { router }/>
  );
}

export default App;
