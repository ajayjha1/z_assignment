import logo from './logo.svg';
import './App.css';
import { BarChartByCountry } from './Components/BarChartByCountry';
import { PieChartByMaker } from './Components/PieChartByMaker';
import { CarAgePieChart } from './Components/CarAgePieChart';
import { VirtualizedList } from './Components/VirtualizedList';
import { CarList } from './Components/CarList';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<BarChartByCountry/>}/>
        <Route path='/PieChartByMaker' element={<PieChartByMaker/>}/>
        <Route path='/CarAgePieChart' element={<CarAgePieChart/>}/>
        <Route path='/VirtualizedList' element={<VirtualizedList/>} />
        <Route path='/CarList' element={<CarList/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
