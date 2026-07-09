import { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";
import AppRouter from "./router";

// Loading fallback for lazy-loaded routes
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <Loader2 className="w-10 h-10 animate-spin text-primary" />
  </div>
);

function App() {
  return (
    <>
      <Suspense fallback={<PageLoader />}>
        <AppRouter />
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
