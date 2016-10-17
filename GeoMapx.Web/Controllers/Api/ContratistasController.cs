using GeoMapxBusiness;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GeoMapx.Web.Controllers.Api
{
    public class ContratistasController : BaseRepositoryController
    {
        public HttpResponseMessage getContratistasByProyecto(int proyectoID, bool allField = false)
        {
            try
            {
                var lista = base._GetContratistasByProyecto(proyectoID);
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<Contratista>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista.ToList()
                           select new
                           {
                               Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                               p.CodigoContratista,
                               p.ContratistaID,
                               p.ProyectoID
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