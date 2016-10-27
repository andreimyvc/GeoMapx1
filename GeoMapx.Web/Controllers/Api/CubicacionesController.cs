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
    public class CubicacionesController : BaseRepositoryController
    {
        //[Route("api/actividades")]
        [HttpGet]
        public HttpResponseMessage GetByProyecto(bool allField = false)
        {
            try
            {
                var lista = base._GetMateriales();                     
                return Request.CreateResponse<IEnumerable<VW_Materiale>>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }

        [HttpPost]
        public HttpResponseMessage Post(List<Cubicacione> entity)
        {
            try
            {
                this._InsertCubicaciones(entity);
                return Request.CreateResponse<bool>(HttpStatusCode.Created, true);
            }
            catch (SqlException ex)
            {
                HttpError err = new HttpError("No se pudo actualizar.");
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
        public HttpResponseMessage Put(Materiale entity)
        {
            throw new NotImplementedException();
        }
        [HttpDelete]
        [RouteAttribute("DELETE")]
        [AcceptVerbs("DELETE")]
        public HttpResponseMessage Delete(int cubicacionid)
        {
            throw new NotImplementedException();
        }
    }
}