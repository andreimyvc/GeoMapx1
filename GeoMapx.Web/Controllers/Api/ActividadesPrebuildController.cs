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
    public class ActividadesPrebuildController : BaseRepositoryController
    {
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
        public HttpResponseMessage GetByProyecto(int proyectoid, bool allField = false)
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
                                   p.CantidadEjecutada,
                                   p.CantidadLicitada,
                                   p.CodigoPosteHasta,
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
        public HttpResponseMessage GetByPoste(int posteid, bool allField = false)
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
                                   CantidadPendiente = p.CantidadLicitada - p.CantidadEjecutada,
                                   p.Ejecutado
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
        [HttpPost]
        public HttpResponseMessage Post(Actividade entity)
        {
            //try
            //{
            //    entity.EmpresaID = usuario.EmpresaID;
            //    entity.Fecha = DateTime.Now;
            //    entity.UserID = usuario.UsuarioID;
            //    var result = this._InsertActividad(entity);

            //    return Request.CreateResponse<Actividade>(HttpStatusCode.Created, result);
            //}
            //catch (SqlException ex)
            //{
            //    HttpError err = new HttpError("Esta actividad ya fue registrada en el sistema");
            //    if (ex.Message.Contains("UNIQUE KEY"))
            //    {
            //        return Request.CreateResponse(HttpStatusCode.Conflict, err);
            //    }
            //    //throw new HttpResponseException(HttpStatusCode.Conflict);
            //    err = new HttpError("Error no controlado.");
            //    return Request.CreateResponse(HttpStatusCode.Conflict, err);
            //}
            //catch (Exception ex)
            //{
            //    HttpError err = new HttpError(ex.Message);
            //    return Request.CreateResponse(HttpStatusCode.Conflict, err);
            //}
            throw new NotImplementedException();
        }
        [HttpPut]
        [RouteAttribute("PUT")]
        [AcceptVerbs("PUT")]
        public HttpResponseMessage Put(ActividadesPreBuild entity)
        {
            try
            {
                var data = this._UpdateActividadPrebuild(entity);
                return Request.CreateResponse<ActividadesPreBuild>(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        [HttpDelete]
        public HttpResponseMessage Delete(int prebuildid)
        {
            throw new NotImplementedException();
        }
    }
}
                 

//var message = string.Format("Product with id = {0} not found", 5);
//            HttpError err = new HttpError(message);
//            return Request.CreateResponse(HttpStatusCode.NotFound, new {  EmpresaID = 45, Message = "Juan y Pedro"});


            //throw new Exception("Un error");
            //throw new HttpResponseException(Request.CreateResponse());
            //return  new HttpResponseException(Request.CreateResponse(HttpStatusCode.Conflict, new Poste { EmpresaID = 45}));         