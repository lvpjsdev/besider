import { Provider } from 'react-redux';
import { store } from './app/store';
import { ArticlesList } from './features/ArticlesList/ui/ArticlesList';
import './App.css';
import { Menu, MenuItem } from './features/Menu/ui';

function App() {
  return (
    <Provider store={store}>
      <Menu>
        <MenuItem label="Science" onClick={() => {}} />
        <MenuItem label="General" onClick={() => {}} />
        <MenuItem label="Entertainment" onClick={() => {}} />
        <MenuItem label="Technology" onClick={() => {}} />
        <MenuItem label="Business" onClick={() => {}} />
        <MenuItem label="Health" onClick={() => {}} />
        <MenuItem label="Sports" onClick={() => {}} />
      </Menu>
      <main>
        <ArticlesList />
      </main>
    </Provider>
  );
}

export default App;
