import Dashboard from "@/components/Dashboard"
import Login from "@/components/Login"
import Main from "@/components/Main"

export const metadata = {
    title: "Feedback | Dashboard",
}

export default function DashboardPage(){

    const isAuthenticated = false
    const children = {
        <Login />
        <Dashboard />
    }

    if (isAuthenticated){
        children = {
            <Dashboard />
        }
    }

    return (
        <Main>
            {children}
        </Main>
    )
}