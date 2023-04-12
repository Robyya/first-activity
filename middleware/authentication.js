export default function ({ store, redirect, route, $config }) {
    const { UNPROTECTED_ROUTES } = $config;
    if (!store.state.auth.user && !UNPROTECTED_ROUTES.includes(route.name)) {
        redirect({ name: 'index' })
    }
}