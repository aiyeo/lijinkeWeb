import helper from "libs/helper"

export const ARTICLE_DETAIL = "article_detail"
export const TOGGLE_LIKE = "toggle_like"
export const PUBLISH_COMMENT = "publish_comment"
export const GET_ARTICLE_COMMENTS = "get_article_comments"

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

export function publishComment(values) {
    return async function (dispatch) {
        const info = await helper.postJson("/article/publish-comment", values)
        dispatch({
            type: PUBLISH_COMMENT,
            info
        })
    }
}
export function getArticleComments(articleId) {
    return async function (dispatch) {
        const lists = await helper.getJson("/article/comment-lists", {articleId})
        dispatch({
            type: GET_ARTICLE_COMMENTS,
            lists
        })
    }
}
