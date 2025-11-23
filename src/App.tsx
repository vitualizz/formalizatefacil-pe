import OnboardingForm from "./components/OnboardingForm"
import { Dashboard } from "./components/Dashboard"
import { useMerchantStore } from "@/stores/useMerchantStore";

const App = () => {
  const { isRegistered } = useMerchantStore();
  return (
    <>
      {isRegistered ? <Dashboard /> : <OnboardingForm />}
    </>
  )
}

export default App
