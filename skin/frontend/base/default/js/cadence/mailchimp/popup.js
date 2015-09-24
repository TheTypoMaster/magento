;if(typeof(window.Cadence) === "undefined") window.Cadence={};
Cadence.Mailchimp = Class.create({
    _cookieName: "cadence_mailchimp_counter",
    initialize:function(config) {
        var self = this;
        self.config = config;
        if (self.config.use_jquery) {
            $j = jQuery.noConflict();
        }
        $j(document).ready(function(){
            /**
             * Never show in checkout
             */
            if (window.location.href.match(/checkout/)) {
                console.log("RETURNING?");
                return false;
            }
            if (self.config.ignore_param) {
                var params = self.getQueryParameters();
                /**
                 * Don't show the popup to users that visit the page with an ignore param
                 */
                if (self.config.ignore_param in params) {
                    $j.cookie(self._cookieName, Number(self.config.page_views) + 1, {
                        expires: 90,
                        path: '/'
                    });
                    return false;
                }
            }
            var delay = parseInt(self.config.delay);
            if (delay > 0) {
                setTimeout(function(){
                    self.loadPopup();
                },delay);
            } else {
                self.loadPopup();
            }
        });
    },
    loadPopup:function() {
        var self = this;
        var pageCounter = $j.cookie("cadence_mailchimp_counter") || 0;
        pageCounter++;
        if (pageCounter > this.config.page_views) {
            return false;
        }
        if (pageCounter == this.config.page_views) {
            jQuery(document).on("cbox_complete.mailchimp", function(){
                //Simulate mailchimp loading these
                var tmp = jQuery.noConflict();
                jQuery.getScript("//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js", function(){
                    (function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='CGROUP';ftypes[3]='dropdown';}(jQuery));
                    var $mcj = jQuery.noConflict(true);
                    window.jQuery = tmp.noConflict();
                    jQuery(document).off("cbox_complete.mailchimp");

                });
            });
            jQuery.colorbox({
                html: $j("#popup-template").html(),
                opacity: .3,
                height: "435px",
                width: "800px",
                className: "popup-popup"
            });
        }
        $j.cookie(self._cookieName, pageCounter, {
            expires: 14,
            path: '/'
        });
    },
    getQueryParameters : function(str) {
        return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n = n.split("="),this[n[0]] = n[1],this}.bind({}))[0];
    }
});
