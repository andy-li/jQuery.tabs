/**
 * jQuery tab 插件
 * 本程序是在<<JavaScript Web Applications>>图书内源码的基础上改写的
 * 源码见：
 * https://github.com/maccman/book-assets/blob/master/ch02/tabs.html
 */

(function($) {
    "use strict";

    $.fn.tabs = function(options) {

        var opts = $.extend({}, $.fn.tabs.defaults, options);

        return this.each(function() {
            var $this = $(this);
            var control = $(opts.control);

            /**
             * 以下委托事件用的是jQuery.delegate方法
             * 但在jQuery1.7以后推荐使用jQuery.on方法
             * 用法如下：
             * jQuery.on(events [,selector] [,data] [,hander(eventObject)]
             * 详细见: http://api.jquery.com/on/
             */

            // 绑定click事件
            $this.delegate(opts.childName, "click", function() {
                var tabName = $(this).attr(opts.attrName);

                $this.trigger("change.tabs", tabName);
            });

            // 绑定hover事件
            $this.delegate(opts.childName, "mouseover mouseout", function(event) {

                // 判断事件类型
                if (event.type === "mouseover") {
                    $(this).addClass(opts.hoverClass);
                } else {
                    $(this).removeClass(opts.hoverClass);
                }
            });

            // 绑定自定义事件 更改 Tab 选项卡
            $this.bind("change.tabs", function(e, tabName) {
                $this.find(opts.childName).removeClass(opts.activeClass);
                $this.find(">["  + opts.attrName + "='" + tabName + "']").addClass(opts.activeClass);
            });

            // 绑定自定义事件 更改 Tab 内容
            $this.bind("change.tabs", function(e, tabName) {
                control.find(">[" + opts.attrName + "]").removeClass(opts.activeClass);
                control.find(">[" + opts.attrName + "='" + tabName + "']").addClass(opts.activeClass);
            });

            // 激活第一个选项卡
            var firstName = $this.find(opts.childName + ":first").attr(opts.attrName);
            $this.trigger("change.tabs", firstName);
        });
    };

    // 默认值
    $.fn.tabs.defaults = {
        control: ".tab-content",    // Tab 内容区域
        childName: "li",    // Tab 选项卡 节点名称
        attrName: "data-tab",   // 属性名称
        activeClass: "active",  // 当前选中的样式名称
        hoverClass: "hover"    // 滑动样式
    };
})(jQuery);
