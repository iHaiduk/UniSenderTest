/**
 * In this file, we create a React component
 * which incorporates components provided by Material-UI.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect((store) => {
    const {carriers} = store.fly;
    return {carriers};
},
    dispatch => ({
        setFilter: (filter) => {
            dispatch({type: 'SET_FILTER', filter});
        }
    })
)
class List extends Component {

    static propTypes = {
        carriers: PropTypes.array,
        setFilter: PropTypes.func
    };

    constructor (props, context) {
        super(props, context);
    }

    render () {
        return (
            <div className="col-sm-3 col-md-2 sidebar">
                <ul className="nav nav-sidebar">
                    {(this.props.carriers || []).map((v, k) => (
                        <li
                            key={k}
                            className={v.active ? 'active' : ''}
                            onClick={this.props.setFilter.bind(this, k)}
                        >
                            <a href="#">{v.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default List;
