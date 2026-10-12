import { AxiosError } from "axios";
import { toast } from "react-toastify";

function handleError(err: AxiosError) {
  switch (err.response?.status) {
    case 404:
      // toast.error({message: err.message, title: "Ошибка авторизации"})
      console.error("Method not found:", err);
      break;
    case 400:
      //@ts-ignore
      toast.error(err.response?.data.message)
    default:
      console.error(err);
  }
}

export default handleError;
