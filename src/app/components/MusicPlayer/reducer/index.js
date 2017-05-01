import {GET_MUSIC} from "../action"
const nameInitialState = {}
export default function (state = nameInitialState, action) {
    const {type,src} = action;
    switch (action.type) {
        case GET_MUSIC:
            return {
                src
            }
        default:
            return state
    }
}