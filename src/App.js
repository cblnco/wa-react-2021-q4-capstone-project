import Footer from './components/Footer';
import Header from './components/Header';
import MainPage from './components/MainPage';
import GlobalStyle from './GlobalStyle';
import { BrowserRouter as Router } from 'react-router-dom';
import '@fontsource/metropolis';

// box-shadow: 13px 13px 0px -4px rgb(0, 0, 0);

const App = () => (
  <Router>
    <GlobalStyle />
    <Header />
    <MainPage />
    <Footer />
  </Router>
);

export default App;
