
select pe.CantidadEjecutadas, (p1.Cantidad - pe.CantidadEjecutadas)as CantidadFaltantes,
 p1.*,pro.CodigoProyecto, act.UniCons
from Precios as p1 inner join 
(
select (select sum(p.cantidad) 
				from planillas p 
				where p.actividadid = pre.actividadid				
                 )as CantidadEjecutadas, pre.PrecioID
from precios pre
) as pe 
on (pe.PrecioID = p1.PrecioID) inner join
proyectos as pro on p1.proyectoid = pro.proyectoid
inner join actividades as act on p1.actividadid = act.actividadid
order by pe.CantidadEjecutadas desc 

select * from planillas where actividadid = 154

select * from precios where actividadid = 154

select p.Cantidad 
 CantidadEjecutada = (select sum(p.cantidad) 
				from planillas p 
				where p.actividadid = pre.actividadid				
                 )
from precios pre



select (select sum(p.cantidad) 
				from planillas p 
				where p.actividadid = pre.actividadid				
                 )as Ejecutadas, pre.PrecioID
from precios pre
order by pre.cantidad
desc


select p.Cantidad 
 CantidadEjecutada = (select sum(p.cantidad) 
				from planillas p 
				where p.actividadid = pre.actividadid				
                 )
from precios pre