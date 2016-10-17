using GeoMapxBusiness;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GeoMapx.Web.Controllers.Api
{
    public class ProyectosController : BaseRepositoryController
    {
        public HttpResponseMessage GetProyectosByEmpresas(bool allField = false)
        {
            try
            {
                var lista = base._ProyectosActivosByEmpresaID(empresaid);
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<Proyecto>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista.ToList()
                               select new
                               {
                                   Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                                   p.CodigoProyecto,
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