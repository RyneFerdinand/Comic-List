import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/header/Header";
import HomePage from "./pages/home-page/HomePage";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBars, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Footer from "./components/footer/Footer";
import FavoriteProvider from "./Context/FavoriteProvider";
import ComicPage from "./pages/comic-page/ComicPage";
import DetailPage from "./pages/detail-page/DetailPage";
import ListPage from "./pages/list-page/ListPage";

library.add(faBars);
library.add(faMagnifyingGlass);

function App() {

  return (
    <FavoriteProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/comic/:id" element={<DetailPage key={props => props.match.params.id} />} />
          <Route path="/comic" element={<ComicPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
        <Footer />
      </Router>
    </FavoriteProvider>
  );
}

export default App;
