using GeoMapx.Web.Models;
using GeoMapxBusiness;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Net;
using System.Configuration;
using System.Text;
using GeoMapx.Web.Utils;

namespace GeoMapx.Web.Controllers
{
    [Authorize]
    public class CertificacionesController : Controller
    {
        // GET: /Actividades/
        public UsuarioModel usuario = new UsuarioModel { Nombre = "test", UsuarioID = 1, EmpresaID = 1 };
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Test()
        {
            return View();
        }
        public ActionResult Verificaciones()
        {
            return View();
        }
    }
}
