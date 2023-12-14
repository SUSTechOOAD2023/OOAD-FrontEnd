'use server'


import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers"

export async function getCookie(request: Request) { // get cookie from next.js server, then set the cookie in req
  // await readCookie();
  const req = new NextRequest(request)
  const cookiesAll = cookies().getAll()
  console.log(cookies().getAll())
  console.log(5666)
  for (const cookie of cookiesAll) {
    req.cookies.set(cookie.name, cookie.value)
  }
  return req as Request
}

export async function setCookie(response: Response) { // get cookie from springboot server
  const res = new NextResponse(null, response)
  const cookiesStore = cookies()
  for (const cookie of res.cookies.getAll()) {
    cookiesStore.set(cookie.name, cookie.value)
  }
  return res
}

export async function clearCookie() {
  const cookiesAll = cookies().getAll()
  for (const cookie of cookiesAll) {
    cookies().delete(cookie.name)
  }
} 

export async function testCookie() {
  return cookies().getAll().length !== 0;
}
