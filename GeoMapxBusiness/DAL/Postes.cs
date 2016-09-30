using GeoMapxBusiness.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GeoMapxBusiness.DAL
{
    public class Postes:IPostes
    {
        private GeoMapxDBDataContext db;
        public Postes()
        {
            db = new GeoMapxDBDataContext();
        }

        public Postes(string connectrionString)
        {
            db = new GeoMapxDBDataContext(connectrionString);
        }

        public Poste Create(Poste entity)
        {
            Poste result = null;
            try
            {;
                db.Postes.InsertOnSubmit(entity);
                db.SubmitChanges();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Poste RetrieveByID(int entityID)
        {
            Poste result = null;
            try
            {
                result = db.Postes.Single(p => p.PosteID == entityID);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Poste> RetrieveAll(int empresaID)
        {
            List<Poste> result = null;
            try
            {
                result = db.Postes.Where(p => p.EmpresaID == empresaID).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Poste> RetrieveAllPaged(int empresaID, int page, int recordsPerPage)
        {
            List<Poste> result = null;
            try
            {
                result = db.Postes.Where(p => p.EmpresaID == empresaID)
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

        public bool Update(Poste entity)
        {
            try
            {
                var old = db.Postes.Single(p => p.PosteID == entity.PosteID);
                old.ObservacionPoste = old.ObservacionPoste;
                old.Fecha = entity.Fecha;
                old.FechaModificacion = entity.FechaModificacion;
                old.PosteID = entity.PosteID;
                old.ProyectoID = entity.ProyectoID;
                old.TipoPosteID = entity.TipoPosteID;
                old.X = entity.X;
                old.Y = entity.Y;
                old.Z = entity.Z;
                //old.UserID = entity.UserID;
                old.UserIDModifica = entity.UserIDModifica;
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
                db.Postes.DeleteOnSubmit(old);
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
