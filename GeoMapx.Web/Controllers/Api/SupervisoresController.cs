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
    public class SupervisoresController : BaseRepositoryController
    {
        // GET api/Poligonos
        public HttpResponseMessage Get(int proyectoid)
        {
            try
            {
                var lista = base._GetSupervisoresByProyecto(proyectoid);
                return Request.CreateResponse<IEnumerable<Supervisore>>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetByID(int supervisorid)
        {
            try
            {
                var lista = base._GetSupervisoresByID(supervisorid);
                return Request.CreateResponse<Supervisore>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
    }
}
