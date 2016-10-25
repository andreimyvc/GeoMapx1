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
    public class CertificacionesController : BaseRepositoryController
    {
        //[Route("api/Certificacion")]
        [HttpGet]
        public HttpResponseMessage Get(bool allField = false)
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public HttpResponseMessage Post(Materiale entity)
        {
            try
            {
                var result = this._InsertMaterial(entity);

                return Request.CreateResponse<Materiale>(HttpStatusCode.Created, result);
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
        public HttpResponseMessage Put(List<VW_Planilla> entity)
        {
            try
            {
                var data = this._UpdatePlanillas(entity);
                return Request.CreateResponse<bool>(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        [HttpDelete]
        [RouteAttribute("DELETE")]
        [AcceptVerbs("DELETE")]
        public HttpResponseMessage Delete(int materialID)
        {
            throw new NotImplementedException();
        }
    }
}