import { 
    ARTICLE_DETAIL, 
    TOGGLE_LIKE,
    PUBLISH_COMMENT,
    GET_ARTICLE_COMMENTS,
    TOGGLE_COMMENT_LIKE
 } from "../action"
 
const nameInitialState = []

export default function (state = nameInitialState, action) {
    const { type } = action;
    switch (type) {
        case ARTICLE_DETAIL:
            return {
                ...state,
                articleInfo: action.info
            }
        case TOGGLE_LIKE:
            return state
        case TOGGLE_COMMENT_LIKE:
            return state
        case PUBLISH_COMMENT:
            return {
                ...state,
                commentInfo:action.info
            }
        case GET_ARTICLE_COMMENTS:
            return {
                ...state,
                commentLists:action.lists
            }
        default:
            return state
    }
}