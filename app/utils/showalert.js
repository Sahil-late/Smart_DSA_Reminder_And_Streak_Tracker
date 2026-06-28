import { toast ,Bounce} from 'react-toastify';

const showAlert = ({msg='messege is empty',type, pos = 'top-right', theme = 'dark'}={msg:'messege is empty'}) => {
        if (type) return  toast?.[type](`${msg}`, {
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
        console.log();
        
        toast(`${msg?.props?.children || msg}`, {
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