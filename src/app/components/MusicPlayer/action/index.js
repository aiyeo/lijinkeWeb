import helper from "libs/helper"
export const GET_MUSIC = "get_music"

export default function(){
    return async function(dispatch){
        const file = await helper.getJson('/getMusicSrc')
        dispatch({
            type:GET_MUSIC,
            src:file
        })
    }
}