const guestOnlyRoutes = ['/', '/login', '/register'];

const authOnlyRoutes = ['/home', '/create', '/profile'];


const allowRouteAccess = (targetRoute, userIsAuthenticated) => {
    if (guestOnlyRoutes.includes(targetRoute) && userIsAuthenticated) {
        return "/home";
    }

    if (authOnlyRoutes.includes(targetRoute) && !userIsAuthenticated) {
        return "/";
    }

    return targetRoute;
}

export { allowRouteAccess };