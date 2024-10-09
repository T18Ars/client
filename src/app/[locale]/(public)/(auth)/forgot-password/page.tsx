import ForgotPasswordForm from "./forgot-password-form";
import { unstable_setRequestLocale } from 'next-intl/server'

export default function ForgotPasswordPage({params: { locale }} : { params: { locale: string }}){
    unstable_setRequestLocale(locale)
    return(
        <ForgotPasswordForm />
    );
}