import React, {useState} from 'react'

const CitySearch = (props) => {
   const [city, setCity] = useState('');

    const handleChange = (e) => {
        setCity(e.target.value)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleSearch(city);
        setCity('')
    };

    return(
        <form onSubmit={handleSubmit}>
            <div className="search-input">
                <div className="ui icon input">
                    <input
                        type="text"
                        placeholder="Search..."
                        onChange={handleChange}
                        value={city}
                    />
                    <button type="submit">
                        <i className="inverted circular search link icon"></i>
                    </button>
                </div>
                {props.errorMatches &&
                    <div className="tooltip">
                        <i className="warning icon"></i>
                        {props.errorMatches}
                    </div>
                }
            </div>
        </form>
    )
};

export default CitySearch
