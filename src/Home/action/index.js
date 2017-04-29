import helper from "libs/helper"
export const HOME_ACTION = "getHomeInfo"

export default function getHomeInfo(){
  return async function(dispatch){
      let data = await helper.getJson(`/test`)
      dispatch({
          type:HOME_ACTION,
          data
      })
  }
}