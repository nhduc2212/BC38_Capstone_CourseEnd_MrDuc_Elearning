import './App.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import { Routes } from 'react-router-dom';
import { regularRoutes } from './configs/routes';
import { adminRoutes } from './configs/routes';
import Footer from './components/Footer';
import STTButton from './components/STTButton';
import { fetchLoggedInData } from './features/User/thunk';


function App() {
  const dispatch = useDispatch()
useEffect(()=>{dispatch(fetchLoggedInData)},[])
  return (
<BrowserRouter>
<Header/>
<Routes>
{regularRoutes.map(({path, component: Component})=>{
  return <Route path={path} element={<Component />}></Route>
})}
</Routes>
<STTButton/>

<Footer/>
<Routes>
{adminRoutes.map(({path, component: Component})=>{
  return <Route path={path} element={<Component />}></Route>
})}
</Routes>

</BrowserRouter>    
  );
}

export default App;
