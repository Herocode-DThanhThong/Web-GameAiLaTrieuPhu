import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { globalReducer } from "./reducers/global";
import { questionReducer } from "./reducers/questionReducer";
import { rankReducer } from "./reducers/rankReducer";
import { userReducer } from "./reducers/user";
import { rootSaga } from "./sagas/rootSaga";
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  global: globalReducer,
  user: userReducer,
  questions: questionReducer,
  ranks: rankReducer,
});
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);
export default store;
