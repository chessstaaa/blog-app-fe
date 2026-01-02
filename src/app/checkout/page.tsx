import CheckoutHeader from "./components/CheckoutHeader"
import OrderDetailCard from "./components/OrderDetailCard"
import PriceSummary from "./components/PriceSummary"
import PaymentMethod from "./components/PaymentMethod"
import UploadProofBox from "./components/UploadProofBox"
import CountdownExpire from "./components/CountdownExpire"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import WaitingAdminBanner from "./components/WaitingAdminBanner"

export default function CheckoutPage() {
    return (
        <>
            <Navbar />

            <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <WaitingAdminBanner />
                    <OrderDetailCard />
                    <PaymentMethod />
                    <UploadProofBox />
                </div>

                <div className="space-y-6">
                    <CountdownExpire />
                    <PriceSummary />
                </div>
            </div>

            <Footer />
        </>
    )
}
