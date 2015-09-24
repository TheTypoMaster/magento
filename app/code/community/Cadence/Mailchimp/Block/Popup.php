<?php
/**
 * @author Alan Barber <alan@cadence-labs.com>
 * @package ext.cadence-labs.com
 * Date: 2/21/15 10:51 PM
 */
Class Cadence_Mailchimp_Block_Popup extends Mage_Core_Block_Template
{
    /** @var array */
    protected $_config;

    /**
     * Config
     * @param null $value
     * @return array|string
     */
    public function getConfig($value=null)
    {
        if (is_null($this->_config)) {
            $this->_config = array(
                'enabled' => Mage::getStoreConfig("cadence_mailchimp/popup/enabled"),
                'page_views' => Mage::getStoreConfig("cadence_mailchimp/popup/page_views"),
                'delay' => Mage::getStoreConfig("cadence_mailchimp/popup/delay"),
                'submit_url' => Mage::getStoreConfig("cadence_mailchimp/popup/submit_url"),
                'submit_key' => Mage::getStoreConfig("cadence_mailchimp/popup/submit_key"),
                'use_jquery' => Mage::getStoreConfig("cadence_mailchimp/popup/use_jquery"),
                'ignore_param' => Mage::getStoreConfig("cadence_mailchimp/popup/ignore_param")
            );
        }
        if (is_null($value)) {
            return $this->_config;
        }
        return isset($this->_config[$value]) ? $this->_config[$value] : '';
    }
}