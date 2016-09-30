using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoMapxBusiness
{
    public class BLPostes
    {
        private int _empresaID;
        private int _userID;
        IPostes repository;

        public BLPostes(int empresaID, int userID)
        {
            this._empresaID = empresaID;
            this._userID = userID;
            this.repository = new DAL.Postes(); 
        }

        public Poste Create(Poste entity)
        {
            try
            {
                entity.UserID = _userID;
                entity.UserIDModifica = _userID;
                return repository.Create(entity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Poste RetrieveByID(int entityID)
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

        public List<Poste> RetrieveAll()
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

        public List<Poste> RetrieveAllPaged(int page, int recordsPerPage)
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

        public bool Update(Poste entity)
        {
            try
            {
                entity.UserIDModifica = _userID;
                entity.FechaModificacion = DateTime.Now;
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
