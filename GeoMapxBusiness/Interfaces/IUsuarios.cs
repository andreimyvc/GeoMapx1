using System;
namespace GeoMapxBusiness.Interfaces
{
    public interface IUsuarios
    {
        GeoMapxBusiness.Usuario Create(GeoMapxBusiness.Usuario entity);
        bool Delete(int entityID);
        System.Collections.Generic.List<GeoMapxBusiness.Usuario> RetrieveAll(int entityID);
        System.Collections.Generic.List<GeoMapxBusiness.Usuario> RetrieveAllPaged(int empresaID, int page, int recordsPerPage);
        GeoMapxBusiness.Usuario RetrieveByID(int entityID);
        GeoMapxBusiness.Usuario RetrieveByCode(int empresaID, string entityCode);
        bool Update(GeoMapxBusiness.Usuario entity);
    }
}
