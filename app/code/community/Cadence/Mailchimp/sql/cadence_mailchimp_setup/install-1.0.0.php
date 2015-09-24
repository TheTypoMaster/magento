<?php
$installer = $this;

$installer->startSetup();

$installer->run("

	INSERT INTO {$this->getTable('cms/block')} (title, identifier, content, is_active, creation_time, update_time)
	VALUES (
		'Mailchimp Popup - Callout',
		'cadence_mailchimp_callout',
		'<img src=\"/skin/frontend/base/default/images/cadence/mailchimp/callout.png\" />',
		1,
		NOW(),
		NOW()
	);
	INSERT INTO {$this->getTable('cms/block_store')} (block_id,store_id)
	VALUES (
		last_insert_id(),
		0
	);
");

$installer->endSetup();