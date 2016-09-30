using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoMapxBusiness.Interfaces
{
    public interface IActividades
    {
        Actividade Create(Actividade aActividad);
        Actividade RetrieveByID(int actividadID);
        List<Actividade> RetrieveAll(int empresaID);
        List<Actividade> RetrieveAllPaged(int empresaID, int page, int recordsPerPage);
        bool Update(Actividade aActividad);
        bool Delete(int actividadID);
    }
}
