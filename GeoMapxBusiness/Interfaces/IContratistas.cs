using System;
namespace GeoMapxBusiness.Interfaces
{
    public interface IContratistas
    {
        GeoMapxBusiness.Contratista Create(GeoMapxBusiness.Contratista entity);
        bool Delete(int entityID);
        System.Collections.Generic.List<GeoMapxBusiness.Contratista> RetrieveAll(int entityID);
        System.Collections.Generic.List<GeoMapxBusiness.Contratista> RetrieveAllPaged(int empresaID, int page, int recordsPerPage);
        GeoMapxBusiness.Contratista RetrieveByID(int entityID);
        bool Update(GeoMapxBusiness.Contratista entity);
    }
}
