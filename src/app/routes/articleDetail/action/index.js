import helper from "libs/helper"
export const ARTICLE_DETAIL = "article_detail"
export const PAGE_VIEW = "pageView"
export const TOGGLE_LIKE = "toggle_like"

export default function getArticleDetail(id) {
    return async function (dispatch) {
        const info = await helper.postJson("/article/articleDetail", { articleId: id })
        dispatch({
            type: ARTICLE_DETAIL,
            info
        })
    }
}
export function addPageView(id, countTime) {
    return async function (dispatch) {
        const data = await helper.postJson("/article/addPageView", { articleId: id, countTime })
        dispatch({
            type: PAGE_VIEW
        })
    }
}

export function toggleLike(id, isLike) {
    return async function (dispatch) {
        const data = await helper.postJson("/article/toggleLike", { id, isLike })
        dispatch({
            type: TOGGLE_LIKE
        })
    }
}
