using GeoMapx.Web.Models;
using GeoMapxBusiness;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GeoMapx.Web.Controllers.Api
{
    public class PoligonosController : BaseRepositoryController
    {
        // GET api/Poligonos
        public HttpResponseMessage Get(int proyectoid)
        {
            try
            {
                var lista = base._GetTPoligonosByProyecto(proyectoid);
                return Request.CreateResponse<IEnumerable<Poligono>>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetByID(int poligonoid)
        {
            try
            {
                var lista = base._GetTPoligonosByID(poligonoid);
                return Request.CreateResponse<Poligono>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
    }
}
