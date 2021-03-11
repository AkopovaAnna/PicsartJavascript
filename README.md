# UM Search Service

UM-service (UM) is responsible for user management(create/update/delete/get/getByCriteria....)


## Base Concepts


## Usefull topics

To unblock blocked user manually
* set statusid column value to 1(active) in users table of the UM database (you can find DB credentials here:
  http://consul-dev.synisys.com/ui/dc1/kv/environment/${env}/services/configs/um-service/versions/v1/projects/${applicationId}/database/postgresql/)

* check modification column value in passwordhistory table (User password expires every 300days.
  And you should check if user password expired or just block. If user password expired, you should also update the modification column value and set new value(now()))