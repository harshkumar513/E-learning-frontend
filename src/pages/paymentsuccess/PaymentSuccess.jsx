import React from 'react';
import "./paymentsuccess.css";
import { useParams, Link } from 'react-router-dom'; // ✅ Link add kiya

const PaymentSuccess = ({ user }) => {
    const params = useParams();

    return (
        <div className='payment-success-page'>
            {user && (
                <div className='success-message'>  {/* ✅ dot hata diya, ye galat class naming tha */}
                    <h2>Payment Successfull</h2>
                    <p>Your course subscription has been activated</p>
                    <p>Reference no - {params.id}</p>
                    <Link to={`/${user._id}/dashboard`} className='common-btn'>
                        Go to Dashboard
                    </Link>
                </div>
            )}
        </div>
    );
};

export default PaymentSuccess;