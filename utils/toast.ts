import toast from 'react-hot-toast';

const toastOnErrorApiResponse = function (error: any) {
    if (error.response.data.message) toast.error(error.response.data.message);
};

export { toastOnErrorApiResponse };
