using System;
namespace GeoMapxBusiness.Interfaces
{
    public interface IPlanilla
    {
        GeoMapxBusiness.Planilla Create(GeoMapxBusiness.Planilla aPlanilla);
        bool Delete(int planillaID);
        System.Collections.Generic.List<GeoMapxBusiness.Planilla> RetrieveAll(int planillaID);
        System.Collections.Generic.List<GeoMapxBusiness.Planilla> RetrieveAllPaged(int empresaID, int page, int recordsPerPage);
        GeoMapxBusiness.Planilla RetrieveByID(int planillaID);
        bool Update(GeoMapxBusiness.Planilla aPlanilla);
        VW_Planilla VWRetrieveByID(int entityID);

        System.Collections.Generic.List<VW_Planilla> VWRetrieveAllPaged(int empresaID, int page, int recordsPerPage);

        System.Collections.Generic.List<VW_Planilla> VWRetrieveAll(int empresaID);

        System.Collections.Generic.List<VW_Planilla> VWRetrieveAll(int empresaID, Models.FiltroPlanillas filter);
    }
}
