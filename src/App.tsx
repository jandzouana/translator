import React from 'react';
import Main from './components/Main';
import {Provider} from "react-redux";
import store from './shared/store';
import './shared/styles/main.css';
import Header from "./components/Header";

interface Props{
}

const App : React.FC<Props> = (props = {}) => {
    return(<Provider store={store}>
        <div id={"app-container"}>
            <Header/>
            <Main/>
        </div>
    </Provider>);
}

export default App;
