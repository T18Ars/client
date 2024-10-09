import LoginForm from "./login-form";
import { unstable_setRequestLocale } from 'next-intl/server'

export default function LoginPage({params: { locale }} : { params: { locale: string }}){
    unstable_setRequestLocale(locale)
    return(
        <LoginForm />
    );
}