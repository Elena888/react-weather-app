import React, {Component} from 'react'

class CitySearch extends Component{
    state = {
        city: ''
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
