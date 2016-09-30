using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GeoMapxBusiness.DAL
{
    public class Proyectos : IProyectos
    {
        private GeoMapxDBDataContext db;
        public Proyectos()
        {
            db = new GeoMapxDBDataContext();
            db.DeferredLoadingEnabled = false;
        }

        public Proyectos(string connectrionString)
        {
            db = new GeoMapxDBDataContext(connectrionString);
        }

        public Proyecto Create(Proyecto entity)
        {
            Proyecto result = null;
            try
            {
                db.Proyectos.InsertOnSubmit(entity);
                db.SubmitChanges();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Proyecto RetrieveByID(int entityID)
        {
            Proyecto result = null;
            try
            {
                result = db.Proyectos.Single(p => p.ProyectoID == entityID);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Proyecto> RetrieveAll(int empresaID)
        {
            List<Proyecto> result = null;
            try
            {
                result = db.Proyectos.Where(p => p.EmpresaID == empresaID).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Proyecto> RetrieveAllPaged(int empresaID, int page, int recordsPerPage)
        {
            List<Proyecto> result = null;
            try
            {
                result = db.Proyectos.Where(p => p.EmpresaID == empresaID)
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

        public bool Update(Proyecto entity)
        {
            try
            {
                var old = db.Proyectos.Single(p => p.ProyectoID == entity.ProyectoID);
                old.CodigoProyecto = old.CodigoProyecto;
                old.Fecha = entity.Fecha;
                old.DescripcionProyecto = entity.DescripcionProyecto;
                old.FinancieraID = entity.FinancieraID;
                old.ProyectoID = entity.ProyectoID;
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
                db.Proyectos.DeleteOnSubmit(old);
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
