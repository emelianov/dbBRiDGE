<?php
///////////////////////////////////////////////////////
//
// dbBRiDGE [server side]
//  2016.1
//
// (c)2016, a.m.emelianov@gmail.com
//

//setlocale(LC_ALL, 'ru_RU');

require_once('config.php');
require_once('class.empty.php');
require_once('class.xml2array.php');
//require_once(OLIB_PATH.'/class.session.php');
//$ses		= new Session(TRUE);

 $template = 'form.xml';
 if (isset($_GET['t'])) {
    $template = $_GET['t'].'.xml';
 }
 $body = file_get_contents(OHOME_DIR.'/'.$template);
 $items = array();
 $vals = array();
 foreach($_GET as $key => $item) {
  $vals[]	= html_entity_decode($item);
//echo  html_entity_decode($item);
  $items[]	= '{'.$key.'}';
 }
 $body = str_replace($items, $vals, $body);
 $xml = new XML2Array();
 $form = $xml::createArray($body);
 $db = array();
 $fields = array();
 $where = array();
 $order = array();
 $limit = array();

if (!isset($form['page']['db'][0])) {
 $tmp = $form['page']['db'];
 $form['page']['db'] = array();
 $form['page']['db'][0] = $tmp;
//print_r($form['page']['db']);
}
 for ($k = 0; $k < count($form['page']['db']); $k++) {
    $db[$k] = ($form['page']['db'][$k]['name']);
    $where[$k] = isset($form['page']['db'][$k]['where'])?($form['page']['db'][$k]['where']):NULL;
    $order[$k] = isset($form['page']['db'][$k]['order'])?($form['page']['db'][$k]['order']):NULL;
//    $limit[$k] = isset($form['page']['db'][$k]['limit'])?($form['page']['db'][$k]['limit']):NULL;
    $fields[$k] = array();
    for ($i = 0; $i < count($form['page']['db'][$k]['field']); $i++) {
	$fields[$k][] = ($form['page']['db'][$k]['field'][$i]);
    }
 }
$action = '';
if (isset($_GET['action'])) {
    $action = $_GET['action'];
}
$pageTag = '</page>';
$pagePos = strrpos($body, $pageTag);
header('Content-Type: text/xml');
echo (substr($body, 0, $pagePos));
echo "<data>";
//$d1 = NULL;
switch ($action) {
case 'add':

break;
case 'new':
    echo "<$db[0]>\n";;
    for ($k = 0; $k < count($fields[0]); $k++) {
	$default = '';
	if (isset($fields[0][$k]['@attributes']['default'])) {
//	    $default = $fields[0][$k]['@attributes']['default'];
	}
	echo ('<'.$fields[0][$k].'>'.$default.'</'.$fields[0][$k].'>');
	echo "\n";
    }
    echo "</$db[0]>\n";;
break;
case 'save':
        $d1 = new EmptyDb();
	$d1->_from($db[0]);
        $d1->_addField($fields[0], $d1->_from());
	$inp = $form['page']['form']['field'];
	for ($i = 0; $i < count($inp); $i++) {
	    if ($inp[$i]['dbname'] === $db[0] && $inp[$i]['dbfield'] != 'id' && isset($_POST[$inp[$i]['@attributes']['name']])) {
		$field = $inp[$i]['dbfield'];
		$d1->$field = $_POST[$inp[$i]['@attributes']['name']];
	    }
	}
	$d1->_keyFields[0] = 'id';
	$d1->_fieldsCreate = array();
	for ($i = 0; $i < count($d1->_fields); $i++) {
	    if ($d1->_fields[$i] != $d1->_keyFields[0]) {
		$d1->_fieldsCreate[] = $d1->_fields[$i];
	    }
	}
	$d1->count = 1;
	$d1->toMulti();
	if ($d1->id[0] > 0) {
	    $d1->update();
	} else {
	    $d1->insert();
	}

	if (isset($form['page']['form']['onsave'])) {
	    header('Location: '.$form['page']['form']['onsave'].$d1->id[0]);
	}
break;
default:	//show
}
//echo($form['page']['form']['onsave']);
    for ($k = 0; $k < count($db); $k++) {
	if (!isset($d1) || $k > 0) {
    	    $d1 = new EmptyDb();
	    $d1->_from($db[$k]);
    	    $d1->_addField($fields[$k], $d1->_from());
	    if (isset($where[$k]) && $where[$k] != NULL) {
		$d1->where($where[$k]);
	    }
	    if (isset($order[$k]) && $order[$k] != NULL) {
		$d1->orderBy($order[$k]);
	    }
	    if (isset($limit[$k]) && $limit[$k] != NULL) {
		$d1->limit($limit[$k]);
	    }
	    $d1->retrive();
	}
        echo "<$db[$k]>\n";
	for ($i = 0; $i < $d1->count; $i++) {
         for ($j = 0; $j < count($fields[$k]); $j++) {
    	    $f = $d1->$fields[$k][$j];
		echo ('<'.$fields[$k][$j].'>'.$f[$i].'</'.$fields[$k][$j].'>');
	}
	echo "\n";
	}
	echo "</$db[$k]>\n";
    }
    echo "</data>\n";
    echo $pageTag;

//}
?>
