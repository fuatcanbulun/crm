import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  addMessage,
  removeMessage,
} from "../redux/app/toastMessage/toastMessageSlice";

const useToastMessage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const toastMessage = ({ title, text, type, duration }) => {
    const id = Math.random();
    dispatch(
      addMessage({
        id: id,
        title: t(title),
        text: t(text),
        type: type,
      })
    );
    setTimeout(() => {
      dispatch(removeMessage(id));
    }, duration);
  };

  return { toastMessage };
};

export default useToastMessage;
