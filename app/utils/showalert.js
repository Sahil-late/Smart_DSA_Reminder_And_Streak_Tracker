import { toast ,Bounce} from 'react-toastify';

const showAlert = ({msg, pos = 'top-right', theme = 'dark'}={}) => {
        toast(`${msg}`, {
            position: pos,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: theme,
            transition: Bounce,
        });
    }
export default showAlert