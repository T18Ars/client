import RegisterForm from "./register-form";
import { unstable_setRequestLocale } from 'next-intl/server'

export default function RegisterPage({params: { locale }} : { params: { locale: string }}){
    unstable_setRequestLocale(locale)
    return(
        <RegisterForm />
    );
}