select * from dbo.Actividades
order by unicons

select  * from dbo.vw_Planilla
where unicons = 'CAJ-1031'
where actividadid = 172
select * from dbo.Planillas
select * from dbo.Postes

update Actividades 
set Actividades.proyectoid = p.proyectoid
from Planillas p
where p.actividadid = Actividades.actividadid


select  * from dbo.Materiales m, actividades a
where m.actividadid = a.actividadid
and a.unicons = 'AC-102a1'
and a.proyectoid = 4

select * from dbo.Precios