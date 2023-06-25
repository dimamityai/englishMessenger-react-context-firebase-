import React, {FC} from 'react';


const ErrorMessage = ({isError, errorMessage, ...props}) => {
    return (
            isError && <div{...props}>{errorMessage}</div>
    );
};

export default ErrorMessage;