using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoMapxBusiness.DAL
{
    public class Contratistas: IContratistas
    {
        private GeoMapxDBDataContext db;
        public Contratistas()
        {
            db = new GeoMapxDBDataContext();
            db.DeferredLoadingEnabled = false;
        }

        public Contratistas(string connectrionString)
        {
            db = new GeoMapxDBDataContext(connectrionString);
        }

        public Contratista Create(Contratista entity)
        {
            Contratista result = null;
            try
            {
                db.Contratistas.InsertOnSubmit(entity);
                db.SubmitChanges();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Contratista RetrieveByID(int entityID)
        {
            Contratista result = null;
            try
            {
                result = db.Contratistas.Single(p => p.ContratistaID == entityID);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Contratista> RetrieveAll(int empresaID)
        {
            List<Contratista> result = null;
            try
            {
                result = db.Contratistas.Where(p => p.EmpresaID == empresaID).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Contratista> RetrieveAllPaged(int empresaID, int page, int recordsPerPage)
        {
            List<Contratista> result = null;
            try
            {
                result = db.Contratistas.Where(p => p.EmpresaID == empresaID)
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

        public bool Update(Contratista entity)
        {
            try
            {
                var old = db.Contratistas.Single(p => p.ContratistaID == entity.ContratistaID);
                old.Descripcion = old.Descripcion;
                old.Fecha = entity.Fecha;
                old.Estatus = entity.Estatus;
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
                db.Contratistas.DeleteOnSubmit(old);
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
