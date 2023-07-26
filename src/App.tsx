import React from 'react';
import Main from './components/Main';
import {Provider} from "react-redux";
import store from './store';
import './styles/main.css';

interface Props{
}

const App : React.FC<Props> = (props = {}) => {
    return(<Provider store={store}>
        <Main/>
    </Provider>);
}

export default App;
