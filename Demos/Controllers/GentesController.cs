using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demos.Controllers
{
    public class GentesController : Controller
    {
        BaseDatosDataContext db = new BaseDatosDataContext();

        //private GeoMapxBusiness.GeoMapxDBDataContext db = new GeoMapxBusiness.GeoMapxDBDataContext();
        //
        // GET: /Gentes/

        public ActionResult Index()
        {
            return View();
        }
        public string GetGentes()
        {
            var data = db.Gentes.AsEnumerable();
            return JsonConvert.SerializeObject(data);
        }
        public string GetPlanilla()
        {
            db.DeferredLoadingEnabled = false;
            var data = db.VW_Planillas.AsEnumerable();
            return JsonConvert.SerializeObject(data);
        }
    }
}
