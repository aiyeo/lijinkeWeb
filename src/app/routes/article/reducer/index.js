import { ARTICLE_LIST,ARTICLE_RANKING,ARTICLE_UPLOAD } from "../action"
const nameInitialState = []

export default function (state = nameInitialState, action) {
    const { type } = action;
    switch (type) {
        case ARTICLE_LIST:
            return {
                ...state,
                lists:action.lists.list
            }
        case ARTICLE_RANKING:
            return {
                ...state,
                ranking:action.ranking
            }
        case ARTICLE_UPLOAD:
            return {
                ...state,
                uploadInfo:action.info
            }
        default:
            return state
    }
}