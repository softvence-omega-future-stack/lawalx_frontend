import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import AuthLayout from "@/components/auth/AuthLayout";
import { Suspense } from "react";

export default function ResetPasswordPage() {
    return (
        <AuthLayout imageSrc="/images/signIn.png">
            <Suspense fallback={<div>Loading...</div>}>
                <ResetPasswordForm />
            </Suspense>
        </AuthLayout>
    );
}
