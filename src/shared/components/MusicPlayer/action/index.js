import helper from "libs/helper"
export const UPLOAD_AUDIO = "upload_audio"

export default function(){
    return async function(dispatch){
        const audioFile = await helper.getJson('/music/')
        console.log(audioFile);
        // dispatch({
        //     type:UPLOAD_AUDIO,
        //     audioFile
        // })
    }
}