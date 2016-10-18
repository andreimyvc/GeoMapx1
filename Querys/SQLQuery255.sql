

update  actividades
set preciounitario = p.preciounitario, cantidad = p.cantidad 
from precios p 
where p.actividadid = actividades.actividadid
select * from materiales where actividadid = 5 and proyectoid = 1
select * from actividades where actividadid = 5and proyectoid = 1

select * from precios where actividadid = 171


create view  VW_MontosByActividad as
select p.CodigoProyecto, act.UniCons, (act.Cantidad * act.PrecioUnitario) as MontoLicitadoMO, act.Cantidad, 
act.ActividadID, act.ProyectoID, act.actividadprimaria, act.ActividadSecundaria,
(act.cantidad * CostoMaterialActividad) MontoLicitadoMA, 
((act.cantidad * CostoMaterialActividad)+ (act.cantidad * act.preciounitario)) MontoLicitadoTotal
from actividades  act, (select m.actividadid, m.proyectoid, sum(m.cantidad * m.preciounitario) as CostoMaterialActividad from materiales m
group by actividadid, proyectoid)  tm, proyectos p
where act.ProyectoID = p.ProyectoID
and tm.actividadid = act.actividadid
and tm.proyectoid = act.proyectoid

select act.ActividadID, act.ProyectoID,
((act.PrecioUnitario * CantidadEjecutada )+(CantidadEjecutada*MontPrecioUnitarioMateriales))
from Actividades act,
(select m.actividadid, m.proyectoid, sum(m.cantidad * m.preciounitario) as MontPrecioUnitarioMateriales from materiales m
group by actividadid, proyectoid) Mater,
(select Actividadid, ProyectoID,sum(cantidad)CantidadEjecutada from dbo.Planillas
group by Actividadid, ProyectoID) Ejecutadas 
where Ejecutadas.ActividadID = act.ActividadID 
and Ejecutadas.ProyectoID = act.ProyectoID
and Mater.ActividadID = act.ActividadID 
and Mater.ProyectoID = act.ProyectoID

select * from planillas

select * from dbo.Planillas p
where p.actividadid  in (select a.actividadid from actividades a)
order by actividadid, proyectoid

select * from materiales where actividadid = 163




select actividadid, count(actividadid) from materiales 
group by actividadid


select act.ActividadID, act.ProyectoID,
(isnull((act.PrecioUnitario * CantidadEjecutada ),0)+isnull((CantidadEjecutada*MontPrecioUnitarioMateriales),0))
from Actividades as act left join
(select m.actividadid, m.proyectoid, sum(m.cantidad * m.preciounitario) as MontPrecioUnitarioMateriales from materiales m
group by actividadid, proyectoid) as Mater on  act.ActividadID = Mater.ActividadID 
left join (select Actividadid, ProyectoID,sum(cantidad)CantidadEjecutada from dbo.Planillas
group by Actividadid, ProyectoID) as Ejecutadas on
act.ActividadID = Ejecutadas.ActividadID 
and act.ProyectoID = Mater.ProyectoID
and act.ProyectoID = Ejecutadas.ProyectoID 

create view VW_MontosEjecutados
as
select (isnull(t1.MontoMOE,0) + isnull(MontoME,0)) MontoEjcutado, t1.ActividadID,
t1.ProyectoID, t1.Mes,t1.ActividadSecundaria, t1.ActividadPrimaria  
from (
select eje.*, (eje.CantidadEjecutada * act.PrecioUnitario) MontoMOE, act.ActividadSecundaria, act.ActividadPrimaria 
from VW_ActividadesEjcutadas eje 
inner join Actividades as act on eje.ActividadID = act.ActividadID
and eje.ProyectoID = act.ProyectoID) as t1
left join (
select eje.*, (Mater.MontPrecioUnitarioMateriales * eje.CantidadEjecutada) MontoME
from VW_ActividadesEjcutadas eje 
inner join (select m.actividadid, m.proyectoid, sum(m.cantidad * m.preciounitario) as MontPrecioUnitarioMateriales from materiales m
group by actividadid, proyectoid) as Mater  on eje.ActividadID = Mater.ActividadID
and eje.ProyectoID = Mater.ProyectoID) as t2
on t1.Actividadid = t2.Actividadid
and t1.ProyectoID = t2.ProyectoID


select Actividadid, ProyectoID ,cantidad, fecha from dbo.Planillas
order by Actividadid, ProyectoID

select Actividadid, ProyectoID ,sum(cantidad)CantidadEjecutada from dbo.Planillas
group by Actividadid, ProyectoID

select * from materiales where actividadid in (select Actividadid from dbo.Planillas)

select * from actividades where actividadid = 171
select * from materiales where actividadid = 171
select * from Planillas where actividadid = 171


