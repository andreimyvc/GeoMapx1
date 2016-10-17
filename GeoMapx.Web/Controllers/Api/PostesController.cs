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
    public class PostesController : BaseRepositoryController
    {
        // GET api/postes
        //[Authorize  ]
        public IEnumerable<VW_Poste> Get()
        {
            return base._GetPostes();
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
        
        // POST api/postes
        public void Post([FromBody]string value)
        {
        }

        // PUT api/postes/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/postes/5
        public void Delete(int id)
        {
        }
    }
}
