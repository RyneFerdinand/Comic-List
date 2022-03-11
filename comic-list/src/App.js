import { BrowserRouter as Router, Route, Routes,  } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import HomePage from './pages/home-page/HomePage';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons'
import Footer from './components/footer/Footer';

library.add(faBars);
library.add(faPlus);

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
        </Routes> 
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
