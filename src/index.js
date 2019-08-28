import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers'
import { loadState, saveState }  from "./localStorage";

const persistedState = loadState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducers,
    persistedState,
    composeEnhancers(applyMiddleware(reduxThunk))
);

store.subscribe(() => {
    saveState({
        weather: store.getState().weather
    })
});

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#root')
);


