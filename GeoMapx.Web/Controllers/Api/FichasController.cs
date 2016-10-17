using GeoMapxBusiness;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GeoMapx.Web.Controllers.Api
{
    public class FichasController : BaseRepositoryController
    {
        public HttpResponseMessage GetFichasByContratista(int contratistaID, bool allField = false)
        {
            try
            {
                var lista = base._GetFichasByContratista(contratistaID);
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<Ficha>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista.ToList()
                               select new
                               {
                                   p.CodigoFicha,
                                   p.ContratistaID,
                                   p.EmpresaID,
                                   p.Estatus,
                                   p.FichaID
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