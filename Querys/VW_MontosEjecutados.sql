select * from actividades where actividadid = 171
select * from materiales where actividadid = 171
select * from Planillas where actividadid = 171



select * from dbo.VW_MontosEjecutados 
create view VW_AvanceProyectoByMes as
select ((t2.SumMontoEjecutado / t1.CostoTotalProyecto) * 100) Porcentaje, t1.ProyectoID , t2.Mes, t2.SumMontoEjecutado as MontoEjecutado
from (
select ProyectoID, sum(MontoLicitadoTotal) CostoTotalProyecto
from dbo.VW_MontosByActividad
group by ProyectoID) as t1 
inner join (
select Mes, ProyectoID, sum(MontoEjecutado) SumMontoEjecutado
from dbo.VW_MontosEjecutados
group by Mes, ProyectoID)  as t2
on t1.proyectoID = t2.proyectoid

select * from VW_MontosEjecutados
select * from VW_AvanceProyectoByMes

select * from VW_AvanceProyectoByMes