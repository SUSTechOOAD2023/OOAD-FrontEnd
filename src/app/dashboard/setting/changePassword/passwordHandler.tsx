'use server'
import { getCookie } from "@/cookie"
import { getId } from "../../accountIdHandler"

const debug = process.env.debug
const path = process.env.path
export interface changePasswordInfo {
    old: string, 
    new: string
  }
export default async function postChange(param: changePasswordInfo) {
    const request = new Request(`${path}/account/modifyPassword?oldPassword=${param.old}&newPassword=${param.new}`, 
    {
      method: "POST", 
      headers: {
        'Content-Type': "application/json", 
      }
    }
    )
    // console.log(333)
    const res = await fetch(await getCookie(request))
    if (res.ok) {
      const resText = res.text()
      console.log(resText)
    console.log("ok")
      return resText
    } else {
        console.log(res)
        // console.log(999)
      return "Unknown error!"
    }
  }