using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoMapxBusiness
{
    public class BLEmpresas : IEmpresas
    {
        private int _empresaID;
        private int _userID;
        IEmpresas repository;

        public BLEmpresas(int empresaID, int userID)
        {
            this._empresaID = empresaID;
            this._userID = userID;
            this.repository = new DAL.Empresas();
        }

        public BLEmpresas(int userID)
        {
            this._userID = userID;
            this.repository = new DAL.Empresas();
        }

        public BLEmpresas()
        {
            this.repository = new DAL.Empresas();
        }

        public Empresa Create(Empresa entity)
        {
            try
            {
                //entity.UserID = _userID;
                return repository.Create(entity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Empresa RetrieveByID(int entityID)
        {
            try
            {
                return repository.RetrieveByID(entityID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Empresa RetrieveByCode(string entityCode)
        {
            try
            {
                return repository.RetrieveByCode(entityCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Empresa> RetrieveAll()
        {
            try
            {
                return repository.RetrieveAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Empresa> RetrieveAllPaged(int page, int recordsPerPage)
        {
            try
            {
                return repository.RetrieveAllPaged(page, recordsPerPage);
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
                return repository.Update(entity);
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
                return repository.Delete(entityID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
