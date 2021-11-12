import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import StartScreen from './Pages/StartScreen/StartScreen';
import ListScreen from './Pages/ListScreen/ListScreen';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/new' exact element={<ListScreen/>}/>
        <Route path=':id' element={<ListScreen/>}/>
        <Route path='/' exact element={<StartScreen/>}/>
      </Routes>
    </Router>
  );
}

export default App;
