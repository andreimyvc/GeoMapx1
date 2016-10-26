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
    public class SecuenciaCubicacionesController : BaseRepositoryController
    {
        [HttpGet]
        public HttpResponseMessage GetByProyecto(int proyectoid, bool allField = false)
        {
            try
            {
                var lista = base._GetSecuenciasByProyecto(proyectoid);                     
                return Request.CreateResponse<IEnumerable<VW_SecuenciaCubicacione>>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        
        [HttpPost]
        public HttpResponseMessage Post(SecuenciaCubicacione entity)
        {
            try
            {
                var result = this._InsertSecuenciaCubicacion(entity);

                return Request.CreateResponse<SecuenciaCubicacione>(HttpStatusCode.Created, result);
            }
            catch (SqlException ex)
            {
                HttpError err = new HttpError("No se pudo crear.");
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
        public HttpResponseMessage Put(SecuenciaCubicacione entity)
        {
            try
            {
                var data = this._UpdateSecuenciaCubicacion(entity);
                return Request.CreateResponse<SecuenciaCubicacione>(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }        
    }
}