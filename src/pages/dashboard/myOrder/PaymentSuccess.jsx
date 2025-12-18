import React, { useEffect, useState } from 'react';
import { useSearchParams } from "react-router";
import axios from "axios";

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const session_id = searchParams.get("session_id");
    const orderId = searchParams.get("orderId");

    const [payment, setPayment] = useState(null);

    useEffect(() => {
        const verifyPayment = async () => {
            const res = await axios.post("https://home-shef-server.vercel.app/payment-success", {
                sessionId: session_id,
                orderId
            });
            setPayment(res.data.paymentInfo);
        };

        verifyPayment();
    }, []);

    return (
        <div className="p-10 text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">
                Payment Successful 🎉
            </h1>

            {payment ? (
                <div className="text-lg">
                    <p><strong>Payment ID:</strong> {payment.transactionId}</p>
                    <p><strong>Amount:</strong> ${payment.amount}</p>
                </div>
            ) : (
                <p>Verifying payment...</p>
            )}
        </div>
    );
}
