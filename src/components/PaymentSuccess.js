import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useSearchParams } from "react-router-dom"
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
const PaymentSuccess = () => {
    // const navigate=useNavigate();
    const seachQuery = useSearchParams()[0]
    const referenceNum = seachQuery.get("reference")
    // const handleSuccess=async()=>{
    //     navigate('/profile');
    // }
    return (
        <Box>
            <VStack h="100vh" justifyContent={"center"}>
                <Heading textTransform={"uppercase"}> Order Successfull</Heading>
                <Text>
                    Reference No.{referenceNum}
                </Text>
                {/* <button onClick={() => handleSuccess()} className="btn">
                    Go to Profile
                </button> */}
            </VStack>
        </Box>
    )
}
export default PaymentSuccess



