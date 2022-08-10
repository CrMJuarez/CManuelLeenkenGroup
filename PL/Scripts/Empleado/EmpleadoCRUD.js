$(document).ready(function () {
    GetAll();
    EstadoGetAll();
});

function GetAll() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1142/api/empleado/GetAll',
        success: function (result) {
            $('#tblEmpleado tbody').empty();
            $.each(result.Objects, function (i, empleado) {
                var filas =
                    '<tr>'
                    + '<td class="text-center"> '
                    + '<a class="glyphicon glyphicon-edit" href="#" onclick="GetById(' + empleado.IdEmpleado + ')">'

                    + '</a> '
                    + '</td>'
                    + "<td  id='id' class='text-center'>" + empleado.IdEmpleado + "</td>"
                    + "<td class='text-center'>" + empleado.NumeroNomina + "</td>"
                    + "<td class='text-center'>" + empleado.Nombre + " " + empleado.ApellidoPaterno + " " + empleado.ApellidoMaterno + "</td>"
                    + "<td class='text-center'>" + empleado.Estado.IdEstado + "</td>"

                    + '<td class="text-center"> <button class="btn btn-danger" onclick="Eliminar(' + empleado.IdEmpleado + ')"><span class="glyphicon glyphicon-trash" style="color:#FFFFFF"></span></button></td>'

                    + "</tr>";


                $("#tblEmpleado tbody").append(filas);

            });
        },
        error: function (result) {
            alert('Error al consultar a los empleados.' + result.responseJSON.ErrorMessage);

        }
    });
}
function GetById(IdEmpleado) {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1142/api/empleado/GetById/' + IdEmpleado,
        success: function (result) {
            $('#txtIdEmpleado').val(result.Object.IdEmpleado);
            $('#txtNumeroNomina').val(result.Object.NumeroNomina);
            $('#txtNombre').val(result.Object.Nombre);
            $('#txtApellidoPaterno').val(result.Object.ApellidoPaterno);
            $('#txtApellidoMaterno').val(result.Object.ApellidoMaterno);
            $('#ddlEstados').val(result.Object.Estado.IdEstado);

            $('#ModalForm').modal('show');
            $('#lblTitulo').modal('Modificar Empleado');
            
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }

    });

}
function EstadoGetAll() {
    $("#ddlEstados").empty();
    $.ajax({
        type: 'GET',
        url: 'http://localhost:1142/api/estado/GetAll',
        success: function (result) {
            $("#ddlEstados").append('<option value="' + 0 + '">' + 'Seleccione una opción' + '</option>');
            $.each(result.Objects, function (i, estado) {
                $("#ddlEstados").append('<option value="'
                    + estado.IdEstado + '">'
                    + estado.Nombre + '</option>');
            });
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);

        }
    });
}
function InitializeControls() {

    $('#txtIdEmpleado').val('');
    $('#txtNumeroNomina').val('');
    $('#txtNombre').val('');
    $('#txtApellidoPaterno').val('');
    $('#txtApellidoMaterno').val('');
    $('#ddlEstados').val(0);
    $('#ModalForm').modal('show');

}

function ShowModal() {

    $('#ModalForm').modal('show');

    EstadoGetAll();

    InitializeControls();
    $('#lblTitulo').modal('Agregar Nuevo Empleado');

}

function Guardar() {

    var empleado = {
        IdEmpleado: $('#txtIdEmpleado').val(),
        NumeroNomina: $('#txtNumeroNomina').val(),
        Nombre: $('#txtNombre').val(),
        ApellidoPaterno: $('#txtApellidoPaterno').val(),
        ApellidoMaterno: $('#txtApellidoMaterno').val(),
        Estado: {
            IdEstado: $('#ddlEstados').val()
        }
    }
    if ($('#txtIdEmpleado').val() == "") {
        Add(empleado);
    }
    else {
        Update(empleado);
    }

}

function Add(empleado) {

    $.ajax({
        type: 'POST',
        url: 'http://localhost:1142/api/empleado/add',
        dataType: 'json',
        data: empleado,
        success: function (result) {
            $('#ModalForm').modal('hide');
            $('#myModal').modal();

            EstadoGetAll();
            GetAll();

        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });
}

function Update(empleado) {
    var empleado = {
        IdEmpleado: $('#txtIdEmpleado').val(),
        NumeroNomina: $('#txtNumeroNomina').val(),
        Nombre: $('#txtNombre').val(),
        ApellidoPaterno: $('#txtApellidoPaterno').val(),
        ApellidoMaterno: $('#txtApellidoMaterno').val(),
        Estado: {
            IdEstado: $('#ddlEstados').val()
        }
    }
    $.ajax({
        type: 'PUT',
        url: 'http://localhost:1142/api/empleado/update/',
        dataType: 'json',
        data: empleado,
        success: function (result) {

            $('#ModalForm').modal('hide');
            $('#myModal').modal();

            EstadoGetAll();
            GetAll();
            Console(respond);
        },
        error: function (result) {
            alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
        }
    });

};

function Eliminar(IdEmpleado) {

    if (confirm("¿Estas seguro de eliminarlo?")) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:1142/api/empleado/delete/' + IdEmpleado,
            success: function (result) {
                $('#myModal').modal();
                GetAll();
            },
            error: function (result) {
                alert('Error en la consulta.' + result.responseJSON.ErrorMessage);
            }
        });

    };
};