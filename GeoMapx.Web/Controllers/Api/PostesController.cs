using GeoMapx.Web.Models;
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
    public class PostesController : BaseRepositoryController
    {
        // GET api/postes
        //[Authorize  ]
        public IEnumerable<VW_Poste> Get()
        {
            return base._GetPostes();
        }
        public VW_Poste GetPosteByID(int posteID)
        {
            return base._GetPostes().SingleOrDefault(p => p.PosteID == posteID);
        }

        public HttpResponseMessage GetPostesByProyecto(int proyectoID, bool allField = false)
        {
            try
            {
                var lista = base._GetPostesByProyecto(proyectoID);
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<Poste>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista.ToList()
                               select new
                               {
                                   p.ProyectoID,
                                   Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                                   p.CodigoPoste,
                                   p.PosteID,
                                   p.Lat,
                                   p.Lon
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

        public HttpResponseMessage GetPostesByPoligono(int poligonoid, bool allField = false)
        {
            try
            {
                var lista = base._GetPostesByPoligono(poligonoid);
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<Poste>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista.ToList()
                               select new
                               {
                                   p.ProyectoID,
                                   Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                                   p.CodigoPoste,
                                   p.PosteID,
                                   p.Lat,
                                   p.Lon
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
        public HttpResponseMessage GetPostesByProyectoALlField(int proyectoID, bool allField = false)
        {
            return GetPostesByProyecto(proyectoID, true);
        }

        public HttpResponseMessage GetPostesByProyectoDiferenteDe(int proyectoID, int diferenteDe, bool allField = false)
        {
            try
            {
                var lista = base._GetPostesByProyecto(proyectoID, diferenteDe);
                if (allField)
                {
                    return Request.CreateResponse<IEnumerable<Poste>>(HttpStatusCode.OK, lista);
                }
                else
                {
                    var data = from p in lista.ToList()
                               select new
                               {
                                   p.ProyectoID,
                                   Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                                   p.CodigoPoste,
                                   p.PosteID,
                                   p.Lat,
                                   p.Lon
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
        
        public HttpResponseMessage GetTiposPoste()
        {
            try
            {
                var lista = base._GetTiposPoste();
                return Request.CreateResponse<IEnumerable<TiposPoste>>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        public HttpResponseMessage GetTiposPosteID(int tipoPosteID)
        {
            try
            {
                var lista = base._GetTiposPoste().SingleOrDefault(p => p.TipoPosteID == tipoPosteID);
                return Request.CreateResponse<TiposPoste>(HttpStatusCode.OK, lista);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        [HttpPost]
        public HttpResponseMessage Post(Poste entity)
        {
            try
            {
                entity.UserID = usuario.UsuarioID;
                entity.EmpresaID = usuario.EmpresaID;
                entity.Fecha = DateTime.Now;
                var result = this._InsertPoste(entity);

                return Request.CreateResponse<Poste>(HttpStatusCode.Created, result);
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
        public HttpResponseMessage Put(Poste entity)
        {
            try
            {
                entity.UserIDModifica = usuario.UsuarioID;
                entity.FechaModificacion = DateTime.Now;
                var data = this._UpdatePoste(entity);
                return Request.CreateResponse<Poste>(HttpStatusCode.OK, data);
            }
            catch (Exception ex)
            {
                HttpError err = new HttpError(ex.Message);
                return Request.CreateResponse(HttpStatusCode.Conflict, err);
            }
        }
        [HttpDelete]
        public HttpResponseMessage Delete(int materialID)
        {
            try
            {
                var result = this._DeletePoste(materialID);
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
