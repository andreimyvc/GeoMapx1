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
using System.Data.Linq.SqlClient;
using System.Transactions;

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
        public Actividade _InsertActividad(Actividade entity)
        {
            db.Actividades.InsertOnSubmit(entity);
            db.SubmitChanges();
            return entity;
            //return db.VW_Planillas.SingleOrDefault(p => p.PlanillaID == entity.PlanillaID);
        }
        public Actividade _UpdateActividad(Actividade entity)
        {
            var old = db.Actividades.Single(p => p.ActividadID == entity.ActividadID);
            old.ProyectoID = entity.ProyectoID;
            old.UniCons = entity.UniCons;
            old.ActividadPrimaria = entity.ActividadPrimaria;
            old.ActividadSecundaria = entity.ActividadSecundaria;
            old.Cantidad = entity.Cantidad;
            old.ActividadSGT = entity.ActividadSGT;
            old.DescripcionActividad = entity.DescripcionActividad;
            db.SubmitChanges();
            return entity;
        }
        public ActividadesPreBuild _UpdateActividadPrebuild(ActividadesPreBuild entity)
        {
            var old = db.ActividadesPreBuilds.Single(p => p.PreBuildID == entity.PreBuildID);
            if (entity.Ejecutado.Value)
            { 
                old.Ejecutado = true;
                old.FechaEjecutado = DateTime.Now;
            }
            else 
            {
                old.Ejecutado = false;
                old.FechaEjecutado = null;
            }
            db.SubmitChanges();
            return old;
        }
        public bool _DeleteActividad(int actividadID)
        {

            try
            {
                var old = db.Actividades.Single(p => p.ActividadID == actividadID);
                var totPla = db.Actividades.Count(p => p.Cantidad == actividadID);
                var totPre = db.Precios.Count(p => p.ActividadID == actividadID);
                if ((totPla + totPre) == 0)
                {
                    db.Actividades.DeleteOnSubmit(old);
                    db.SubmitChanges();
                    return true;
                }
                throw new Exception("No se puede eliminar esta actividad, algunos registros podrían quedar huérfanos.");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
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
        public IQueryable<string> _GetActividadesPrimarias(int proyectoid)
        {
            var data = db.Actividades.Where(p => p.ProyectoID == proyectoid)
                .Select(p => p.ActividadPrimaria).Distinct();
            return data;
        }
        public IQueryable<string> _GetActividadesSecundarias(int proyectoid)
        {
            var data = db.Actividades.Where(p => p.ProyectoID == proyectoid)
                .Select(p => p.ActividadSecundaria).Distinct();
            return data;
        }
        public IQueryable<VW_ActividadesPreBuild> _GetActividadesPrebuild()
        {
            var data = from p in db.VW_ActividadesPreBuilds
                       select p;
            return data;
        }
        public IQueryable<VW_ActividadesPreBuild> _GetActividadesPrebuildByProyecto(int proyectoid)
        {
            var data = from p in db.VW_ActividadesPreBuilds
                       where p.ProyectoID == proyectoid
                       select p;
            return data;
        }
        public IQueryable<VW_ActividadesPreBuild> _GetActividadesPrebuildByPoste(int posteid)
        {
            var data = from p in db.VW_ActividadesPreBuilds
                       where p.PosteID == posteid
                       select p;
            return data;
        }
        public Planilla _InsertPlanilla(Planilla entity)
        {
            db.Planillas.InsertOnSubmit(entity);
            db.SubmitChanges();
            return entity;
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
            if (old != null && !old.Verificado || (old != null && old.UserIDVerificador.Value == usuario.UsuarioID))
            {
                old.ActividadID = entity.ActividadID;
                old.Cantidad = entity.Cantidad;
                if (entity.Fecha != default(DateTime))
                {
                    old.Fecha = entity.Fecha;
                }
                old.FechaModificacion = DateTime.Now;
                old.PosteID = entity.PosteID;
                old.ProyectoID = entity.ProyectoID;
                old.Verificado = entity.Verificado;
                old.PosteIDHasta = entity.PosteIDHasta;
                old.FichaID = entity.FichaID;
                old.UserIDModifica = usuario.UsuarioID;
                old.Observacion = entity.Observacion;
                old.ContratistaID = entity.ContratistaID;
                old.Observacion = entity.Observacion;
                old.SupervisorID = entity.SupervisorID;
                old.SerialTransformador = entity.SerialTransformador;
                old.ObservacionVerificador = entity.ObservacionVerificador;
                if (old.Verificado)
                {  
                    old.FechaVerificado = DateTime.Now;
                    old.UserIDVerificador = entity.UserIDVerificador;
                }
                else
                { 
                    old.FechaVerificado = null;
                    old.UserIDVerificador = null; 
                }
                db.SubmitChanges();
            }
            else 
            {
                throw new Exception("!Transacción VERIFICADA y no se puede modificar por usted¡");
            }
            return entity;
            //return db.VW_Planillas.SingleOrDefault(p => p.PlanillaID == entity.PlanillaID);
        }
        public bool _UpdatePlanillaCerti(VW_Planilla entitys)
        {
            var planilla = db.Planillas.First(p => p.PlanillaID == entitys.PlanillaID);
            planilla.Verificado = entitys.Verificado;
            planilla.UserIDVerificador = usuario.UsuarioID;
            planilla.ObservacionVerificador = entitys.ObservacionVerificador;
            planilla.FechaVerificado = DateTime.Now;
            db.SubmitChanges();
            return true;
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
        #region Postes
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

        public IQueryable<Poste> _GetPostesByPoligono(int poligonoid)
        {
            var data = from p in db.Postes
                       where p.PoligonoID == poligonoid
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
        public IQueryable<TiposPoste> _GetTiposPoste()
        {
            var data = from p in db.TiposPostes
                       select p;
            return data;
        }
        public Poste _InsertPoste(Poste entity)
        {
            db.Postes.InsertOnSubmit(entity);
            db.SubmitChanges();
            return entity;
            //return db.VW_Planillas.SingleOrDefault(p => p.PlanillaID == entity.PlanillaID);
        }
        public Poste _UpdatePoste(Poste entity)
        {
            var old = db.Postes.Single(p => p.PosteID == entity.PosteID);
            old.Lat = entity.Lat;
            old.Lon = entity.Lon;
            old.ObservacionPoste = entity.ObservacionPoste;
            old.PoligonoID = entity.PoligonoID;
            old.ProyectoID = entity.ProyectoID;
            old.TipoPosteID = entity.TipoPosteID;
            old.UserIDModifica = entity.UserIDModifica;
            old.X = entity.X;
            old.Y = entity.Y;
            old.Z = entity.Z;
            db.SubmitChanges();
            return entity;
        }
        public bool _DeletePoste(int posteid)
        {
            try
            {
                var old = db.Postes.Single(p => p.PosteID == p.PosteID);
                db.Postes.DeleteOnSubmit(old);
                db.SubmitChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        #endregion Postes
        
        #region Materiales
        internal IQueryable<VW_Materiale> _GetMateriales()
        {
            var data = from p in db.VW_Materiales
                       select p;
            return data;
        } 
        public Materiale _InsertMaterial(Materiale entity)
        {
            db.Materiales.InsertOnSubmit(entity);
            db.SubmitChanges();
            return entity;
            //return db.VW_Planillas.SingleOrDefault(p => p.PlanillaID == entity.PlanillaID);
        }
        public Materiale _UpdateMaterial(Materiale entity)
        {
            var old = db.Materiales.Single(p => p.MaterialID == entity.MaterialID); 
            //old.ProyectoID = entity.ProyectoID;
            //old.ActividadID = entity.ActividadID; 
            old.CodigoMaterial = entity.CodigoMaterial; 
            old.Descripcion = entity.Descripcion;
            //old.Cantidad = entity.Cantidad;
            //old.PrecioUnitario = entity.PrecioUnitario;
            db.SubmitChanges();
            return entity;
        }
        public bool _DeleteMaterial(int ActividadID)
        {
            try
            {
                var old = db.Materiales.Single(p => p.MaterialID == ActividadID);
                db.Materiales.DeleteOnSubmit(old);
                db.SubmitChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IQueryable<VW_Materiale> _GetMaterialesByProyecto(int proyectoid)
        {
            var data = from p in db.VW_Materiales 
                       where p.ProyectoID == proyectoid
                       select p;
            return data;
        }
        #endregion Materiales
        public IQueryable<Ficha> _GetFichasByContratista(int contratistaid)
        {
            var data = from p in db.Fichas
                       where p.ContratistaID == contratistaid
                       && p.Estatus == 'A'
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
        public IQueryable<VW_AvanceProyectoByMe> _GetAvanceByProyecto(int proyectoid)
        {
            var data = from p in db.VW_AvanceProyectoByMes
                       where p.ProyectoID == proyectoid
                       orderby p.Mes ascending
                       select p;
            return data;
        }   
        public IQueryable<VW_MontoEAP> _GetMontosEAP(int proyectoid, string mes)
        {
            var data = from p in db.VW_MontoEAPs
                       where p.ProyectoID == proyectoid && p.Mes == mes
                       select p;
            return data;
        }
        public IQueryable<VW_MontoCantidadEA> _GetMontosCantidadEAS(int proyectoid, string mes, string actividadPrimaria)
        {
            var data = from p in db.VW_MontoCantidadEAs
                       where p.ProyectoID == proyectoid && p.Mes == mes && p.ActividadPrimaria == actividadPrimaria
                       select p;
            return data;
        }
        public IQueryable<Poligono> _GetTPoligonosByProyecto(int proyectoid)
        {
            var data = from p in db.Poligonos
                       where p.ProyectoID == proyectoid
                       select p;
            return data;
        }
        public Supervisore _GetSupervisoresByID(int supervisorid)
        {
            var data = (from p in db.Supervisores
                       where p.SupervisorID == supervisorid
                       select p).SingleOrDefault();
            return data;
        }
        public IQueryable<Supervisore> _GetSupervisoresByProyecto(int proyectoid)
        {
            var data = from p in db.Supervisores
                       where p.ProyectoID == proyectoid
                       select p;
            return data;
        }
        public Poligono _GetTPoligonosByID(int poligonoid)
        {
            var data = from p in db.Poligonos
                       where p.PoligonoID == poligonoid
                       select p;
            return data.FirstOrDefault();
        }       
        public IQueryable<VW_Planilla> _GetPlanillaToCertificarByProyecto(int proyectoid, int usuarioid)
        {
            var data = from p in db.VW_Planillas
                       where p.ProyectoID == proyectoid
                       && (p.Verificado != true || 
                       (p.UserIDVerificador == usuarioid 
                       && p.FechaVerificado.Value.Date == DateTime.Now.Date))
                       select p;
            return data;
        }

        private IQueryable<VW_SecuenciaCubicacione> _GetSecuencias()
        {
            var data = from p in db.VW_SecuenciaCubicaciones
                       select p;
            return data;
        }

        internal IQueryable<VW_SecuenciaCubicacione> _GetSecuenciasByProyecto(int proyectoid)
        {
            var data = from p in db.VW_SecuenciaCubicaciones
                       where p.ProyectoID == proyectoid
                       select p;
            return data;
        }

        public SecuenciaCubicacione _InsertSecuenciaCubicacion(SecuenciaCubicacione entity)
        {
            entity.Fecha = DateTime.Now;
            entity.Estado = true;
            var max = db.SecuenciaCubicaciones.Where(p => p.ProyectoID == entity.ProyectoID);
            if (max != null && max.Count() > 0)
            {
                entity.Numero = (max.Max( p => p.Numero) + 1);
            }
            else
            {
                entity.Numero = 1;
            }
            entity.Fecha = DateTime.Now;
            entity.Estado = true;
            db.SecuenciaCubicaciones.InsertOnSubmit(entity);
            db.SubmitChanges();
            return entity;
        }

        public SecuenciaCubicacione _UpdateSecuenciaCubicacion(SecuenciaCubicacione entity)
        {
            var old = db.SecuenciaCubicaciones.SingleOrDefault( p => p.SecuenciaID == entity.SecuenciaID);
            old.Estado = !old.Estado;// entity.Estado;
            db.SubmitChanges();
            return entity;
        }
        public void _InsertCubicaciones(List<Cubicacione> entity)
        {//[Ojo] Hacer un store procedure
            //db.ObjectTrackingEnabled = true;
            //using (TransactionScope trans = new TransactionScope())
            //{
            //        try
            //        {
            //            //do some insert
            //            db.SubmitChanges();

            //            //do some updates
            //            db.SubmitChanges();

            //            trans.Complete();
            //        }
            //        catch (Exception ex) {}
            //}
            foreach (var cub in entity)
            {
                //cub.EstadoActividades
                cub.Fecha = DateTime.Now;
                var planillas = db.Planillas.Where( p =>  p.ProyectoID == cub.ProyectoID && p.CubicacionID == null &&
                    p.Fecha <= cub.FechaFin && p.Fecha >= cub.FechaInicio 
                    && (cub.ActividadPrimaria == "Todos" ||  p.Actividade.ActividadPrimaria == cub.ActividadPrimaria)
                    && (cub.ActividadSecundaria == "Todos" || p.Actividade.ActividadSecundaria == cub.ActividadSecundaria)
                    && (cub.EstadoActividades == null || p.Verificado == cub.EstadoActividades));
                db.Cubicaciones.InsertOnSubmit(cub);
                foreach(var p in planillas)
                {
                    cub.Planillas.Add(p);
                }
            } 
            db.SubmitChanges();
            //return db.VW_Planillas.SingleOrDefault(p => p.PlanillaID == entity.PlanillaID);
        }
    }
}