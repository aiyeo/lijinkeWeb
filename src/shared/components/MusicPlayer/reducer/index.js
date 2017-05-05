import {UPLOAD_AUDIO} from "../action"

const nameInitialState = {}
export default function (state = nameInitialState, action) {
    const {type,audioFile} = action;
    switch (type) {
        case UPLOAD_AUDIO:
            console.log(audioFile);
        default:
            return state
    }
}