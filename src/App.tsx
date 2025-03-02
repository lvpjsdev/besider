// import { slide as Menu } from 'react-burger-menu';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ArticlesList } from './features/ArticlesList/ui/ArticlesList';

function App() {
  return (
    <Provider store={store}>
      {/* <Menu>
        <a id="home" className="menu-item" href="/">
          Home
        </a>
        <a id="about" className="menu-item" href="/about">
          About
        </a>
        <a id="contact" className="menu-item" href="/contact">
          Contact
        </a>
        <a className="menu-item--small" href="">
          Settings
        </a>
      </Menu> */}
      <main>
        <ArticlesList />
      </main>
    </Provider>
  );
}

export default App;
