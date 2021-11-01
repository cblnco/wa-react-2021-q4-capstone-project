import Footer from './components/Footer';
import Header from './components/Header';
import Root from './components/Root';
import GlobalStyle from './GlobalStyle';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import '@fontsource/metropolis';
import ScrollToTop from './utils/ScrollToTop';

const AppContainer = styled.div`
  position: relative;
  min-height: 100vh;
`;

const App = () => (
  <Router>
    <GlobalStyle />
    <ScrollToTop />
    <AppContainer>
      <Header />
      <Root />
      <Footer />
    </AppContainer>
  </Router>
);

export default App;
