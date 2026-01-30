import ForgetPasswordForm from "@/components/auth/ForgetPasswordForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { Suspense } from "react";

export default function ForgetPasswordPage() {
    return (
        <AuthLayout imageSrc="/images/signIn.png">
            <Suspense fallback={<div>Loading...</div>}>
                <ForgetPasswordForm />
            </Suspense>
        </AuthLayout>
    );
}
