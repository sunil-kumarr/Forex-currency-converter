export function catchNetworkError(error) {
    console.log('----------- CATCH NETWORK ERROR---------------------');
    if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        console.log('--------------RETURN ERROR END-----------------');
    } else if (error.request) {
        console.log(error.request);
    } else {
        console.log('Error', error.message);
    }
    console.log(error.config);
    console.log('--------------END CATCH NETWORK-------------------');
    throw error;
}