import { Provider } from 'react-redux';
import { store } from './app/store';
import { ArticlesList } from './features/ArticlesList/ui/ArticlesList';
import './App.css';
import { Menu } from './features/Menu/ui';
import styled from 'styled-components';
import { Header } from './layouts/Header/ui/Header';
import { Footer } from './layouts/Footer/ui/Footer';

const StyledMain = styled.main`
  min-width: 320px;
  max-width: 640px;
  margin: 0 auto;
`;

function App() {
  return (
    <Provider store={store}>
      <Menu />
      <Header />
      <StyledMain>
        <ArticlesList />
      </StyledMain>
      <Footer />
    </Provider>
  );
}

export default App;
