import { ARTICLE_DETAIL, PAGE_VIEW, TOGGLE_LIKE } from "../action"
const nameInitialState = []

export default function (state = nameInitialState, action) {
    const { type } = action;
    switch (type) {
        case ARTICLE_DETAIL:
            return {
                ...state,
                articleInfo: action.info
            }
        case PAGE_VIEW:
            return {
                ...state,
                pageViewInfo: action.info
            }
        case TOGGLE_LIKE:
            return state
        default:
            return state
    }
}