export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const thisYear = new Date().getFullYear();

export const years = [
    { _id: "1", value: `${thisYear}`, title: `${thisYear}` },
    { _id: "1", value: `${thisYear - 1}`, title: `${thisYear - 1}` },
    { _id: "2", value: `${thisYear - 2}`, title: `${thisYear - 2}` },
    { _id: "3", value: `${thisYear - 3}`, title: `${thisYear - 3}` },
    { _id: "4", value: `${thisYear - 4}`, title: `${thisYear - 4}` },
];
