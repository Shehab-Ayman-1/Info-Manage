export const roles = [
    { _id: "1", value: "admin", title: "Admin" },
    { _id: "2", value: "member", title: "Member" },
];

export const noOfMonths = Array(12)
    .fill(0)
    .map((itm, index) => ({ _id: `${index + 1}`, value: `${index + 1} months`, title: `${index + 1} Months` }));
