import UserInfoCard from "./components/UserInfoCard"
import HistoryList from "./components/HistoryList"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function ProfilePage() {
    return (
        <div>
            <Navbar />
            <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 py-10">
                <div className="lg:col-span-1">
                    <UserInfoCard />
                </div>
                <div className="lg:col-span-2">
                    <HistoryList />
                </div>
            </div>
            <Footer />
        </div>

    )
}
