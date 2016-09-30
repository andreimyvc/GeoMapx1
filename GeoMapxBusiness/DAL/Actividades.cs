using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoMapxBusiness.DAL
{
    public class Actividades : IActividades
    {
        private GeoMapxDBDataContext db;
        public Actividades()
        {
            db = new GeoMapxDBDataContext();
            db.DeferredLoadingEnabled = false;
        }

        public Actividades(string connectrionString)
        {
            db = new GeoMapxDBDataContext(connectrionString);
        }

        public Actividade Create(Actividade entity)
        {
            Actividade result = null;
            try
            {
                db.Actividades.InsertOnSubmit(entity);
                db.SubmitChanges();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Actividade RetrieveByID(int entityID)
        {
            Actividade result = null;
            try
            {
                result = db.Actividades.Single(p => p.ActividadID == entityID);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Actividade> RetrieveAll(int empresaID)
        {
            List<Actividade> result = null;
            try
            {
                result = db.Actividades.Where(p => p.EmpresaID == empresaID).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Actividade> RetrieveAllPaged(int empresaID, int page, int recordsPerPage)
        {
            List<Actividade> result = null;
            try
            {
                result = db.Actividades.Where(p => p.EmpresaID == empresaID)
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

        public bool Update(Actividade entity)
        {
            try
            {
                var old = db.Actividades.Single(p => p.ActividadID == entity.ActividadID);
                old.ActividadPrimaria = entity.ActividadPrimaria;
                old.ActividadSecundaria = entity.ActividadSecundaria;
                old.ActividadSGT = entity.ActividadSGT;
                old.DescripcionActividad = entity.DescripcionActividad;
                old.UniCons = entity.UniCons;
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
                db.Actividades.DeleteOnSubmit(old);
                db.SubmitChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
