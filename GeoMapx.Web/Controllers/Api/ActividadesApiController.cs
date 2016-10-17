using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace GeoMapx.Web.Controllers
{
    public class ActividadesApiController : Controller
    {
        private GeoMapxBusiness.GeoMapxDBDataContext db = new GeoMapxBusiness.GeoMapxDBDataContext();
        public ActividadesApiController()
        {
            db.DeferredLoadingEnabled = false;
        }
        public string/*JsonResult*/ GetActividades()
        {
            var data = from p in db.VW_Planillas.ToList()
                       select new 
                       {
                           Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                           p.CodigoContratista,
                           p.CodigoPoste,
                           p.CodigoProyecto,
                           p.CodioFinanciera,
                           p.CodigoFicha,
                           p.DescripcionActividad,
                           p.UniCons,
                           p.Cantidad,
                           p.PosteIDHasta
                       };
            //return Json(data, JsonRequestBehavior.AllowGet);
            return JsonConvert.SerializeObject(data);
        }
    }
}
