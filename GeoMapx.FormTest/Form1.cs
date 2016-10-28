using Microsoft.Reporting.WinForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Windows.Forms;

namespace GeoMapx.FormTest
{
    public partial class Form1 : Form
    {
        GeoMapxBusiness.GeoMapxDBDataContext db = new GeoMapxBusiness.GeoMapxDBDataContext();
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
        
        }

        private void button1_Click(object sender, EventArgs e)
        {
            var data = from p in db.VW_DetalleManoDeObras
                       where p.ProyectoID == 1
                       select p;
            try
            {
                var cubicacion = db.Cubicaciones.FirstOrDefault(p => p.ProyectoID == 1 
                    && p.SecuenciaID == 1);
                reportViewer1.Visible = true;
                reportViewer1.Reset();
                reportViewer1.LocalReport.Dispose();
                reportViewer1.LocalReport.DataSources.Clear();
                //reportViewer1.LocalReport.ReportPath = "Report1.rdlc";
                //reportViewer1.LocalReport.ReportPath = @"C:\App\GeoMapx\GeoMapx.Reports\GeoMapx.Reports\RptManoDeObraPorCubicacion.rdl";
                reportViewer1.LocalReport.ReportPath = @"C:\App\GeoMapx\GeoMapx.Reports\GeoMapx.Reports\RptManoDeObraPorCubicacion.rdl";
                ReportDataSource ds = new ReportDataSource("DataSet1", data.ToList());
                reportViewer1.LocalReport.DataSources.Add(ds);
                ReportParameter[] p1 = new ReportParameter[5];
                p1[0] = new ReportParameter("PROYECTO", cubicacion.Proyecto.CodigoProyecto);
                p1[3] = new ReportParameter("NO_CUBICACION", cubicacion.SecuenciaID.ToString());
                //p1[1] = new ReportParameter("FECHA_INICIAL", cubicacion.FechaInicio.ToShortDateString());
                //p1[2] = new ReportParameter("FECHA_FINAL", cubicacion.FechaFin.ToShortDateString());
                p1[4] = new ReportParameter("FECHA", "27/10/2016");
                p1[1] = new ReportParameter("FechaInicio", cubicacion.FechaInicio.ToShortDateString());
                p1[2] = new ReportParameter("FechaFin", cubicacion.FechaFin.ToShortDateString());
                reportViewer1.LocalReport.SetParameters(p1);
                reportViewer1.LocalReport.Refresh();
                reportViewer1.RefreshReport();

                
                //reportViewer1.LocalReport.SetParameters(p1);
            }
            catch (Exception ex)
            {
                reportViewer1.Visible = false;
                MessageBox.Show(ex.ToString());
            }
        }
        private void button1_Click1(object sender, EventArgs e)
        {
            var data = from p in db.VW_DetalleManoDeObras
                       where p.ProyectoID == 1
                       select p;
            try
            {
                var cubicacion = db.Cubicaciones.FirstOrDefault(p => p.ProyectoID == 1
                    && p.SecuenciaID == 1);
                reportViewer1.Visible = true;
                reportViewer1.Reset();
                reportViewer1.LocalReport.Dispose();
                reportViewer1.LocalReport.DataSources.Clear();
                //reportViewer1.LocalReport.ReportPath = "Report1.rdlc";
                //reportViewer1.LocalReport.ReportPath = @"C:\App\GeoMapx\GeoMapx.Reports\GeoMapx.Reports\RptManoDeObraPorCubicacion.rdl";
                reportViewer1.LocalReport.ReportPath = @"C:\App\GeoMapx\GeoMapx.Reports\GeoMapx.Reports\RptManoDeObraPorCubicacion.rdl";
                ReportDataSource ds = new ReportDataSource("DataSet1", data.ToList());
                reportViewer1.LocalReport.DataSources.Add(ds);
                ReportParameter[] p1 = new ReportParameter[5];
                p1[0] = new ReportParameter("PROYECTO", cubicacion.Proyecto.CodigoProyecto);
                p1[3] = new ReportParameter("NO_CUBICACION", cubicacion.SecuenciaID.ToString());
                //p1[1] = new ReportParameter("FECHA_INICIAL", cubicacion.FechaInicio.ToShortDateString());
                //p1[2] = new ReportParameter("FECHA_FINAL", cubicacion.FechaFin.ToShortDateString());
                p1[4] = new ReportParameter("FECHA", "27/10/2016");
                p1[1] = new ReportParameter("FechaInicio", cubicacion.FechaInicio.ToShortDateString());
                p1[2] = new ReportParameter("FechaFin", cubicacion.FechaFin.ToShortDateString());
                reportViewer1.LocalReport.SetParameters(p1);
                reportViewer1.LocalReport.Refresh();
                reportViewer1.RefreshReport();


                //reportViewer1.LocalReport.SetParameters(p1);
            }
            catch (Exception ex)
            {
                reportViewer1.Visible = false;
                MessageBox.Show(ex.ToString());
            }

            //where p.pro
        }

        private void button2_Click(object sender, EventArgs e)
        {
            var data = from p in db.VW_DetalleManoDeObraPorUniCons
                       where p.ProyectoID == 1
                       select p;
            try
            {
                var cubicacion = db.Cubicaciones.FirstOrDefault(p => p.ProyectoID == 1
                    && p.SecuenciaID == 1);
                reportViewer1.Visible = true;
                reportViewer1.Reset();
                reportViewer1.LocalReport.Dispose();
                reportViewer1.LocalReport.DataSources.Clear();
                //reportViewer1.LocalReport.ReportPath = "Report1.rdlc";
                //reportViewer1.LocalReport.ReportPath = @"C:\App\GeoMapx\GeoMapx.Reports\GeoMapx.Reports\RptManoDeObraPorCubicacion.rdl";
                reportViewer1.LocalReport.ReportPath = @"C:\App\GeoMapx\GeoMapx.Reports\GeoMapx.Reports\RptManoDeObraPorUniCons.rdl";
                ReportDataSource ds = new ReportDataSource("DataSet1", data.ToList());
                reportViewer1.LocalReport.DataSources.Add(ds);
                ReportParameter[] p1 = new ReportParameter[4];
                p1[0] = new ReportParameter("PROYECTO", cubicacion.Proyecto.CodigoProyecto);
                p1[1] = new ReportParameter("FECHA_INICIAL", cubicacion.FechaInicio.ToShortDateString());
                p1[2] = new ReportParameter("FECHA_FINAL", cubicacion.FechaFin.ToShortDateString());
                p1[3] = new ReportParameter("NO_CUBICACION", cubicacion.SecuenciaID.ToString());
                //p1[4] = new ReportParameter("FECHA", "27/10/2016");
                //p1[1] = new ReportParameter("FechaInicio", cubicacion.FechaInicio.ToShortDateString());
                //p1[2] = new ReportParameter("FechaFin", cubicacion.FechaFin.ToShortDateString());
                reportViewer1.LocalReport.SetParameters(p1);
                reportViewer1.LocalReport.Refresh();
                reportViewer1.RefreshReport();


                //reportViewer1.LocalReport.SetParameters(p1);
            }
            catch (Exception ex)
            {
                reportViewer1.Visible = false;
                MessageBox.Show(ex.ToString());
            }

        }
    }
}
