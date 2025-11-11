interface DashboardHeadingProps {
    title?: string;
    description?: string
}
const DashboardHeading = ({ title, description }: DashboardHeadingProps) => {
    return (
        <div className="space-y-2">
            <h1 className="text-xl md:text-3xl font-semibold text-gray-900">
                {title}
            </h1>
            <p className="text-sm text-pcolor mt-1">
                {description}
            </p>
        </div>
    )
}

export default DashboardHeading;