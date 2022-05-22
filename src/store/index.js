import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';
import users from './store';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: { users: users },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(saga)
