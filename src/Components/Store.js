import { createStore } from 'redux';
import { toast } from 'react-toastify';

const allState = {
    message: "connect success !",
    display_register_page: true
};

const reducerAll = (state = allState, action) => {
    switch (action.type) {
        case 'CHECK_CONNECT':
            console.log("connect success !");
            return state

        case 'NOTIFICATION':
            switch (action.type_notifi) {
                case 'success':
                    return toast.success(action.title_notifi,
                        {
                            position: action.position,
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        }
                    );
                case 'info':
                    return toast.info(action.title_notifi,
                        {
                            position: action.position,
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        }
                    );

                case 'warning':
                    return toast.warning(action.title_notifi,
                        {
                            position: action.position,
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        }
                    );

                case 'danger':
                    return toast.error(action.title_notifi,
                        {
                            position: action.position,
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        }
                    );

                default:
                    break;
            };
            return state
        
        case 'DISPLAY_REGISTER_PAGE':
            if (action.status === true){
                return {...state, display_register_page: true}
            }
            return {...state, display_register_page: false}
       
        default:
            return state
    }
}

const store = createStore(reducerAll);

export default store;