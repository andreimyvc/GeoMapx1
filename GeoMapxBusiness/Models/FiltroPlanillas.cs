using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace GeoMapxBusiness.Models
{
    public class FiltroPlanillas
    {
        public int PlanillaID { get; set; }
        public string CodigoActividad { get; set; }
        public string DescripcionActividad { get; set; }
        public string CodigoContratista { get; set; }
        public string DescripcionContratista { get; set; }
        public string CodigoPoste { get; set; }
        public string CodigoProyecto { get; set; }
        public string DescripcionProyecto { get; set; }
    }
}
