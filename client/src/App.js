import './App.css';
import { Main } from './components';
import Login from './Page/Login';
import Register from './Page/Register';
import Home from './Page/Home';
import {Routes, Route, Navigate} from 'react-router-dom'
import { CurrentUsers, ChatSection, Welcome } from './components';
import { useSelector } from 'react-redux';

function App() {
  const lightTheme = useSelector((e) => e.themeKey);
  return (
    <div className={'App' + ((lightTheme ? "" : " app-dark"))}>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/report' element={<Register/>}/>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='main' element={<Main/>}>
           <Route path='user' element={<CurrentUsers/>}/>
           <Route path='chat' element={<ChatSection/>}/>
           <Route path='welcome' element={<Welcome/>}/>
          </Route>
        </Routes>
    </div>
  );
}

export default App;
