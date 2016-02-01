/**
 * Created by aquile_bernadotte on 23.01.16.
 */
class Store{
    constructor(){
        this.state = {
            inputText: '',
            list: [
                "Element1",
                "Element2"
            ]
        };
    }

    dispatch(action){
        //action type

        console.log('dispatch', action);

        const oldState = this.state;
        const  newState = this.reduce(oldState, action);

        if (oldState !== newState && typeof this.onChange === "function"){
            this.state = newState;
            this.onChange();
        }
    }

    getState(){
        return this.state;
    }

    reduce(state, action){
        switch (action.type){
            case 'ADD':
                if (state.inputText){
                    return {
                        ...state,
                        inputText: '',
                        list: [...state.list, state.inputText]
                    };
                } else {
                    return state;
                }
            case 'DELETE':
                return {
                    ...state,
                    list: state.list.filter((item, index) => index !== action.index)
                };
            case 'UPDATE':
                return {
                    ...state,
                    inputText: action.inputText
                };
            default:
                return state;
        }
    }
}


export default function configureStore(){
    return new Store();
}