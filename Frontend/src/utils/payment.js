import api from "../lib/axios";

const RAZORPAY_SCRIPT = "https://checkout.razorpay.com/v1/checkout.js";

/* ── Lazy script loader ─────────────────────────────────────── */
let scriptLoaded = false;

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (scriptLoaded || window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT;
    script.onload  = () => { scriptLoaded = true; resolve(true); };
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/* ── Main function ──────────────────────────────────────────── */
/**
 * Initiate Razorpay checkout.
 */
export async function initiatePayment({ courseId, amount, user }) {
  // 1. Ensure Razorpay script is present
  const loaded = await loadRazorpayScript();
  if (!loaded) {
    throw new Error("Payment gateway could not be loaded. Check your internet connection.");
  }

  // 2. Create backend order
  const { data } = await api.post("/fees/create-order", { courseId, amount });
  const { order } = data.data;

  // 3. Open Razorpay modal
  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency || "INR",
      order_id: order.id,
      name: "Smart Computer Academy",
      description: `Course Fee Payment`,
      image: "/logo.png",
      prefill: {
        name:    user.name,
        email:   user.email,
        contact: user.phone || "",
      },
      theme: {
        color: "#1a3c6e",
      },
      modal: {
        ondismiss: () => reject({ cancelled: true, message: "Payment cancelled by user" }),
      },
      handler: async (response) => {
        try {
          // 4. Verify payment signature on backend
          const verification = await api.post("/fees/verify-payment", {
            razorpay_order_id:   response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature:  response.razorpay_signature,
          });
          resolve({ success: true, data: verification.data });
        } catch (verifyErr) {
          reject({ success: false, message: "Payment verification failed. Contact support." });
        }
      },
    });

    rzp.on("payment.failed", (resp) => {
      reject({
        success: false,
        code:    resp.error.code,
        message: resp.error.description || "Payment failed",
      });
    });

    rzp.open();
  });
}
