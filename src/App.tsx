import { Provider } from 'react-redux';
import { store } from './app/store';
import { ArticlesList } from './features/ArticlesList/ui/ArticlesList';
import './App.css';
import { Menu } from './features/Menu/ui';

const lables = [
  'Science',
  'General',
  'Entertainment',
  'Technology',
  'Business',
  'Health',
  'Sports',
];

function App() {
  return (
    <Provider store={store}>
      <Menu labels={lables} />
      <main>
        <ArticlesList />
      </main>
    </Provider>
  );
}

export default App;
