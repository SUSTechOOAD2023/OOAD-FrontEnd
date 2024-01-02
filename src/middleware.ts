import { NextRequest, NextResponse } from 'next/server';
import { testCookie } from './cookie';
import { isLogin } from './app/landing';
import {getIdentity} from "@/app/dashboard/identityHandler";

export async function middleware(req: NextRequest) {
  const isAuthenticated = await isLogin(); // 替换为你的鉴权检查逻辑
  // console.log(isAuthenticated);
  
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }
  const pathname = req.nextUrl.clone().pathname
  // console.log(pathname)
  if (pathname.endsWith('viewInvitation')) {
    const identity = await getIdentity()
    if (identity !== 'admin')
      return NextResponse.redirect(new URL('/dashboard/accessDenied', req.url))
  }

  return NextResponse.next(); // 继续处理请求
}

async function checkAuthentication(req: NextRequest): Promise<boolean> {
  // 实现你的鉴权检查逻辑
  // 例如，检查请求中的 cookie 或调用外部服务
  return await testCookie();
}
export const config = {
  matcher: ['/dashboard/:path*']
}