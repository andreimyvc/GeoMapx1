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
    public class PlanillasController : BaseRepositoryController
    {
        public HttpResponseMessage GetPlanillaByID(int planillaID, bool allField = false)
        {
            try
            {
                var p = this._GetPlanillaByID(planillaID);
                if (allField)
                {
                    return Request.CreateResponse<VW_Planilla>(HttpStatusCode.OK, p);
                }
                else
                {
                    var data =  new
                                   {
                                       p.PlanillaID,
                                       p.ProyectoID,
                                       p.PosteID,
                                       p.FichaID,
                                       p.ContratistaID,
                                       Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                                       p.CodigoContratista,
                                       p.CodigoPoste,
                                       p.CodigoProyecto,
                                       p.CodioFinanciera,
                                       p.CodigoFicha,
                                       p.DescripcionActividad,
                                       p.UniCons,
                                       p.Cantidad,
                                       p.PosteIDHasta,
                                       p.Observacion
                                   };
                    return Request.CreateResponse<object>(HttpStatusCode.OK, data);
                }
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetPlanillasOfDay(bool allField = false)
        {
            try
            {
                var lista = this._GetPlanillas(0, 0, 0)
                .Where(p => p.FechaIngreso.Value.Date == DateTime.Now.Date)
                .ToList();
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<VW_Planilla>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista
                               select new
                                   {
                                       p.PlanillaID,
                                       p.ProyectoID,
                                       p.PosteID,
                                       p.FichaID,
                                       p.ContratistaID,
                                       Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                                       p.CodigoContratista,
                                       p.CodigoPoste,
                                       p.CodigoProyecto,
                                       p.CodioFinanciera,
                                       p.CodigoFicha,
                                       p.DescripcionActividad,
                                       p.UniCons,
                                       p.Cantidad,
                                       p.PosteIDHasta,
                                       p.Observacion
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
        public HttpResponseMessage Post(Planilla entity)
        {
            try
            {
                entity.EmpresaID = usuario.EmpresaID;
                entity.FechaIngreso = DateTime.Now;
                entity.UserID = usuario.UsuarioID;
                entity.Verificado = false;
                var result = this._InsertPlanilla(entity);

                return Request.CreateResponse<Planilla>(HttpStatusCode.Created, result);                
            }
            catch (SqlException ex)
            {
                HttpError err = new HttpError("Esta actividad ya fue registrada en el sistema");
                if (ex.Message.Contains("UNIQUE KEY 'UniqueByFecha'"))
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
        public HttpResponseMessage Put(Planilla entity)
        { 
            try
            {
                /**[Ojo] con  postes que no están en el mismo proyecto***/
                var old = this._GetPlanilla(entity.PlanillaID).SingleOrDefault();
                if (old != null && !old.Verificado)
                {
                    old.ActividadID = old.ActividadID;
                    old.Cantidad = entity.Cantidad;
                    old.Fecha = entity.Fecha;
                    old.FechaModificacion = DateTime.Now;
                    old.PosteID = entity.PosteID;
                    old.ProyectoID = entity.ProyectoID;
                    old.Verificado = entity.Verificado;
                    old.PosteIDHasta = entity.PosteIDHasta;
                    old.FichaID = entity.FichaID;
                    //old.UserID = entity.UserID;
                    old.UserIDModifica = usuario.UsuarioID;
                    old.UserIDModifica = entity.UserIDModifica;
                    var data = this._UpdatePlanilla(old);
                    return Request.CreateResponse<Planilla>(HttpStatusCode.OK, data);  
                }
                else
                {
                    HttpError err = new HttpError("Transacción VERIFICADA y no se puede modificar.");
                    return Request.CreateResponse(HttpStatusCode.Conflict, err);
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