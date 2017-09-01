<?php
	$fileurl = './data/goods_category.json';
	$file = fopen($fileurl, 'r');
	$content = fread($file, filesize($fileurl));
	fclose($file);
	echo $content;
?>