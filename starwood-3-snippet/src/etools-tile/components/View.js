import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as api from '../helpers/apiHelper'; // all from '../helpers/apiHelper' import here

export default class Root extends Component {
    constructor() {
        super();

        //model
        this.state = {
            searchQuery: '',
            condition: true,

            message: '',
            error: '',
            tileTitle: "",
            spaces: []
        };
    }


    //controller
    componentDidMount() {
        console.log('Root componentDidMount');

        const root = ReactDOM.findDOMNode(this); // get  .eTools-main-wrp
        const scroll = root.querySelector('#eTools-list-wrp');
        $(scroll).niceScroll({cursorcolor: "#3f7793"});


        api.resize();

        api.getConfig()
            .then(config => {
                this.setState({tileTitle: config.tileTitle, message: config.message});

                return api.getSpaceTree(config.ID);
            })
            .then(spaces => this.setState({spaces}))
            .catch(error => this.setState({error}));
    }


    //view
    render() {
        const {tileTitle, spaces, error, message, searchQuery} = this.state;

        if (error) {
            return <div className="eTools-main-wrp">
                <h2 className="eTools-title">{tileTitle}</h2>

                <p>{message}</p>
            </div>;
        }

        let filteredSpaces = spaces;

        if (searchQuery) {
            filteredSpaces = filteredSpaces.filter(space => space.name.toUpperCase().indexOf(searchQuery.toUpperCase()) !== -1);
        }

        return <div className="eTools-main-wrp">
            <h2 className="eTools-title">{tileTitle}</h2>
            <label>
                <input className="eTools-search-input" type="text"
                       value={searchQuery}
                       onChange={e => this.setState({searchQuery: e.target.value})}
                       placeholder="search a tool or application"/>
                {/*кадый раз когда вызывается сет стейт вызывается рендер*/}
            </label>

            <div className="eTools-list-wrp" id="eTools-list-wrp" style={{
                display: condition ? 'block' : 'none'
            }}>
                {filteredSpaces.map((space, index)  =>
                    <a key={index} className="eTools-link" href={space.url} target="_blank">
                        <p className="eTools-name">{space.name}</p>
                    </a>)}
            </div>
        </div>;
    }

    componentDidUpdate() {
        api.resize();
    }
}




