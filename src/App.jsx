import logo from './logo.svg';
import './App.css';
import { actions } from './store/store';
import { useDispatch, useSelector } from 'react-redux';

const Layout = ({ children }) => (
  <div className='App'>
    <header className='App-header'>{children}</header>
  </div>
);

const Loader = () => (
  <Layout>
    <img src={logo} className='App-logo' alt='logo' />
  </Layout>
);

const List = ({ error, users }) => {
  const dispatch = useDispatch();

  const getUsersHandler = async () => dispatch(actions.getUsersFetch());
  const clearUsersHandler = async () => dispatch(actions.clearUsers());

  return (
    <>
      {error && <h1>{error}</h1>}
      {error ? (
        <button onClick={getUsersHandler}>Reset</button>
      ) : (
        <button onClick={getUsersHandler}>Get users</button>
      )}
      {!!users.length && <button onClick={clearUsersHandler}>Clear users</button>}
      <ul>
        {users.map((user) => {
          return <li key={user.id}>{user.name}</li>;
        })}
      </ul>
    </>
  );
};

const App = () => {
  const {
    users: { users, isLoading, error },
  } = useSelector((state) => state);

  return <Layout>{isLoading ? <Loader /> : <List users={users} error={error} />}</Layout>;
};

export default App;
