import helper from "libs/helper"
export const ARTICLE_DETAIL = "article_detail"

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


export function toggleLike(id, isLike) {
    return async function (dispatch) {
        const data = await helper.postJson("/article/toggleLike", { id, isLike })
        dispatch({
            type: TOGGLE_LIKE
        })
    }
}
