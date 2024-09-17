type Effect = "opacity" | "translate";

export const animate = (effect: Effect) => {
    if (effect === "translate") {
        return {
            whileInView: { x: [-50, 0], scale: [1.2, 1] },
            transition: { duration: 0.5, ease: "easeInOut" },
        };
    }

    return {
        whileInView: { opacity: [0, 1], scale: [1.2, 1] },
        transition: { duration: 0.5, ease: "easeInOut" },
    };
};
