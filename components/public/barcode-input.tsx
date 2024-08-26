"use client";
import { useState } from "react";

type BarcodeInputProps = {};
export const BarcodeInput = ({}: BarcodeInputProps) => {
    const [barcode, setBarcode] = useState("");

    const onReadChange = (event: any) => {
        setBarcode(event?.target.value);
    };

    return (
        <div className="">
            <h3>BarcodeInput: {barcode}</h3>
            <input type="text" value={barcode} placeholder="Barcode Text" onChange={onReadChange} autoFocus />
        </div>
    );
};

BarcodeInput.displayName = "BarcodeInput";
