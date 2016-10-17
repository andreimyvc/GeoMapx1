using Demos.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Demos.Controllers
{
    public class HomeController : Controller
    {
        GeoMapxBusiness.GeoMapxDBDataContext db = new GeoMapxBusiness.GeoMapxDBDataContext();
        public HomeController()
        {
            db.DeferredLoadingEnabled = false;
        }
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";

            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public JsonResult Postes()
        {
            var data = db.Postes.ToList();
            List<Coordenada> lcoord = new List<Coordenada>();
            foreach (var p in data)
            {
                lcoord.Add(Utils.Utils.ToLatLon(Convert.ToDouble(p.X), Convert.ToDouble(p.Y), "19N"));
            }
            return Json(lcoord, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetActividades()
        {
            var data = db.VW_Planillas.Take(40).AsEnumerable();
            return Json(data, JsonRequestBehavior.AllowGet);
            //return JsonConvert.SerializeObject(data);
        }
        public ActionResult Mapa()
        {
            return View();
        }
    }
}