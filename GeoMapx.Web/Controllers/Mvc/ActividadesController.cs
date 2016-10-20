using GeoMapx.Web.Models;
using GeoMapxBusiness;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Configuration;
using System.Text;
using GeoMapx.Web.Utils;

namespace GeoMapx.Web.Controllers
{
    public class ActividadesController : Controller
    {
        // GET: /Actividades/
        public UsuarioModel usuario = new UsuarioModel { Nombre = "test", UsuarioID = 1, EmpresaID = 1 };
        [Authorize]
        public ActionResult Index()
        {
            return View();
        }
    }
}
