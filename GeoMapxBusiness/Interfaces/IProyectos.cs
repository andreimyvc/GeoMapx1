using System;
namespace GeoMapxBusiness.Interfaces
{
    public interface IProyectos
    {
        GeoMapxBusiness.Proyecto Create(GeoMapxBusiness.Proyecto entity);
        bool Delete(int entityID);
        System.Collections.Generic.List<GeoMapxBusiness.Proyecto> RetrieveAll(int entityID);
        System.Collections.Generic.List<GeoMapxBusiness.Proyecto> RetrieveAllPaged(int empresaID, int page, int recordsPerPage);
        GeoMapxBusiness.Proyecto RetrieveByID(int entityID);
        bool Update(GeoMapxBusiness.Proyecto entity);
    }
}
