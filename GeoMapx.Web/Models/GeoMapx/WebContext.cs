using System.Data.Entity;
using GeoMapxBusiness;

namespace GeoMapx.Web.Models.GeoMapx
{
    public class WebContext : DbContext
    {
        // Puede agregar código personalizado a este archivo. Los cambios no se sobrescribirán.
        // 
        // Si desea que Entity Framework lo omita y regenere la base de datos
        // automáticamente siempre que cambie el esquema de modelo, agregue
        // el siguiente código al método Application_Start en el archivo Global.asax.
        // Nota: esta operación destruirá y volverá a crear la base de datos con cada cambio de modelo.
        // 
        // System.Data.Entity.Database.SetInitializer(new System.Data.Entity.DropCreateDatabaseIfModelChanges<GeoMapx.Web.Models.GeoMapx.WebContext>());

        public WebContext() : base("name=WebContext")
        {
        }

        public DbSet<Gente> Gentes { get; set; }
    }
}
