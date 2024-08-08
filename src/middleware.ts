import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
//   console.log(token);
  if(!token) return NextResponse.redirect(new URL("/", request.url));

  if(request.nextUrl.pathname.startsWith("/admin") && token.role!=="ADMIN") return NextResponse.redirect(new URL("/", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/auth/:path+", "/admin/:path*", "/company/:path*"],
};
