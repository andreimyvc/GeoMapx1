select * from Planillas

alter table planillas
add  constraint UniqueByFecha Unique(EmpresaID,ActividadID,ProyectoID,PosteID,Fecha)

select * from Planillas
where empresaid = 1 and actividadid = 8 and proyectoid = 1 and posteid = 1

delete Planillas
where empresaid = 1 and actividadid = 8 and proyectoid = 1 and posteid = 49

delete Planillas
where (select count(p.*)
from Planillas p
p.empresaid = Planillas.empresaid and p.actividadid = Planillas.actividadid
 and p.proyectoid = Planillas.proyectaid and p.posteid = Planillas.posteid
) > 1


delete
from Planillas  
WHERE  exists (SELECT p.EmpresaID,p.ActividadID,p.ProyectoID,p.PosteID,p.Fecha 
       FROM Planillas p 
       GROUP BY p.EmpresaID,p.ActividadID,p.ProyectoID,p.PosteID,p.Fecha 
       HAVING count(*)>1
 
)

SELECT a.planillaid 
from Planillas a 
WHERE  exists (SELECT p.EmpresaID,p.ActividadID,p.ProyectoID,p.PosteID,p.Fecha 
       FROM Planillas p 
       GROUP BY p.EmpresaID,p.ActividadID,p.ProyectoID,p.PosteID,p.Fecha 
       HAVING count(*)>1
 
)
GROUP BY a.planillaid

