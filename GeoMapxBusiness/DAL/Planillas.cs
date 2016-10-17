using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Data.Linq.SqlClient;

namespace GeoMapxBusiness.DAL
{
    public class Planillas:IPlanilla
    {
        private GeoMapxDBDataContext db;
        public Planillas()
        {
            db = new GeoMapxDBDataContext();
            db.DeferredLoadingEnabled = false;
        }

        public Planillas(string connectrionString)
        {
            db = new GeoMapxDBDataContext(connectrionString);
        }

        public Planilla Create(Planilla entity)
        {
            Planilla result = null;
            try
            {
                db.Planillas.InsertOnSubmit(entity);
                db.SubmitChanges();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Planilla RetrieveByID(int entityID)
        {
            Planilla result = null;
            try
            {
                result = db.Planillas.Single(p => p.PlanillaID == entityID);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Planilla> RetrieveAll(int empresaID)
        {
            List<Planilla> result = null;
            try
            {
                result = db.Planillas.Where(p => p.EmpresaID == empresaID).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Planilla> RetrieveAllPaged(int empresaID, int page, int recordsPerPage)
        {
            List<Planilla> result = null;
            try
            {
                result = db.Planillas.Where(p => p.EmpresaID == empresaID)
                    .Skip(page * recordsPerPage)
                    .Take(recordsPerPage)
                    .ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(Planilla entity)
        {
            try
            {
                var old = db.Planillas.Single(p => p.PlanillaID == entity.PlanillaID);
                old.ActividadID = old.ActividadID;
                old.Cantidad = entity.Cantidad;
                old.PosteIDHasta = entity.PosteIDHasta;
                old.Fecha = entity.Fecha;
                old.FechaModificacion = entity.FechaModificacion;
                old.PosteID = entity.PosteID;
                old.ProyectoID = entity.ProyectoID;
                //old.UserID = entity.UserID;
                old.UserIDModifica = entity.UserIDModifica;
                db.SubmitChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Delete(int entityID)
        {
            try
            {
                var old = RetrieveByID(entityID);
                db.Planillas.DeleteOnSubmit(old);
                db.SubmitChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public VW_Planilla VWRetrieveByID(int entityID)
        {
            VW_Planilla result = null;
            try
            {
                result = db.VW_Planillas.Single(p => p.PlanillaID == entityID);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<VW_Planilla> VWRetrieveAllPaged(int empresaID, int page, int recordsPerPage)
        {
            List<VW_Planilla> result = null;
            try
            {
                result = db.VW_Planillas.Where(p => p.EmpresaID == empresaID)
                    .Skip(page * recordsPerPage)
                    .Take(recordsPerPage)
                    .ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<VW_Planilla> VWRetrieveAll(int empresaID)
        {
            List<VW_Planilla> result = null;
            try
            {
                result = db.VW_Planillas.Where(p => p.EmpresaID == empresaID)
                    .ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<VW_Planilla> VWRetrieveAll(int empresaID, 
            Models.FiltroPlanillas filter)
        {

            List<VW_Planilla> result = null;
            try
            {
                var planillas = from p in db.VW_Planillas
                                where p.EmpresaID == empresaID
                                select p;

                if (!string.IsNullOrWhiteSpace(filter.CodigoProyecto))
                {
                    planillas = planillas.Where(p => p.CodigoProyecto == filter.CodigoProyecto);
                }
                if (!string.IsNullOrWhiteSpace(filter.DescripcionProyecto))
                {
                    planillas = planillas.Where(p => SqlMethods.Like(p.DescripcionProyecto, "%" + filter.DescripcionProyecto + "%"));
                } 
                if (!string.IsNullOrWhiteSpace(filter.CodigoContratista))
                {
                    planillas = planillas.Where(p => p.CodigoContratista == filter.CodigoContratista);
                }
                if (!string.IsNullOrWhiteSpace(filter.DescripcionContratista))
                {
                    planillas = planillas.Where(p => SqlMethods.Like(p.DescripcionContratista, "%" + filter.DescripcionContratista + "%"));
                }
                if (!string.IsNullOrWhiteSpace(filter.CodigoActividad))
                {
                    planillas = planillas.Where(p => p.UniCons == filter.CodigoActividad);
                } 
                if (!string.IsNullOrWhiteSpace(filter.DescripcionActividad))
                {
                    planillas = planillas.Where(p => SqlMethods.Like(p.DescripcionActividad,"%"+filter.DescripcionActividad+"%"));
                }
                if (!string.IsNullOrWhiteSpace(filter.CodigoPoste))
                {
                    planillas = planillas.Where(p => p.CodigoPoste == filter.CodigoPoste);
                }
                result = planillas.ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
