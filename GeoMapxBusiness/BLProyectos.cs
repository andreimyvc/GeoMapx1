using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoMapxBusiness
{
    public class BLProyectos
    {
        private int _empresaID;
        private int _userID;
        IProyectos repository;

        public BLProyectos(int empresaID, int userID)
        {
            this._empresaID = empresaID;
            this._userID = userID;
            this.repository = new DAL.Proyectos(); 
        }

        public Proyecto Create(Proyecto entity)
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

        public Proyecto RetrieveByID(int entityID)
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

        public List<Proyecto> RetrieveAll()
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

        public List<Proyecto> RetrieveAllPaged(int page, int recordsPerPage)
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

        public bool Update(Proyecto entity)
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
