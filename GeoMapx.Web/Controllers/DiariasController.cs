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
using System.Web.Http;
using System.Text;
using GeoMapx.Web.Utils;

namespace GeoMapx.Web.Controllers
{
    public class DiariasController : BaseRepositoryController
    { 
        //
        // GET: /Diarias/
        public UsuarioModel usuario = new UsuarioModel { Nombre = "test", UsuarioID = 1, EmpresaID = 1 };
        public ActionResult Index()
        {
            return View();
        }

        public string/*JsonResult*/ GetActividades()
        {
            var data =  base.GetActividades1();
            //return Json(data, JsonRequestBehavior.AllowGet);
            return data;
        }        
        public string GetProyectosByEmpresas(bool allField = false)
        {
            int empresaid = 1;
            var lista = base._ProyectosActivosByEmpresaID(empresaid);
            if (allField)
            {
                return JsonConvert.SerializeObject(lista);
            }
            else
            {
                var data = from p in lista.ToList()
                           select new
                           {
                               Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                               p.CodigoProyecto,
                               p.ProyectoID
                           };
                return JsonConvert.SerializeObject(data);
            }
        }

        
        public string GetPostesByProyecto(int proyectoID,bool allField = false)
        {
            var lista = base._GetPostesByProyecto(proyectoID);
            if (allField)
            {
                return JsonConvert.SerializeObject(lista);
            }
            else
            {
                var data = from p in lista.ToList()
                           select new
                           {
                               Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                               p.CodigoPoste,
                               p.PosteID,
                               p.Lat,
                               p.Lon
                           };
                return JsonConvert.SerializeObject(data);
            }
        }

        public string GetContratistasByProyecto(int proyectoID, bool allField = false)
        {
            var lista = base._GetContratistasByProyecto(proyectoID);
            if (allField)
            {
                return JsonConvert.SerializeObject(lista);
            }
            else
            {
                var data = from p in lista.ToList()
                           select new
                           {
                               Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                               p.CodigoContratista,
                               p.ContratistaID,
                               p.ProyectoID
                           };
                return JsonConvert.SerializeObject(data);
            }
        }

        public string GetActividadesByPoste(int posteID, bool allField = false)
        {
            var lista = base._GetActividadesByPoste(posteID);
            if (allField)
            {
                return JsonConvert.SerializeObject(lista);
            }
            else
            {
                var data = from p in lista.ToList()
                           select new
                           {
                               Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                               p.CodigoPoste,
                               p.UniCons,
                               p.DescripcionActividad,
                               p.Cantidad,
                               p.Hasta,
                               p.PlanillaID
                           };
                return JsonConvert.SerializeObject(data);
            }
        }

        public string GetActividadesByProyecto(int proyectoID, bool allField = false)
        {
            var lista = base._GetActividadesByProyecto(proyectoID);
            if (allField)
            {
                return new HttpGeoMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    PayLoad = lista.ToList(),
                }.ToJson();
            }
            else
            {
                var data = from p in lista.ToList()
                           select new
                           {
                               p.ActividadID,
                               p.ProyectoID,
                               p.CodigoProyecto,
                               Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                               p.CodigoPoste,
                               p.UniCons,
                               p.DescripcionActividad,
                               p.ActividadPrimaria,
                               p.ActividadSecundaria,
                               p.ActividadSGT,
                               p.Cantidad,
                               p.Hasta,
                               p.PlanillaID,
                               p.CodigoContratista,
                               p.CodigoFicha
                           };
                return new HttpGeoMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    PayLoad = data,
                }.ToJson();
            }
        }

        public string GetFichasByContratista(int contratistaID, bool allField = false)
        {
            var lista = base._GetFichasByContratista(contratistaID);
            if (allField)
            {
                return JsonConvert.SerializeObject(lista);
            }
            else
            {
                var data = from p in lista.ToList()
                           select new
                           {
                               p.FichaID,
                               p.CodigoFicha,
                               p.ContratistaID,
                           };
                return JsonConvert.SerializeObject(data);
            }
        }
        public string GetPostesByProyectoDiferenteDe(int proyectoID, int diferenteDe, bool allField = false)
        {
            var lista = base._GetPostesByProyecto(proyectoID, diferenteDe);
            if (allField)
            {
                return JsonConvert.SerializeObject(lista);
            }
            else
            {
                var data = from p in lista.ToList()
                           select new
                           {
                               Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                               p.CodigoPoste,
                               p.PosteID,
                               p.Lat,
                               p.Lon
                           };
                return JsonConvert.SerializeObject(data);
            }
        }


        public string GetUniconsByProyecto(int proyectoID, bool allField = false)
        {
            var lista = base._GetUniconsByProyecto(proyectoID);
            if (allField)
            {
                return JsonConvert.SerializeObject(lista);
            }
            else
            {
                var data = from p in lista.ToList()
                           select new
                           {
                               Fecha = p.Fecha.ToString("dd/MM/yyyy"),
                               p.UniCons,
                               p.DescripcionActividad,
                               p.ActividadID,
                               p.ProyectoID,
                               p.ActividadSecundaria
                           };
                return JsonConvert.SerializeObject(data);
            }
        }
