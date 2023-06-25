import logo from './logo.svg';
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import RootLayout from './pages/RootLayout';
import MainMap from './pages/MainMap';


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


  return (
    <RouterProvider router = { router }/>
  );
}

export default App;
