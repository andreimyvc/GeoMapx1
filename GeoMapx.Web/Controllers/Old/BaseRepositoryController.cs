using GeoMapxBusiness;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Mvc;

namespace GeoMapx.Web.Controllers
{
    public class BaseRepositoryController : Controller
    {
        private GeoMapxBusiness.GeoMapxDBDataContext db = new GeoMapxBusiness.GeoMapxDBDataContext();
        public BaseRepositoryController()
        {
            db.DeferredLoadingEnabled = false;
        }
        public StringContent GetContet(object entity, Formatting formatt = Formatting.None)
        {
            string strJson = JsonConvert.SerializeObject(entity, Formatting.None);
            StringContent json = new StringContent(strJson, Encoding.UTF8, "application/json");
            return json;
        }
        public string/*JsonResult*/ GetActividades1()
        {
            var data = from p in db.VW_Planillas.Take(40).ToList()
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
        public IQueryable<Proyecto> _ProyectosActivosByEmpresaID(int empresaid)
        {
            var data = from p in db.Proyectos
                       where p.EmpresaID == empresaid
                       && p.Visible == true
                       select p;
            //return Json(data, JsonRequestBehavior.AllowGet);
            return data;
        }
        
        public IQueryable<Poste> _GetPostesByProyecto(int proyectoid)
         {
            var data = from p in db.Postes
                       where p.ProyectoID == proyectoid
                       select p;
            return data;
        }

        public IQueryable<Contratista> _GetContratistasByProyecto(int proyectoid)
        {
            var data = from p in db.Contratistas
                       where p.ProyectoID == proyectoid
                       select p;
            return data;
        }

        public IQueryable<Ficha> _GetFichasByContratista(int contratistaid)
        {
            var data = from p in db.Fichas
                       where p.ContratistaID == contratistaid
                       && p.Estatus == 'A'
                       select p;
            return data;
        }

        public IQueryable<Poste> _GetPostesByProyecto(int proyectoid, int posteidDiferente)
        {
            var data = from p in db.Postes
                       where p.ProyectoID == proyectoid && p.PosteID != posteidDiferente
                       select p;
            return data;
        } 

        public IQueryable<VW_ActividadesPoste> _GetActividadesByPoste(int posteid)
        {
            var data = from p in db.VW_ActividadesPostes
                       where p.PosteID == posteid
                       select p;
            return data;
        }

        public IQueryable<VW_ActividadesPoste> _GetActividadesByProyecto(int proyectoid)
        {
            var data = from p in db.VW_ActividadesPostes
                       where p.ProyectoID == proyectoid
                       select p;
            return data;
        }

        public IQueryable<Actividade> _GetUniconsByProyecto(int proyectoid)
        {
            var data = from p in db.Actividades
                       where p.ProyectoID == proyectoid
                       orderby p.UniCons ascending
                       select p;
            return data;
        }

        public IQueryable<VW_Planilla> _InsertPlanilla(Planilla entity)
        {
            db.Planillas.InsertOnSubmit(entity);
            db.SubmitChanges();
            return db.VW_Planillas;
            //return db.VW_Planillas.SingleOrDefault(p => p.PlanillaID == entity.PlanillaID);
        }

        public IQueryable<VW_Planilla> _GetPlanillas(int proyectoid, int posteid, int actividadid)
        {
            var data = from p in db.VW_Planillas
                       where (proyectoid == 0 || p.ProyectoID == proyectoid)
                       && (posteid == 0 || p.PosteID == posteid)
                       && (actividadid == 0 || p.ActividadID == actividadid)
                       select p;

            return data;
        }

        public Planilla _UpdatePlanilla(Planilla entity)
        {
            /**[Ojo] con  postes que no están en el mismo proyecto***/
            var old = db.Planillas.Single(p => p.PlanillaID == entity.PlanillaID);
            old.ActividadID = old.ActividadID;
            old.Cantidad = entity.Cantidad;
            old.Fecha = entity.Fecha;
            old.FechaModificacion = entity.FechaModificacion;
            old.PosteID = entity.PosteID;
            old.ProyectoID = entity.ProyectoID;
            old.Verificado = entity.Verificado;
            old.PosteIDHasta = entity.PosteIDHasta;
            old.FichaID = entity.FichaID;
            //old.UserID = entity.UserID;
            old.UserIDModifica = entity.UserIDModifica;
            db.SubmitChanges();
            return entity;
            //return db.VW_Planillas.SingleOrDefault(p => p.PlanillaID == entity.PlanillaID);
        }

        public IQueryable<Planilla> _GetPlanilla(int planillaID)
        {
            var data = from p in db.Planillas
                       where p.PlanillaID == planillaID
                       select p;
            return data;
        }

        public bool _DeletePlanilla(int planillaid)
        {
            try
            {
                var data = db.Planillas.Single( p=> p.PlanillaID == planillaid);
                db.Planillas.DeleteOnSubmit(data);
                db.SubmitChanges();
            }
            catch (Exception)
            {
            }
            return true;
        }
    }
}

























        //void Proyecto1()
        //{
        //    var postes = db.Postes.Select(p => p);
        //    foreach (var p in postes)
        //    {
        //        var cooar = GeoMapx.Web.Utils.Utils.ToLatLon(Convert.ToDouble(p.X), Convert.ToDouble(p.Y), "19N");
        //        p.Lat = Convert.ToDecimal(cooar.latitude);
        //        p.lon = Convert.ToDecimal(cooar.longitude);
        //        //db.Postes.Attach(p);
        //        //db.Postes.InsertOnSubmit(p);                
        //    }
        //    db.SubmitChanges();
        //}