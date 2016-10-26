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
        public HttpResponseMessage Get(bool allField = false)
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
        public HttpResponseMessage GetMaterialesByProyecto(int proyectoID, bool allField = false)
        {
            try
            {
                var lista = base._GetMaterialesByProyecto(proyectoID);
                return Request.CreateResponse<IEnumerable<VW_Materiale>>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
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
        public HttpResponseMessage Put(Materiale entity)
        {
            try
            {
                var data = this._UpdateMaterial(entity);
                return Request.CreateResponse<Materiale>(HttpStatusCode.OK, data);
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
            try
            {
                var result = this._DeleteMaterial(materialID);
                return Request.CreateResponse<bool>(HttpStatusCode.OK, result);
            }
            catch (SqlException ex)
            {
                HttpError err = new HttpError("No se puede eliminar este Material, algunos registros podrían quedar huérfanos.");
                if (ex.Message.Contains("FK_"))
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
    }
}