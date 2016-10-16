using GeoMapx.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GeoMapx.Web.Controllers
{
    public class PostesController : Controller
    {
        //
        // GET: /Postes/
        [HttpGet]
        public JsonResult Get()
        {
            var data  = new UsuarioModel[] { new UsuarioModel { Nombre = "Juan" }, new UsuarioModel { Nombre = "JuanX" } };
            return Json(data,JsonRequestBehavior.AllowGet);
        }

    }
}
