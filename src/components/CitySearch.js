import React, {Component} from 'react'

class CitySearch extends Component{
    state = {
        city: '',
        showError: false
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

    handleError = () => {
        if(this.props.errorMatches){

        }
    };

    componentDidUpdate(prevProps){
        //console.log('prevProps.errorMatches', prevProps.errorMatches)
        //console.log('this.props.errorMatches', this.props.errorMatches)
        if(prevProps.errorMatches !== this.props.errorMatches){
            this.setState({ showError: true });

            setTimeout(() => {
                this.setState({ showError: false })
            }, 5000)
        }
    }

    render(){
        let display = this.state.showError ? 'block' : 'none';
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

                        <div className="tooltip" style={{display: `${display}`}}>
                            <i className="warning icon"></i>
                            {this.props.errorMatches}
                        </div>

                </div>
            </form>
        )
    }
}

export default CitySearch