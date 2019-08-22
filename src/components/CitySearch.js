import React, {Component} from 'react'

class CitySearch extends Component{
    constructor(props){
        super(props);
        this.autocomplete = null;
        this.google = window.google;
    }
    state = {
        city: ''
    };

    componentDidMount(){
        this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})
        this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
    }

    handlePlaceSelect = () => {
        let addressObject = this.autocomplete.getPlace();
        let address = addressObject.address_components
        console.log('addressObject', addressObject)
        console.log('address', address)
       /* this.setState({
            city: addressObject.name
        })*/
    };

    handleChange = (e) => {
        this.setState({
            city: e.target.value
        })
    };


    handleSubmit = (e) => {
        e.preventDefault();
        this.props.handleSearch(this.state.city);
        this.setState({
            city: ''
        })
    };

    render(){
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="search-input">
                    <div className="ui icon input">
                        <input
                            id="autocomplete"
                            type="text"
                            placeholder="Search..."
                            onChange={this.handleChange}
                            value={this.state.city}
                        />
                        <button type="submit">
                            <i className="inverted circular search link icon"></i>
                        </button>
                    </div>
                    {this.props.errorMatches &&
                    <div className="tooltip">
                        <i className="warning icon"></i>
                        {this.props.errorMatches}
                    </div>
                    }
                </div>
            </form>

        )
    }
}

export default CitySearch


{/**/}