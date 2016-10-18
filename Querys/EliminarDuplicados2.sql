select * from dbo.Materiales
where actividadid = 32

select * from actividades
where unicons = 'F2-MT3'
where actividadid = 32

select * from dbo.VW_Actividades

delete from actividades
where isnull(proyectoid,-1) < 0 
select * from dbo.Precios

delete from Precios
where actividadid in (select actividadid from actividades
where isnull(proyectoid,-1) < 0 ) 

delete from Materiales
where actividadid in (select actividadid from actividades
where isnull(proyectoid,-1) < 0 ) 

alter table Actividades
add constraint uniqueUniconsByProyect unique(proyectoid,unicons)