import {HOME_ACTION} from "../action"

const nameInitialState = {}
export default function (state = nameInitialState, action) {
    const {type,data} = action
    switch (action.type) {
        case HOME_ACTION:
            return {
                data
            }
        default:
            return state
    }
}