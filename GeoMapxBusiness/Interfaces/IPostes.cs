using System;
namespace GeoMapxBusiness.Interfaces
{
    public interface IPostes
    {
        GeoMapxBusiness.Poste Create(GeoMapxBusiness.Poste aPlanilla);
        bool Delete(int planillaID);
        System.Collections.Generic.List<GeoMapxBusiness.Poste> RetrieveAll(int planillaID);
        System.Collections.Generic.List<GeoMapxBusiness.Poste> RetrieveAllPaged(int empresaID, int page, int recordsPerPage);
        GeoMapxBusiness.Poste RetrieveByID(int planillaID);
        bool Update(GeoMapxBusiness.Poste aPlanilla);
    }
}
