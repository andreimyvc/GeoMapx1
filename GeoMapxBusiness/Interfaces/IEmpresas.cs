using System;
namespace GeoMapxBusiness.Interfaces
{
    public interface IEmpresas
    {
        Empresa Create(Empresa aEmpresa);
        bool Delete(int empresaID);
        System.Collections.Generic.List<Empresa> RetrieveAll();
        System.Collections.Generic.List<Empresa> RetrieveAllPaged(int page, int recordsPerPage);
        Empresa RetrieveByID(int empresID);
        Empresa RetrieveByCode(string entityCode);
        bool Update(Empresa aEmpresa);
    }
}
