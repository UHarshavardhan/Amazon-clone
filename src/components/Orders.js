import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

function Orders() {
    const { productId, quantity } = useParams();
    const [activeStep, setActiveStep] = useState(0);
    const [address, setAddress] = useState('');

    useEffect(() => {
        fetchAddress();
    }, []);

    async function fetchAddress() {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/address');
            if (response.status === 200) {
                setAddress(response.data);
                console.log(response.data)
            }
        } catch (error) {
            console.error('Error fetching address:', error);
            console.log()
        }
    }

    async function handlePlaceOrder() {
        try {
           
                const response = await axios.post('http://localhost:8000/api/v1/orders', {
                    productId: productId,
                    quantity: quantity,
                    addressID: address._id
                })
                console.log('Order created:', response.data);
            } 
         catch (error) {
            console.error('Error placing order:', error);
        }

    }
    

    function handleNext() {
        setActiveStep((currentStep) => currentStep + 1);
    }

    function handleBack() {
        setActiveStep((currentStep) => currentStep - 1);
    }

    return (
        <div>
            <Stepper activeStep={activeStep}>
                <Step>
                    <StepLabel>Address</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Place order</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Order Confirmation</StepLabel>
                </Step>
            </Stepper>
            <div>
                {activeStep === 0 && (
                    <Button onClick={fetchAddress}>Place Order</Button>
                )}
                {activeStep > 0 && (
                    <Button onClick={handleBack}>Back</Button>
                )}
                {activeStep < 2 && (
                    <Button onClick={handleNext}>Next</Button>
                )}
            </div>
        </div>
    );
}

export default Orders;
