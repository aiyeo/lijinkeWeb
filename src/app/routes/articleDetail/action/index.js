import helper from "libs/helper"
export const ARTICLE_DETAIL = "article_detail"

export default function getArticleDetail (id) {
    return async function (dispatch) {
        const info = await helper.getJson("/articleDetail",{articleId:id})
            dispatch({
                type: ARTICLE_DETAIL,
                info
            })
        }
}
