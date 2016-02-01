import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';

import './style.css';

import configureStore from './store/configureStore.js';
const store = configureStore();

const rootContainer = document.createElement('div');
document.body.appendChild(rootContainer);


const actionCreators = {
    addActionCreator: function() {
        return {
            type: 'ADD'
        };
    },

    deleteActionCreator: function(index){
        return {
            type: 'DELETE',
            index: index
        };
    },

    updateActionCreator: function(inputText){
        return {
            type: 'UPDATE',
            inputText: inputText
        }
    }

};

function bindActionCreator(actionCreator, store){
    return function(...args){
        const action = actionCreator(...args);

        store.dispatch(action);
    }
}

actionCreators.addActionCreator = bindActionCreator(actionCreators.addActionCreator, store);
actionCreators.deleteActionCreator = bindActionCreator(actionCreators.deleteActionCreator, store);
actionCreators.updateActionCreator = bindActionCreator(actionCreators.updateActionCreator, store);

function renderRoot(){
    const state = store.getState();
    const  root = <Root state={state}
                        actionCreators={actionCreators}
        />;
    ReactDOM.render(root, rootContainer);
}

renderRoot();
store.onChange = renderRoot;