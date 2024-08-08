import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Protect These Paths By Direct To "/sign-in" If Not Authenticated
const routes = ["/"];
const isProtectedRoute = createRouteMatcher(routes);

const clerk = clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect();

    return NextResponse.next();
});

export const config = { matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"] };
export default clerk;
