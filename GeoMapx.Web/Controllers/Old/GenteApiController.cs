using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using GeoMapxBusiness;
//using GeoMapx.Web.Models.GeoMapx;
using Newtonsoft.Json;
using GeoMapx.Web.Filters;

namespace GeoMapx.Web.Controllers
{
    public class GenteApiController : ApiController
    {
        //private WebContext db = new WebContext();
        private GeoMapxBusiness.GeoMapxDBDataContext db = new GeoMapxBusiness.GeoMapxDBDataContext();

        // GET api/GenteApi
        //[Authorize]
        public IEnumerable<Gente> GetGentes()
        {
            return db.Gentes.AsEnumerable();
        }
        [AllowCrossSiteJsonAttribute]
        //public string GetGentes()
        //{
        //    var data = db.Gentes.AsEnumerable();
        //    return JsonConvert.SerializeObject(data);
        //}

        // GET api/GenteApi/5
        public Gente GetGente(int id)
        {
            Gente gente = db.Gentes.Single(p => p.ID == id);
            if (gente == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return gente;
        }

        // PUT api/GenteApi/5
        public HttpResponseMessage PutGente(int id, Gente gente)
        {
            if (ModelState.IsValid && id == gente.ID)
            {
                db.Gentes.Attach(gente);

                try
                {
                    db.SubmitChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // POST api/GenteApi
        public HttpResponseMessage PostGente(Gente gente)
        {
            if (ModelState.IsValid)
            {
                db.Gentes.InsertOnSubmit(gente);
                db.SubmitChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, gente);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = gente.ID }));
                return response;
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
        }

        // DELETE api/GenteApi/5
        public HttpResponseMessage DeleteGente(int id)
        {
            Gente gente = db.Gentes.Single(p=> p.ID == id);
            if (gente == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.Gentes.DeleteOnSubmit(gente);

            try
            {
                db.SubmitChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            return Request.CreateResponse(HttpStatusCode.OK, gente);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}