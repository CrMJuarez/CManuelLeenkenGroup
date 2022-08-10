using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public class Empleado
    {
        public static ML.Result GetAll()
        {
            ML.Result result = new ML.Result();

            try
            {
                using (DL.CManuelLeenkenGroupEntities context = new DL.CManuelLeenkenGroupEntities())
                {
                    var query = context.EmpleadoGetAll().ToList();

                    result.Objects = new List<object>();

                    if (query != null)
                    {
                        foreach (var obj in query)
                        {
                            ML.Empleado empleado = new ML.Empleado();

                            empleado.IdEmpleado = obj.IdEmpleado;
                            empleado.NumeroNomina = obj.NumeroNomina;
                            empleado.Nombre = obj.Nombre;
                            empleado.ApellidoPaterno = obj.ApellidoPaterno;
                            empleado.ApellidoMaterno = obj.ApellidoMaterno;
                            empleado.Estado = new ML.Estado();
                            empleado.Estado.IdEstado = obj.IdEstado.Value;

                            result.Objects.Add(empleado);

                        }

                        result.Correct = true;

                    }
                    else
                    {
                        result.Correct = false;
                        result.ErrorMessage = "No se encontraron registros.";
                    }
                }
            }
            catch (Exception ex)
            {
                result.Correct = false;

                result.ErrorMessage = ex.Message;
            }

            return result;
        }

        public static ML.Result GetById(int IdEmpleado)
        {
            ML.Result result = new ML.Result();
            try
            {
                using (DL.CManuelLeenkenGroupEntities context = new DL.CManuelLeenkenGroupEntities())
                {
                    var objEmpleado = context.EmpleadoGetById(IdEmpleado).FirstOrDefault();

                    result.Objects = new List<object>();

                    if (objEmpleado != null)
                    {
                        ML.Empleado empleado = new ML.Empleado();

                        empleado.IdEmpleado = objEmpleado.IdEmpleado;
                        empleado.NumeroNomina = objEmpleado.NumeroNomina;
                        empleado.Nombre = objEmpleado.Nombre;
                        empleado.ApellidoPaterno = objEmpleado.ApellidoPaterno;
                        empleado.ApellidoMaterno = objEmpleado.ApellidoMaterno;
                        empleado.Estado = new ML.Estado();
                        empleado.Estado.IdEstado = objEmpleado.IdEstado.Value;

                        result.Object = empleado;


                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                        result.ErrorMessage = "No se encontro el registro";
                    }
                }
            }
            catch (Exception ex)
            {

                result.Correct = false;
                result.ErrorMessage = ex.Message;

            }

            return result;
        }

        public static ML.Result Add(ML.Empleado empleado)
        {
            ML.Result result = new ML.Result();

            try
            {
                using (DL.CManuelLeenkenGroupEntities context = new DL.CManuelLeenkenGroupEntities())
                {
                    var query = context.EmpleadoAdd(empleado.NumeroNomina, empleado.Nombre, empleado.ApellidoPaterno, empleado.ApellidoMaterno, empleado.Estado.IdEstado);

                    if (query >= 1)
                    {
                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                        result.ErrorMessage = "No se inserto el empleado";

                    }
                    result.Correct = true;

                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }
            return result;
        }
        public static ML.Result Delete(int IdEmpleado)
        {
            ML.Result result = new ML.Result();
            try
            {
                using (DL.CManuelLeenkenGroupEntities context = new DL.CManuelLeenkenGroupEntities())
                {
                    var query = context.EmpleadoDelete(IdEmpleado);

                    if (query >= 1)
                    {
                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                        result.ErrorMessage = "No se elimino el registro";

                    }
                    result.Correct = true;

                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }
            return result;
        }
        public static ML.Result Update(ML.Empleado empleado)
        {
            ML.Result result = new ML.Result();
            try
            {
                using (DL.CManuelLeenkenGroupEntities context = new DL.CManuelLeenkenGroupEntities())
                {
                    var query = context.EmpleadoUpdate(empleado.IdEmpleado,
                        empleado.NumeroNomina,
                        empleado.Nombre,
                        empleado.ApellidoPaterno,
                        empleado.ApellidoMaterno,
                        empleado.Estado.IdEstado);

                    if (query >= 1)
                    {
                        result.Correct = true;
                    }
                    else
                    {
                        result.Correct = false;
                        result.ErrorMessage = "No se inserto el registro";

                    }
                    result.Correct = true;

                }
            }
            catch (Exception ex)
            {
                result.Correct = false;
                result.ErrorMessage = ex.Message;
            }
            return result;
        }
    }

}
