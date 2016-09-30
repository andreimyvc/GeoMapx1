using System;
namespace GeoMapxBusiness.Interfaces
{
    public interface IFinancieras
    {
        GeoMapxBusiness.Financiera Create(GeoMapxBusiness.Financiera aFinanciera);
        bool Delete(int financieraID);
        System.Collections.Generic.List<GeoMapxBusiness.Financiera> RetrieveAll(int empresaID);
        System.Collections.Generic.List<GeoMapxBusiness.Financiera> RetrieveAllPaged(int empresaID, int page, int recordsPerPage);
        GeoMapxBusiness.Financiera RetrieveByID(int financieraID);
        bool Update(GeoMapxBusiness.Financiera aFinanciera);
    }
}
