import Swal from "sweetalert2";
import { LocaleMap } from "./contexts/locale/types";

export const capitalize = (str: string) =>
  str.length > 0 ? str[0].toUpperCase() + str.slice(1) : "";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  }
});

export const Confirm = (currentLocale: LocaleMap) => {
  return Swal.mixin({
    title: currentLocale.swalConfirmTitle,
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: currentLocale.swalConfirmNoButton,
    confirmButtonText: currentLocale.swalConfirmYesButton,
    reverseButtons: true,
    focusCancel: true,
    buttonsStyling: false,
    customClass: {
      confirmButton: "btn btn-danger mx-2 mt-1",
      cancelButton: "btn btn-primary mx-2 mt-1"
    }
  });
};
