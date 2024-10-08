import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
	width: 400,
	padding: '2.5rem',
	buttonsStyling: false,
	customClass: {
		confirmButton: 'btn btn-success m-btn m-btn--custom',
		cancelButton: 'btn btn-secondary m-btn m-btn--custom'
	}
});

export default swalWithBootstrapButtons;