(function($) {

$.fn.squishy = function(options) {

    // Setup options
    var settings = $.extend({
        "minSize"         : -10000,
        "maxSize"         : 10000,
        "maxWidth"        : 10000,
        "minWidth"        : -10000,
        "runAutomatically": true
    }, options);

    var that = this;

    // Does the resizing
    var resizer = function(e, subsetSelector) {

        var actOn;
        if(subsetSelector) {
            actOn = that.filter(function() {
                return $(this).is(subsetSelector);
            });
        } else {
            actOn = that;
        }

        actOn.each(function() {
            $this = $(this);

            // Add the wrapper span
            var theText = $this.html(),
                $span   = $this.html("<span id='checkSizeForSquishing'>" + theText + "</span>").children("#checkSizeForSquishing");

            // Figuring out the relevant widths
            var spanWidth = $span.width(),
                blockWidth = Math.max(parseFloat(settings.minWidth), Math.min($this.width(), parseFloat(settings.maxWidth))),
                fontSize = parseFloat($this.css("font-size"));

            // console.log("fontSize: " + fontSize + ", blockWidth: " + blockWidth + ", spanWidth: " + spanWidth);

            // Set the target size (restricted by min/max sizes)
            var targetSize = fontSize*blockWidth/spanWidth;
            targetSize = Math.floor(Math.min(Math.max(targetSize, parseFloat(settings.minSize)), parseFloat(settings.maxSize)));

            $this.css({"white-space": "nowrap", "font-size": targetSize, "text-align": "justify"}).html(theText);
        });

    };

    if(settings.runAutomatically) {
        // Initial will get it bigger but not too big
        resizer();

        // Calls the resize on viewport width or orientation change
        $(window).on("resize orientationchange", resizer);
    }

    return {
        resize: function(selector) {
            return resizer(null, selector);
        },

        makeAutomatic: function() {
            if(!settings["runAutomatically"]) {
                settings["runAutomatically"] = true;
                resizer();
                $(window).on("resize orientationchange", resizer);
            }
        }
    };
};

})(jQuery);