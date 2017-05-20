import { ARTICLE_DETAIL } from "../action"
const nameInitialState = []

export default function (state = nameInitialState, action) {
    const { type } = action;
    switch (type) {
        case ARTICLE_DETAIL:
            return {
                ...state,
                articleInfo:action.info
            }
        default:
            return state
    }
}