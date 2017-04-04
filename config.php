<?php
//config.php	v2016.1
define('OLIB_PATH',	'../lib5');
define('OHOME_DIR',	'../probe');

//PgSql settings
define('OPG_USER',	'mx');
define('OPG_PASS',	'mx');
define('OPG_HOST',	'127.0.0.1');
define('OPG_DB',	'mx');

//MySql settings
define('OMY_USER',	'root');
define('OMY_PASS',	'');
//define('OMY_HOST',	'10.124.13.24');
define('OMY_HOST',	'127.0.0.1');
define('OMY_DB',	'wf');

//MsSql settings
define('OMSSQL_USER',   'OAO\WebServer');           
define('OMSSQL_PASS',   'pass');       
define('OMSSQL_SERVER', 'TONIPI-SQL-01');
define('OMSSQL_DB',     'WP2');          

//AD LDAP settings
define('OLDAP_DS',	'TONIPI-DC-01v');
define('OLDAP_DN',	'ou=ТО СургутНИПИнефть,ou=Структурные подразделения,dc=oao,dc=sng');
define('OLDAP_DN1',	'ou=СургутНИПИнефть,ou=Структурные подразделения,dc=oao,dc=sng');
define('OLDAP_DOMAIN',	'oao.sng');
define('OLDAP_USER',	'WebServer');
define('OLDAP_PASS',	'pass');
define('OUSER_MAILFROM','WebServer@oao.sng');

//SMTP settings
define('SMTP_SERVER',	'tonipi-mbx-01v');
define('SMTP_PORT',	"25");
define('SMTP_USER',	FALSE);
define('SMTP_PASS',	FALSE);

?>