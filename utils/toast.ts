import toast from 'react-hot-toast';

const toastOnErrorApiResponse = function (error: any, fallbackMessage: string) {
    let message = fallbackMessage;
    if (error.response.data.message) {
        message = error.response.data.message;
    }
    toast.error(message);
};

const toastOnSuccessApiResponse = function (
    success: any,
    fallbackMessage: string
) {
    let message = fallbackMessage;
    if (success.data.message) {
        message = success.data.message;
    }
    toast.success(message);
};

export { toastOnErrorApiResponse, toastOnSuccessApiResponse };
