interface SweetAlertProps {
  attributes: {
    name: string;
    redirectPath: string;
    // Add more attributes as needed
    title?: string;
    timer?: number;
    confirmButtonText?: string;
    didClose?: () => void;
    // Add any other attribute you want to pass dynamically
  };
}
