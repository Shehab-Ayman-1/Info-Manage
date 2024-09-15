export const reasons = [
    "client-statement",
    "supplier-statement",
    "refund-client-statement",
    "refund-supplier-statement",
    "client-invoice-payment",
    "supplier-invoice-payment",
    "canceled-supplier-invoice",
    "client-payment",
    "supplier-payment",
];

export const todayReceipts = [
    { _id: "1", value: "all", title: "all" },
    { _id: "2", value: "sales", title: "sales" },
    { _id: "3", value: "purchases", title: "purchases" },
];

export const mainReasons = reasons.map((reason) => {
    const words = reason.split("-");
    const capitalize = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
    return capitalize.join(" ");
});
