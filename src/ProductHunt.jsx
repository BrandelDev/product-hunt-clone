import { AuthProvider } from "./auth"
import { AppRouter } from "./router/AppRouter"

export const ProductHunt = () => {

    return (
        <>
            <AuthProvider>
                <AppRouter/>
            </AuthProvider>
        </>
    );
}