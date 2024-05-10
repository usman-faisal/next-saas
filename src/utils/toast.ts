import toast from 'react-hot-toast';

export const succesToast = (message: string) =>
  toast.success(message, {
    style: {
      border: '1px solid #d4efec',
      padding: '8px 16px',
      color: '#00a28e',
      backgroundColor: '#f0f9f8',
      marginTop: '16px',
      marginRight: '20px',
      minWidth: '150px',
    },
    iconTheme: {
      primary: '#00a28e',
      secondary: '#eaf7f5',
    },
  });

export const errorToast = (message: string) =>
  toast.error(message, {
    style: {
      border: '1px solid #ffe1e1',
      padding: '8px 16px',
      color: '#ff4c4c',
      backgroundColor: '#fff6f6',
      marginTop: '16px',
      marginRight: '20px',
      minWidth: '150px',
    },
    iconTheme: {
      primary: '#ff4c4c',
      secondary: '#fff6f6',
    },
  });
