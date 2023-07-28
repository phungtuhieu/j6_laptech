export const toastMixin =  Swal.mixin({
    toast: true,
    title: 'General Title',
    animation: false,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });


  export function confirmationDialog(title, text, iconText, confirmButtonText, cancelButtonText) {
    return Swal.fire({
      title: title,
      text: text,
      icon: iconText,
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      confirmButtonColor:'#3085d6',
      cancelButtonColor: '"#d33"',
    });
  }