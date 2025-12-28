import SignInForm from "@/components/auth/SignInForm";
import AuthLayout from "@/components/auth/AuthLayout";

export default function SignInPage() {
    return (
        <AuthLayout imageSrc="/images/signIn.png">
            <SignInForm />
        </AuthLayout>
    );
}
