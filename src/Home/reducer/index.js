import {GET_MUSIC} from "../action"
const nameInitialState = {}
export default function (state = nameInitialState, action) {
    const {type,musicData} = action;
    switch (type) {
        case GET_MUSIC:
            return {
                musicData
            }
        default:
            return state
    }
}