using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GeoMapx.Web.Startup))]
namespace GeoMapx.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