/********CRUD**********/
        [System.Web.Mvc.HttpPost]
        public string InsertPlanilla(Planilla entity)
        {
            try
            {
                entity.EmpresaID = usuario.EmpresaID;
                entity.FechaIngreso = DateTime.Now;
                entity.UserID = usuario.UsuarioID;
                entity.Verificado = false;
                var result = this._InsertPlanilla(entity);
                var data = result.Where(p => p.FechaIngreso.Value.Date == DateTime.Now.Date).ToList();
                //GlobalConfiguration.Configuration.Formatters.JsonFormatter
                //return new HttpResponseMessage
                //{
                //    StatusCode = HttpStatusCode.OK,
                //    Content = GetContet(entity)
                //};
                var geoMessa = new HttpGeoMessage
                {
                    StatusCode = HttpStatusCode.OK,
                    PayLoad = data,
                };
                return geoMessa.ToJson();
            }
            catch (SqlException ex)
            {
                if (ex.Message.Contains("UNIQUE KEY 'UniqueByFecha'"))
                {
                    var ret = new HttpGeoMessage
                    {
                        StatusCode = HttpStatusCode.Conflict,
                        Content = GetContet(entity),
                        ReasonPhrase = "Esta actividad ya fue registrada en el sistema"
                    };
                    return ret.ToJson();
                }
                return new HttpGeoMessage
                {
                    StatusCode = HttpStatusCode.Conflict,
                    Content = GetContet(entity),
                    ReasonPhrase = "Error no controlado."
                }.ToJson();
            }
            catch (Exception ex)
            {
                return new HttpGeoMessage
                {
                    StatusCode = HttpStatusCode.Conflict,
                    Content = GetContet(entity),                    
                    ReasonPhrase = "Error no controlado."
                }.ToJson();
            }
        }

        public string Update(Planilla entity)
        {
            /**[Ojo] con  postes que no están en el mismo proyecto***/
            var old = this._GetPlanilla(entity.PlanillaID).SingleOrDefault();
            if (old != null && !old.Verificado)
            {
                old.ActividadID = old.ActividadID;
                old.Cantidad = entity.Cantidad;
                old.Fecha = entity.Fecha;
                old.FechaModificacion = DateTime.Now;
                old.PosteID = entity.PosteID;
                old.ProyectoID = entity.ProyectoID;
                old.Verificado = entity.Verificado;
                old.PosteIDHasta = entity.PosteIDHasta;
                old.FichaID = entity.FichaID;
                //old.UserID = entity.UserID;
                old.UserIDModifica = usuario.UsuarioID;
                old.UserIDModifica = entity.UserIDModifica;
                var data = this._UpdatePlanilla(old);
                return JsonConvert.SerializeObject(data);
            }
            else
            {
                return JsonConvert.SerializeObject(new MenssageModel {
                 message = "Transacción VERIFICADA y no se puede modificar."
                });
            }
            //return db.VW_Planillas.SingleOrDefault(p => p.PlanillaID == entity.PlanillaID);
        }

        public string GetPlanilla(int planillaID)
        {
            var data = this._GetPlanilla(planillaID);
            return JsonConvert.SerializeObject(data);
        }

        public string GetPlanillas(int proyectoid, int posteid, int actividadid)
        {
            var data = this._GetPlanillas(proyectoid, posteid, actividadid);

            return new HttpGeoMessage
            {
                StatusCode = HttpStatusCode.OK,
                PayLoad = data
            }.ToJson();
        }

        public string GetPlanillasOfDay()
        {
            var data = this._GetPlanillas(0,0,0)
                .Where(p => p.FechaIngreso.Value.Date == DateTime.Now.Date)
                .ToList();
            return new HttpGeoMessage
            {
                StatusCode = HttpStatusCode.OK,
                PayLoad = from p in data select new
                       {
                           p.PlanillaID,
                           p.ProyectoID,
                           p.PosteID,
                           p.FichaID,
                           p.ContratistaID,
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
                       }
            }.ToJson();
        }

        public string DeletePlanilla(int planillaid)
        {
            try
            {
                var entity = this._GetPlanilla(planillaid);
                if (entity.SingleOrDefault().Verificado == true)
                {
                    return JsonConvert.SerializeObject(new MenssageModel
                    {
                        message = "Transacción VERIFICADA y no se puede modificar."
                    });
                }
              return   JsonConvert.SerializeObject(this._DeletePlanilla(planillaid));
            }
            catch (Exception ex)
            {
                return JsonConvert.SerializeObject(new MenssageModel
                {
                    message = ex.Message
                });
            }
        }
    }
}
