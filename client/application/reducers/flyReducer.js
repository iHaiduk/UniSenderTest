/**
 * Created by igor on 11.02.17.
 */

const onlyUnique = (value, index, self) => self.indexOf(value) === index;

export default function reducer (state = {}, action) {
    switch (action.type) {
        case "LOAD_DATA": {
            state = {
                ...state,
                ...action.data,
                carriers: [
                    {
                        name: 'All',
                        active: true
                    },
                    ...action.data.flights.map(v => v.carrier).filter(onlyUnique).map(name => {
                        return {name, active: false};
                    })
                ]
            };
            break;
        }
        case "SET_FILTER": {
            let carriers = (state.carriers || []).map((val, key) => {
                val.active = key === action.filter;
                return val;
            });
            state = {...state, carriers, filter: action.filter === 0 ? null : state.carriers[action.filter].name};
            break;
        }
    }

    return state;
}
