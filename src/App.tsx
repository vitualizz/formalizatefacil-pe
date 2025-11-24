import { useState } from "react";
import OnboardingForm from "./components/OnboardingForm";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { Sales } from "./components/Sales";
import { useMerchantStore } from "@/stores/useMerchantStore";
import { Pages } from "./domain/entities/Pages";

const App = () => {
  const { isRegistered, clearMerchant } = useMerchantStore();
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.Dashboard);

  const handleLogout = () => {
    clearMerchant();
    setCurrentPage(Pages.Dashboard);
  };

  if (!isRegistered) {
    return <OnboardingForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
      />
      <main>
        {currentPage === Pages.Dashboard && <Dashboard />}
        {currentPage === Pages.Sales && <Sales />}
      </main>
    </div>
  );
};

export default App;
