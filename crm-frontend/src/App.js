import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavigationBar } from './Component/NavigationBar';
import { Home } from './Component/Home';
import { AddLead } from './Component/Addlead';
import { Lead } from './Component/Lead';

function App() {
  return (
    <div className="App">
         <>
            <BrowserRouter>
             <NavigationBar/>
              <Routes>
                 <Route path='/' element={<Home/>} />
                 <Route path='/add' element={<AddLead/>}/>
                 <Route path='/lead' element={<Lead/>}/>
              </Routes>
            </BrowserRouter>
         </>
    </div>
  );
}

export default App;
