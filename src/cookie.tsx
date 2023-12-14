'use server'


import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"

export async function getCookie(request: Request) {
  // await readCookie();
  const req = new NextRequest(request)
  const cookiesAll = cookies().getAll()
  for (const cookie of cookiesAll) {
    req.cookies.set(cookie.name, cookie.value)
  }
  return req as Request
}

export async function setCookie(response: Response) {
  const res = new NextResponse(null, response)
  const cookiesStore = cookies()
  for (const cookie of res.cookies.getAll()) {
    cookiesStore.set(cookie.name, cookie.value)
  }
  console.log(cookies)
  // await writeCookie()
  return res
}

export async function clearCookie() {
  const cookiesAll = cookies().getAll()
  for (const cookie of cookiesAll) {
    cookies().delete(cookie.name)
  }
  // await writeCookie();
} 

export async function testCookie() {
  // console.log(cookies);
  console.log(cookies().getAll())
  return cookies().getAll().length !== 0;
}
// export async function addCookie() {
//   // console.log(6);
//   cookies.push("6")
//   console.log(cookies);
// }
