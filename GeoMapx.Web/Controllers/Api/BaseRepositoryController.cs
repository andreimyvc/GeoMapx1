﻿using GeoMapx.Web.Models;
using GeoMapxBusiness;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;

namespace GeoMapx.Web.Controllers.Api
{
    public class BaseRepositoryController : ApiController
    {
        private GeoMapxBusiness.GeoMapxDBDataContext db = new GeoMapxBusiness.GeoMapxDBDataContext();
        public UsuarioModel usuario = new UsuarioModel { Nombre = "test", UsuarioID = 1, EmpresaID = 1 };
        public int empresaid = 1;
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

        #region Actividades
        public IQueryable<VW_ActividadesPoste> _GetActividadesByProyecto(int proyectoid)
        {
            var data = from p in db.VW_ActividadesPostes
                       where p.ProyectoID == proyectoid
                       select p;
            return data;
        }
        public IQueryable<VW_Actividade> _GetActividades()
        {
            var data = from p in db.VW_Actividades
                       select p;
            return data;
        }
        public Planilla _InsertPlanilla(Planilla entity)
        {
            db.Planillas.InsertOnSubmit(entity);
            db.SubmitChanges();
            return entity;
            //return db.VW_Planillas.SingleOrDefault(p => p.PlanillaID == entity.PlanillaID);
        }
        public VW_Planilla _GetPlanillaByID(int planillaid)
        {
            var data = from p in db.VW_Planillas
                       where p.PlanillaID == planillaid
                       select p;

            return data.FirstOrDefault();
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
        public IQueryable<Planilla> _GetPlanilla(int planillaID)
        {
            var data = from p in db.Planillas
                       where p.PlanillaID == planillaID
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
        public IQueryable<VW_ActividadesPoste> _GetActividadesByPoste(int posteid)
        {
            var data = from p in db.VW_ActividadesPostes
                       where p.PosteID == posteid
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
        #endregion
        #region Proyectos
        public IQueryable<Proyecto> _ProyectosActivosByEmpresaID(int empresaid)
        {
            var data = from p in db.Proyectos
                       where p.EmpresaID == empresaid
                       && p.Visible == true
                       select p;
            //return Json(data, JsonRequestBehavior.AllowGet);
            return data;
        }
        #endregion

        public IQueryable<VW_Poste> _GetPostes()
        {
            var data = from p in db.VW_Postes
                       select p;
            return data;
        }

        public IQueryable<Poste> _GetPostesByProyecto(int proyectoid)
        {
            var data = from p in db.Postes
                       where p.ProyectoID == proyectoid
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
    }
}