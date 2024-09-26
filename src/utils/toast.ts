import {useToast} from 'react-native-toast-notifications';
import {Images} from '../assets/images';

const toast = useToast();

export const success = ({message}: {message: string}) => {
  toast.show(message, {
    placement: 'top',
    successIcon: Images.avatar1,
  });
};
