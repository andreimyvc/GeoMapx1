using GeoMapxBusiness;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GeoMapx.Web.Controllers.Api
{
    public class ActividadesController : BaseRepositoryController
    {
        //[Route("api/actividades")]
        [HttpGet]
        public HttpResponseMessage Get(bool allField = false)
        {
            try
            {
                var lista = base._GetActividades();
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<VW_Actividade>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista
                               select new
                               {
                                   p.ActividadID,
                                   p.ProyectoID,
                                   p.CodigoProyecto,
                                   p.UniCons,
                                   p.DescripcionActividad,
                                   p.ActividadPrimaria,
                                   p.ActividadSecundaria,
                                   p.ActividadSGT,
                                   p.Cantidad,
                                   p.PrecioUnitario
                               };
                    //var x = lista.ToList();
                    return Request.CreateResponse<IEnumerable<object>>(HttpStatusCode.OK, data);
                }
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetPrimarias(int proyectoid)
        {
            try
            {
                var lista = base._GetActividadesPrimarias(proyectoid);
                return Request.CreateResponse<IEnumerable<string>>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetSecundarias(int proyectoid)
        {
            try
            {
                var lista = base._GetActividadesSecundarias(proyectoid);
                return Request.CreateResponse<IEnumerable<string>>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetPrebuilds(bool allField = false)
        {
            try
            {
                var lista = base._GetActividadesPrebuild();
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<VW_ActividadesPreBuild>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista
                               select new
                               {
                                   p.PreBuildID,
                                   p.PosteID,
                                   p.PosteIDHasta,
                                   p.ActividadID,
                                   p.ProyectoID,
                                   p.CodigoProyecto,
                                   p.UniCons,
                                   p.DescripcionActividad,
                                   p.CodigoPosteHasta,
                                   p.CantidadEjecutada,
                                   p.CantidadLicitada,
                                   p.Ejecutado,
                                   CantidadPendiente = p.CantidadLicitada - p.CantidadEjecutada
                               };
                    //var x = lista.ToList();
                    return Request.CreateResponse<IEnumerable<object>>(HttpStatusCode.OK, data);
                }
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetPrebuildsByProyecto(int proyectoid, bool allField = false)
        {
            try
            {
                var lista = base._GetActividadesPrebuildByProyecto(proyectoid);
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<VW_ActividadesPreBuild>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista
                               select new
                               {
                                   p.PreBuildID,
                                   p.PosteID,
                                   p.PosteIDHasta,
                                   p.ActividadID,
                                   p.ProyectoID,
                                   p.CodigoProyecto,
                                   p.UniCons,
                                   p.DescripcionActividad,
                                   p.CodigoPosteHasta,
                                   p.CantidadEjecutada,
                                   p.CantidadLicitada,
                                   p.Ejecutado,
                                   CantidadPendiente = p.CantidadLicitada - p.CantidadEjecutada
                               };
                    //var x = lista.ToList();
                    return Request.CreateResponse<IEnumerable<object>>(HttpStatusCode.OK, data);
                }
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetPrebuildsByPoste(int posteid, bool allField = false)
        {
            try
            {
                var lista = base._GetActividadesPrebuildByPoste(posteid);
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<VW_ActividadesPreBuild>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista
                               select new
                               {
                                   p.PreBuildID,
                                   p.PosteID,
                                   p.PosteIDHasta,
                                   p.ActividadID,
                                   p.ProyectoID,
                                   p.CodigoProyecto,
                                   p.UniCons,
                                   p.DescripcionActividad,
                                   p.CantidadEjecutada,
                                   p.CantidadLicitada,
                                   p.CodigoPosteHasta,
                                   p.Ejecutado,
                                   CantidadPendiente = p.CantidadLicitada - p.CantidadEjecutada,
                               };
                    //var x = lista.ToList();
                    return Request.CreateResponse<IEnumerable<object>>(HttpStatusCode.OK, data);
                }
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetActividadesByProyecto(int proyectoID, bool allField = false)
        {
            try
            {
                var lista = base._GetActividadesByProyecto(proyectoID);
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<VW_ActividadesPoste>>(HttpStatusCode.OK, lista);
                }
                else
                {

                    var data = from p in lista.ToList()
                               select new
                               {
                                   p.ActividadID,
                                   p.ProyectoID,
                                   p.CodigoProyecto,
                                   Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                                   p.CodigoPoste,
                                   p.UniCons,
                                   p.DescripcionActividad,
                                   p.ActividadPrimaria,
                                   p.ActividadSecundaria,
                                   p.ActividadSGT,
                                   p.Cantidad,
                                   p.Hasta,
                                   p.PlanillaID,
                                   p.CodigoContratista,
                                   p.CodigoFicha,
                               };
                    return Request.CreateResponse<IEnumerable<object>>(HttpStatusCode.OK, data);
                }
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetUniconsByProyecto(int proyectoID, bool allField = false)
        {
            try
            {
                var lista = base._GetUniconsByProyecto(proyectoID);
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<Actividade>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista.ToList()
                               select new
                               {
                                   Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                                   p.UniCons,
                                   p.DescripcionActividad,
                                   p.ActividadID,
                                   p.ProyectoID,
                                   p.ActividadSecundaria,
                                   p.PrecioUnitario,
                                   p.ActividadPrimaria
                               };
                    return Request.CreateResponse<IEnumerable<object>>(HttpStatusCode.OK, data);
                }
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetActividadesByPoste(int posteID, bool allField = false)
        {
            try
            {
                var lista = base._GetActividadesByPoste(posteID);
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<VW_ActividadesPoste>>(HttpStatusCode.OK, lista);
                }
                else
                {

                    var data = from p in lista.ToList()
                               select new
                               {
                                   Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                                   p.CodigoPoste,
                                   p.UniCons,
                                   p.DescripcionActividad,
                                   p.Cantidad,
                                   p.Hasta,
                                   p.PlanillaID
                               };
                    return Request.CreateResponse<IEnumerable<object>>(HttpStatusCode.OK, data);
                }
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        [HttpPost]
        public HttpResponseMessage Post(Actividade entity)
        {
            try
            {
                entity.EmpresaID = usuario.EmpresaID;
                entity.Fecha = DateTime.Now;
                entity.UserID = usuario.UsuarioID;
                var result = this._InsertActividad(entity);

                return Request.CreateResponse<Actividade>(HttpStatusCode.Created, result);
            }
            catch (SqlException ex)
            {
                HttpError err = new HttpError("Esta actividad ya fue registrada en el sistema");
                if (ex.Message.Contains("UNIQUE KEY"))
                {
                    return Request.CreateResponse(HttpStatusCode.Conflict, err);
                }
                //throw new HttpResponseException(HttpStatusCode.Conflict);
                err = new HttpError("Error no controlado.");
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        [HttpPut]
        [RouteAttribute("PUT")]
        [AcceptVerbs("PUT")]
        public HttpResponseMessage Put(Actividade entity)
        {
            try
            {
                var data = this._UpdateActividad(entity);
                return Request.CreateResponse<Actividade>(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        [HttpDelete]
        public HttpResponseMessage Delete(int actividadID)
        {
            try
            {
                var result = this._DeleteActividad(actividadID);
                return Request.CreateResponse<bool>(HttpStatusCode.OK, result);
            }
            catch (SqlException ex)
            {
                HttpError err = new HttpError("No se puede eliminar esta actividad, algunos registros podrían quedar huérfanos.");
                if (ex.Message.Contains("FK_"))
                {
                    return Request.CreateResponse(HttpStatusCode.Conflict, err);
                }
                //throw new HttpResponseException(HttpStatusCode.Conflict);
                err = new HttpError("Error no controlado.");
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
    }
}
                 

//var message = string.Format("Product with id = {0} not found", 5);
//            HttpError err = new HttpError(message);
//            return Request.CreateResponse(HttpStatusCode.NotFound, new {  EmpresaID = 45, Message = "Juan y Pedro"});


            //throw new Exception("Un error");
            //throw new HttpResponseException(Request.CreateResponse());
            //return  new HttpResponseException(Request.CreateResponse(HttpStatusCode.Conflict, new Poste { EmpresaID = 45}));         