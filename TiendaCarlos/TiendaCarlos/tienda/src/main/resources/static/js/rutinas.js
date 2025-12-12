// funcion para hacer un preview de una imagen 
function mostrarImagen(input) {
    if (input.files && input.files[0]) {
        const imagen = input.files[0];
        const maximo = 512 * 1024; //Se limita el tamaño a 512 Kb las imágenes.
        if (imagen.size <= maximo) {
            var lector = new FileReader();
            lector.onload = function (e) {
                $('#blah').attr('src', e.target.result).height(200);
            };
            lector.readAsDataURL(input.files[0]);
        } else {
            alert("La imagen seleccionada es muy grande... no debe superar los 512 Kb!");
        }
    }
}

//Para insertar información en el modal según el registro...
document.addEventListener('DOMContentLoaded', function () {
    const confirmModal = document.getElementById('confirmModal');
    confirmModal.addEventListener('show.bs.modal', function (event) {
        const button = event.relatedTarget;
        document.getElementById('modalId').value = button.getAttribute('data-bs-id');
        document.getElementById('modalDescripcion').textContent = button.getAttribute('data-bs-descripcion');
    });
});

//Para quitar toast
setTimeout(() => {
    document.querySelectorAll('.toast').forEach(t => t.classList.remove('show'));
}, 4000);


function addCart(formulario) {

    // 1. Obtención del ID del producto y la ruta del "action"
    var idProducto = $(formulario).find('input[name="idProducto"]').val();
    var ruta = $(formulario).attr('action') || '/carrito/agregar';

    // 2. Seguridad (token CSRF de Spring Security)
    var csrfToken = $('meta[name="_csrf"]').attr('content');
    var csrfHeader = $('meta[name="_csrf_header"]').attr('content');

    // 3. Petición AJAX
    $.ajax({
        url: ruta,
        type: 'POST',
        data: {
            // CRÍTICO: solo se envía el ID del producto
            idProducto: idProducto
        },

        beforeSend: function (xhr) {
            if (csrfHeader && csrfToken) {
                xhr.setRequestHeader(csrfHeader, csrfToken);
            }
        },

        success: function (response) {
            // Actualizar fragmento HTML del carrito
            $("#resultBlock").html(response);

            console.log("Producto agregado con cantidad por defecto (1).");
            alert("Producto agregado al carrito");
        },

        error: function (xhr, status, error) {
            var mensaje = xhr.responseText || "Error en la conexión.";
            alert("Error al agregar producto: " + mensaje);
        }
    });
}
