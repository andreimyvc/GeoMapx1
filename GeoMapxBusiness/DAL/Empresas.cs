using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoMapxBusiness.DAL
{
    public class Empresas:IEmpresas
    {
        private GeoMapxDBDataContext db;
        public Empresas()
        {
            db = new GeoMapxDBDataContext();
            db.DeferredLoadingEnabled = false;
        }

        public Empresas(string connectrionString)
        {
            db = new GeoMapxDBDataContext(connectrionString);
        }

        public Empresa Create(Empresa entity)
        {
            Empresa result = null;
            try
            {
                db.Empresas.InsertOnSubmit(entity);
                db.SubmitChanges();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Empresa RetrieveByID(int entityID)
        {
            Empresa result = null;
            try
            {
                result = db.Empresas.Single(p => p.EmpresaID == entityID);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Empresa RetrieveByCode(string entityCode)
        {
            Empresa result = null;
            try
            {
                result = db.Empresas.Single(p => p.CodigoEmpresa == entityCode);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Empresa> RetrieveAll()
        {
            List<Empresa> result = null;
            try
            {
                result = db.Empresas.Select(p => p).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Empresa> RetrieveAllPaged(int page, int recordsPerPage)
        {
            List<Empresa> result = null;
            try
            {
                result = db.Empresas
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

        public bool Update(Empresa entity)
        {
            try
            {
                var old = db.Empresas.Single(p => p.EmpresaID == entity.EmpresaID);
                old.CodigoEmpresa = entity.CodigoEmpresa;
                old.NombreEmpresa = entity.NombreEmpresa;
                db.SubmitChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Delete(int empresaID)
        {
            try
            {
                var old = RetrieveByID(empresaID);
                db.Empresas.DeleteOnSubmit(old);
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
