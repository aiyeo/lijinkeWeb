import { ARTICLE_LIST,ARTICLE_RANKING } from "../action"
const nameInitialState = []

export default function (state = nameInitialState, action) {
    const { type } = action;
    console.log(action);
    switch (type) {
        case ARTICLE_LIST:
            return {
                lists:action.lists
            }
        case ARTICLE_RANKING:
            return {
                ranking:action.ranking
            }
        default:
            return state
    }
}