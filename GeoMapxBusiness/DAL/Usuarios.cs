using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GeoMapxBusiness.DAL
{
    public class Usuarios : IUsuarios
    {
        private GeoMapxDBDataContext db;
        public Usuarios()
        {
            db = new GeoMapxDBDataContext();
            db.DeferredLoadingEnabled = false;
        }

        public Usuarios(string connectrionString)
        {
            db = new GeoMapxDBDataContext(connectrionString);
        }

        public Usuario Create(Usuario entity)
        {
            Usuario result = null;
            try
            {
                db.Usuarios.InsertOnSubmit(entity);
                db.SubmitChanges();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Usuario RetrieveByID(int entityID)
        {
            Usuario result = null;
            try
            {
                result = db.Usuarios.Single(p => p.UserID == entityID);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Usuario RetrieveByCode(int empresaID, string entityCode)
        {
            Usuario result = null;
            try
            {
                result = db.Usuarios.Single(p => p.EmpresaID == empresaID
                && p.UserCode == entityCode);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<Usuario> RetrieveAll(int empresaID)
        {
            List<Usuario> result = null;
            try
            {
                result = db.Usuarios.Where(p => p.EmpresaID == empresaID).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Usuario> RetrieveAllPaged(int empresaID, int page, int recordsPerPage)
        {
            List<Usuario> result = null;
            try
            {
                result = db.Usuarios.Where(p => p.EmpresaID == empresaID)
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

        public bool Update(Usuario entity)
        {
            try
            {
                var old = db.Usuarios.Single(p => p.UserID == entity.UserID);
                old.UserName = old.UserName;
                old.UserCode = entity.UserCode;
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
                db.Usuarios.DeleteOnSubmit(old);
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
