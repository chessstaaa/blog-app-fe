import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
    salt: "authjs.session-token",
  });
  const homeUrl = new URL("/", request.url);

  if (!token) return NextResponse.redirect(homeUrl);
  const userData = token.user as any;
  const userRole = userData.role;
  if (!userRole || userRole.toLowerCase() !== "organizer") {
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
