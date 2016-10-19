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
    public class ReportesController : BaseRepositoryController
    {
        [HttpGet]
        public HttpResponseMessage GetAvanceByProyecto(int proyectoID)
        {
            try
            {
                var lista = base._GetAvanceByProyecto(proyectoID).OrderBy(p => p.Mes);
                return Request.CreateResponse<IEnumerable<VW_AvanceProyectoByMe>>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetMontosEAP(int proyectoid, string mes)
        {
            try
            {
                var lista = base._GetMontosEAP(proyectoid, mes);
                return Request.CreateResponse<IEnumerable<VW_MontoEAP>>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetMontosCantidadEAS(int proyectoid, string mes, string actividadPrimaria)
        {
            try
            {
                var lista = base._GetMontosCantidadEAS(proyectoid, mes, actividadPrimaria);
                return Request.CreateResponse<IEnumerable<VW_MontoCantidadEA>>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
    }
}