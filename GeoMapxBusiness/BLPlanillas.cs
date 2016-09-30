using GeoMapxBusiness.Interfaces;
using GeoMapxBusiness.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoMapxBusiness
{
    public class BLPlanillas
    {
        private int _empresaID;
        private int _userID;
        IPlanilla repository;

        public BLPlanillas(int empresaID, int userID)
        {
            this._empresaID = empresaID;
            this._userID = userID;
            this.repository = new DAL.Planillas(); 
        }

        public Planilla Create(Planilla entity)
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

        public Planilla RetrieveByID(int entityID)
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


        public VW_Planilla VWRetrieveByID(int entityID)
        {
            try
            {
                return repository.VWRetrieveByID(entityID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Planilla> RetrieveAll()
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

        public List<Planilla> RetrieveAllPaged(int page, int recordsPerPage)
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

        public List<VW_Planilla> VWRetrieveAll()
        {
            try
            {
                return repository.VWRetrieveAll(_empresaID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<VW_Planilla> VWRetrieveAll(FiltroPlanillas filter)
        {
            try
            {
                return repository.VWRetrieveAll(_empresaID, filter);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<VW_Planilla> VWRetrieveAllPaged(int page, int recordsPerPage)
        {
            try
            {
                return repository.VWRetrieveAllPaged(_empresaID, page, recordsPerPage);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool Update(Planilla entity)
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
