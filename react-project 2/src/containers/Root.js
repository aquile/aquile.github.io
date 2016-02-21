/**
 * Created by aquile_bernadotte on 23.01.16.
 */
import React, {Component} from 'react';
import logoUrl from '!file!../images/logo.png';
import ListItem from '../components/ListItem';
import ItemInput from '../components/ItemsInput';


export default class Root extends Component {
    render() {

        const {state, actionCreators} =  this.props;

        const stateString = JSON.stringify(state, null, '\t');

        return <div>
            {stateString}
            <br/>
            <ItemInput text={state.inputText}
                       onChange={ e => actionCreators.updateActionCreator(e.value)}
                       onAdd={actionCreators.addActionCreator}
                />
            <br/>

            <h1>List</h1>
            <ul>
                {
                    state.list.map((item, i) =>
                            <ListItem key={i}
                                      text={item}
                                      onDelete={() => actionCreators.deleteActionCreator(i)}/>
                    )
                }
            </ul>
            <img src={logoUrl}/>

            <div className="red-text">hello</div>
        </div>;
    }
};