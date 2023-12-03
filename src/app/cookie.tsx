'use server'

import { NextRequest, NextResponse } from "next/server";

let cookies: any[] = []

export async function getCookie(request: Request) {
  const req = new NextRequest(request)
  for (const cookie of cookies) {
    req.cookies.set(cookie.name, cookie.value)
  }
  return req as Request
}

export async function setCookie(response: Response) {
  const res = new NextResponse(null, response)
  for (const cookie of res.cookies.getAll()) {
    cookies.push(cookie)
  }
  return res
}

export async function clearCookie() {
  cookies = []
} 

export async function testCookie() {
  return cookies
}
