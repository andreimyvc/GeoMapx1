using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoMapxBusiness.DAL
{
    public class Financieras:IFinancieras
    {
        private GeoMapxDBDataContext db;
        public Financieras()
        {
            db = new GeoMapxDBDataContext();
            db.DeferredLoadingEnabled = false;
        }

        public Financieras(string connectrionString)
        {
            db = new GeoMapxDBDataContext(connectrionString);
        }

        public Financiera Create(Financiera entity)
        {
            Financiera result = null;
            try
            {
                db.Financieras.InsertOnSubmit(entity);
                db.SubmitChanges();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Financiera RetrieveByID(int entityID)
        {
            Financiera result = null;
            try
            {
                result = db.Financieras.Single(p => p.FinancieraID == entityID);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Financiera> RetrieveAll(int empresaID)
        {
            List<Financiera> result = null;
            try
            {
                result = db.Financieras.Where(p => p.EmpresaID == empresaID).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Financiera> RetrieveAllPaged(int empresaID, int page, int recordsPerPage)
        {
            List<Financiera> result = null;
            try
            {
                result = db.Financieras.Where(p => p.EmpresaID == empresaID)
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

        public bool Update(Financiera entity)
        {
            try
            {
                var old = db.Financieras.Single(p => p.FinancieraID == entity.FinancieraID);
                old.CodioFinanciera = old.CodioFinanciera;
                old.DescripcionFinanciera = entity.DescripcionFinanciera;
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
                db.Financieras.DeleteOnSubmit(old);
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
