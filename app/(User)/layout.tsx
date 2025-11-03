import UserNavbar from "@/common/UserNavbar"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <UserNavbar />
      {children}
    </div>
  )
}

export default layout