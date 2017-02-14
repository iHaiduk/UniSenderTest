/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import dateFormat from 'dateformat';
import List from './list';

@connect((store) => {
    const {flights} = store.fly;
    const {filter} = store.fly;
    return {flights, filter};
},
    dispatch => ({
        loadData: (data) => {
            dispatch({type: 'LOAD_DATA', data});
        }
    })
)
class Main extends Component {

    static propTypes = {
        flights: PropTypes.array,
        filter: PropTypes.string,
        loadData: PropTypes.func
    };

    constructor (props, context) {
        super(props, context);
    }

    async componentDidMount () {
        try {
            const {data} = await axios.get((process.env.NODE_ENV === 'production' ? location.origin : 'http://localhost:3000') + '/data', {responseType: 'json'});
            this.props.loadData(data);
        } catch (err) {
            console.error(err);
        }
    }

    render () {
        const {flights} = this.props;
        const {filter} = this.props;
        return (
            <div>
            <List />
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                <h1 className="page-header">Dashboard</h1>

                <div className="row placeholders">
                    {(flights || []).filter(air => filter == null || air.carrier === filter).map((air, key) => (

                    <div className="col-sm-6 col-md-4" key={key}>
                        <div className="thumbnail">
                            <div className="caption">
                                <h3>{air.carrier} #{air.id}</h3>
                                <p>From: <strong>{air.direction.from}</strong></p>
                                <p>To: <strong>{air.direction.to}</strong></p>
                                <p>Arrival: <strong>{dateFormat(air.arrival, "mmmm dS, yyyy, HH:MM:ss")}</strong></p>
                                <p>Departure: <strong>{dateFormat(air.departure, "mmmm dS, yyyy, HH:MM:ss")}</strong></p>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>

            </div>
            </div>
        );
    }
}

export default Main;
