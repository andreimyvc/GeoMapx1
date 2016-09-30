using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoMapxBusiness
{
    public class BLUsuarios
    {
        private int _empresaID;
        private int _userID;
        IUsuarios repository;

        public BLUsuarios(int empresaID, int userID)
        {
            this._empresaID = empresaID;
            this._userID = userID;
            this.repository = new DAL.Usuarios(); 
        }


        public BLUsuarios(int empresaID)
        {
            this._empresaID = empresaID;
            //this._userID = userID;
            this.repository = new DAL.Usuarios();
        }

        public Usuario Create(Usuario entity)
        {
            try
            {
                return repository.Create(entity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Usuario RetrieveByID(int entityID)
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

        public Usuario RetrieveByCode(string entityCode)
        {
            try
            {
                return repository.RetrieveByCode(this._empresaID, entityCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Usuario> RetrieveAll()
        {
            try
            {
                return repository.RetrieveAll(_empresaID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Usuario> RetrieveAllPaged(int page, int recordsPerPage)
        {
            try
            {
                return repository.RetrieveAllPaged(_empresaID, page, recordsPerPage);
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
