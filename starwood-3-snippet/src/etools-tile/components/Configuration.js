import React, {Component} from 'react';

//    OOП =============================== потому что:

export default class Configuration extends Component { // <- наследование
    constructor() {
        super();
// 1. state is present << INITIAL STATE >> КОНСТРУКТОР СОЗДАЕТ НАЧАЛЬНЫЙ СТЕЙТ
        this.state = {
            tileTitle: 'My eTools',
            ID: '2006',
            message: 'You do not have access to any eTools',
        };
    }

// 2. Methods of this class >> МЕТОДЫ ЭТОГО КЛАССА
    render() {
        const {tileTitle, ID, message} = this.state;

        return <div>
            <h2>Configure eTools Tile</h2>

            <form className="trending-form" onSubmit={e => this.save(e)} name="configForm">

                { /*  set interval & images URL  <<<<<<<<<<<<<<<<<<<<<< так писать коменты*/ }
                <label>
                    <p>Set tile title</p>

                    { /* АНОНИМНЫЕ ФУНКЦИИ, КОТОРЫЕ МЕНЯЮТ СТЕЙТ - ЧТО-ТО С НИМ ДЕЛАЮТ */ }
                    <p><input type="text"
                              onChange={e => this.setState({tileTitle:e.target.value})}
                              value={tileTitle}/>
                    </p>

                </label>

                <label>
                    <p>Set parent placeID</p>

                    <p><input type="text"
                              onChange={e => this.setState({ID:e.target.value})}
                              value={ID}/>
                    </p>

                </label>

                <label>
                    <p>Set default message if user does not have access to any spaces</p>

                    <p><input type="text"
                              onChange={e => this.setState({message:e.target.value})}
                              value={message}/>
                    </p>

                </label>


                { /* submit form */ }
                <button className="submit-button"
                        type="submit">
                    Save changes
                </button>

            </form>
        </div>;
    }

//===================== ЭТО ТОЖЕ МЕТОДЫ!

    // Компонент попал в ДОМ
    componentDidMount() {
        gadgets.window.adjustHeight();

        jive.tile.onOpen(config => this.onConfig(config));
    }

    /*
     //
     //setState(newState){
     //    apply(this.state, newState);
     //    this.render();
     //}
     */

    //onConfig({data}) { // === config.data
    onConfig(config) {
        if (config.data) {
            const {tileTitle,ID,message} = config.data;
            this.setState({tileTitle, ID, message});
            console.log(config.data)
        } else {
            //data = this.setState;
            // https://facebook.github.io/react/docs/component-api.html
        }
    }

    // Компонент изменился в ДОМе
    componentDidUpdate() {
        gadgets.window.adjustHeight();
    }

    save(e) {
        e.preventDefault && e.preventDefault();

        //const {tileTitle,ID,message} = this.state;

        const newConfig = {
            data: this.state
        };

        window.newConfig = newConfig;
        jive.tile.close(newConfig, {});


        return false;
    }
}