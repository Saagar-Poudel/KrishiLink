// No static import statement here for the esewajs library.

// The dynamic import() call returns a Promise.
// You need to await the result to get the module's exports.
export const loadEsewa = async () => {
  try {
    const esewaModule = await import("esewajs");
    // Access the exports from the esewaModule object
    const { EsewaPaymentGateway, EsewaCheckStatus } = esewaModule;
    return {
      EsewaPaymentGateway,
      EsewaCheckStatus,
    };
  } catch (error) {
    console.error("Failed to load esewajs module:", error);
    throw new Error("Failed to load Esewa payment gateway.");
  }
};