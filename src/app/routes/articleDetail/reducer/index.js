import { ARTICLE_DETAIL,PAGE_VIEW } from "../action"
const nameInitialState = []

export default function (state = nameInitialState, action) {
    const { type } = action;
    switch (type) {
        case ARTICLE_DETAIL:
            return {
                ...state,
                articleInfo:action.info
            }
        case PAGE_VIEW:
            return {
                ...state,
                pageViewInfo:action.info
            }
        default:
            return state
    }
}