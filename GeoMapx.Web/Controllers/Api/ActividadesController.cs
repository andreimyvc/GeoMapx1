using GeoMapxBusiness;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GeoMapx.Web.Controllers.Api
{
    public class ActividadesController : BaseRepositoryController
    {
        //[Route("api/actividades")]
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
                                   p.CodigoFicha
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
                                   p.ActividadSecundaria
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
    }
}
                 

//var message = string.Format("Product with id = {0} not found", 5);
//            HttpError err = new HttpError(message);
//            return Request.CreateResponse(HttpStatusCode.NotFound, new {  EmpresaID = 45, Message = "Juan y Pedro"});


            //throw new Exception("Un error");
            //throw new HttpResponseException(Request.CreateResponse());
            //return  new HttpResponseException(Request.CreateResponse(HttpStatusCode.Conflict, new Poste { EmpresaID = 45}));         