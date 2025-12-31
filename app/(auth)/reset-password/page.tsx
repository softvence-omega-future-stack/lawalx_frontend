import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

export default function ResetPasswordPage() {
    return (
        <div className="w-full flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-[520px]">
                <ResetPasswordForm />
            </div>
        </div>
    );
}
