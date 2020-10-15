import React from "react";
import { Provider } from 'react-redux';
import store from './store';
import Form from './Form';

export const Abraham: React.FC = () => (
    <Provider store={store}>
        <Form/>
    </Provider>
)