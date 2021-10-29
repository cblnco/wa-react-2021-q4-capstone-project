import Footer from './components/Footer';
import Header from './components/Header';
import MainPage from './components/MainPage';
import GlobalStyle from './GlobalStyle';
import '@fontsource/metropolis';

const App = () => (
  <div>
    <GlobalStyle />
    <Header />
    <MainPage />
    <Footer />
  </div>
);

export default App;
