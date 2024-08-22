export const roles = [
    { _id: "1", value: "admin", title: "admin" },
    { _id: "2", value: "member", title: "member" },
];

export const noOfMonths = Array(12)
    .fill(0)
    .map((itm, index) => ({ _id: `${index + 1}`, value: `${index + 1} months`, title: `${index + 1} months` }));

export const subscriptions = [
    { _id: "1", value: "unsubscribe", title: "unsubscribe" },
    { _id: "2", value: "basic", title: "basic" },
];

export const additionalSubscription = [
    { _id: "1", value: "unsubscribe", title: "unsubscribe" },
    { _id: "2", value: "premium", title: "premium" },
    { _id: "3", value: "enterprise", title: "enterprise" },
];
