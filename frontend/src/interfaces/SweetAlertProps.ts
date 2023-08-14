export interface SweetAlertProps {
  attributes: {
    name: string;
    redirectPath: string;
    title?: string;
    icon?: string;
    timer?: number;
    confirmButtonText?: string;
    didClose?: () => void;
  };
}
